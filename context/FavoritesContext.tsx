"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import { db } from "../lib/firebase";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { user } = useAuth();

  // 1. CHARGEMENT INITIAL & NETTOYAGE DÉCONNEXION
  useEffect(() => {
    if (!user) {
      // Si déconnecté : on charge le localStorage
      const saved = localStorage.getItem('premium-shop-favs');
      setFavorites(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // 2. SYNCHRONISATION ENTRANTE ET FUSION (MERGE)
  useEffect(() => {
    if (!user) return;

    const syncOnLogin = async () => {
      const favRef = doc(db, "userFavorites", user.uid);
      const docSnap = await getDoc(favRef);
      
      // On récupère les favoris actuels (ceux du localStorage qui sont passés dans le state au démarrage)
      const currentLocal = [...favorites];

      if (docSnap.exists()) {
        const cloudData = docSnap.data().items as Product[] || [];
        
        // FUSION SANS DOUBLONS : On combine Cloud + Local
        const merged = [...new Map([...cloudData, ...currentLocal].map(item => [item.id, item])).values()];
        
        setFavorites(merged);
        // On nettoie le localStorage car maintenant c'est Firestore qui fait foi
        localStorage.removeItem('premium-shop-favs');
      } else if (currentLocal.length > 0) {
        // Premier enregistrement pour un nouveau compte
        await setDoc(favRef, { items: currentLocal, updatedAt: new Date() });
        localStorage.removeItem('premium-shop-favs');
      }
    };

    syncOnLogin();

    // Écoute en temps réel
    const favRef = doc(db, "userFavorites", user.uid);
    const unsubscribe = onSnapshot(favRef, (docSnap) => {
      if (docSnap.exists()) {
        const cloudData = docSnap.data().items as Product[];
        setFavorites(cloudData || []);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 3. SAUVEGARDE AUTOMATIQUE (Synchro sortante)
  useEffect(() => {
    // Si déconnecté, on écrit dans le localStorage
    if (!user) {
      localStorage.setItem('premium-shop-favs', JSON.stringify(favorites));
      return;
    }

    // Si connecté, on écrit dans Firebase
    const syncToFirebase = async () => {
      try {
        const favRef = doc(db, "userFavorites", user.uid);
        await setDoc(favRef, {
          items: favorites,
          updatedAt: new Date()
        }, { merge: true });
        // On s'assure que le localStorage est vide pour ne pas polluer d'autres comptes
        localStorage.removeItem('premium-shop-favs');
      } catch (error) {
        console.error("Erreur synchro favoris:", error);
      }
    };

    const timer = setTimeout(syncToFirebase, 1000);
    return () => clearTimeout(timer);
  }, [favorites, user]);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      const newState = exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
      return newState;
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.some((p) => p.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
};