"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
// Ajout des imports Firebase
import { db } from "../lib/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { user } = useAuth(); // Récupération de l'utilisateur

  // 1. Charger depuis le localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('premium-shop-favs');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // 2. ÉCOUTER les favoris sur Firebase (Synchro entrante)
  useEffect(() => {
    if (!user) return;

    const favRef = doc(db, "userFavorites", user.uid);
    const unsubscribe = onSnapshot(favRef, (docSnap) => {
      if (docSnap.exists()) {
        const cloudData = docSnap.data().items as Product[];
        // On synchronise si le contenu est différent
        if (JSON.stringify(cloudData) !== JSON.stringify(favorites)) {
          setFavorites(cloudData || []);
        }
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 3. Sauvegarder dans le localStorage ET Firebase (Synchro sortante)
  useEffect(() => {
    localStorage.setItem('premium-shop-favs', JSON.stringify(favorites));

    const syncToFirebase = async () => {
      if (user) {
        try {
          const favRef = doc(db, "userFavorites", user.uid);
          await setDoc(favRef, {
            items: favorites,
            updatedAt: new Date()
          }, { merge: true });
        } catch (error) {
          console.error("Erreur synchro favoris:", error);
        }
      }
    };

    const timer = setTimeout(syncToFirebase, 1000);
    return () => clearTimeout(timer);
  }, [favorites, user]);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
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