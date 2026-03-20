"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { db } from "../lib/firebase";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // 1. CHARGEMENT INITIAL & NETTOYAGE DÉCONNEXION
  useEffect(() => {
    if (!user) {
      // Si déconnecté : on charge ce qui est resté en local (invité)
      const savedCart = localStorage.getItem('premium-shop-cart');
      setCart(savedCart ? JSON.parse(savedCart) : []); // <-- CORRIGÉ : setCart
    }
  }, [user]);

  // 2. SYNCHRONISATION ENTRANTE ET FUSION (MERGE)
  useEffect(() => {
    if (!user) return;

    const syncOnLogin = async () => {
      const cartRef = doc(db, "userCarts", user.uid);
      const docSnap = await getDoc(cartRef);
      
      // On récupère le panier "invité" actuel
      const currentLocal = [...cart];

      if (docSnap.exists()) {
        const cloudData = docSnap.data().items as CartItem[] || [];
        
        // FUSION INTELLIGENTE : On combine Cloud + Local en additionnant les quantités si doublons
        const mergedMap = new Map<number, CartItem>();

        // On remplit avec le cloud d'abord
        cloudData.forEach(item => mergedMap.set(item.id, { ...item }));

        // On ajoute le local (si l'item existe déjà, on additionne la quantité)
        currentLocal.forEach(item => {
          if (mergedMap.has(item.id)) {
            const existing = mergedMap.get(item.id)!;
            mergedMap.set(item.id, { ...existing, quantity: existing.quantity + item.quantity });
          } else {
            mergedMap.set(item.id, { ...item });
          }
        });

        const mergedArray = Array.from(mergedMap.values());
        setCart(mergedArray);
        
        // Nettoyage local après fusion sur le compte
        localStorage.removeItem('premium-shop-cart');
      } else if (currentLocal.length > 0) {
        // Nouveau compte : on pousse le panier local vers Firestore
        await setDoc(cartRef, { items: currentLocal, updatedAt: new Date() });
        localStorage.removeItem('premium-shop-cart');
      }
    };

    syncOnLogin();

    // Écoute en temps réel
    const cartRef = doc(db, "userCarts", user.uid);
    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        const cloudData = docSnap.data().items as CartItem[];
        setCart(cloudData || []);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 3. SAUVEGARDE AUTOMATIQUE (Synchro sortante)
  useEffect(() => {
    if (!user) {
      localStorage.setItem('premium-shop-cart', JSON.stringify(cart));
      return;
    }

    const syncToFirebase = async () => {
      try {
        const cartRef = doc(db, "userCarts", user.uid);
        await setDoc(cartRef, {
          items: cart,
          updatedAt: new Date()
        }, { merge: true });
        localStorage.removeItem('premium-shop-cart');
      } catch (error) {
        console.error("Erreur synchro cloud:", error);
      }
    };

    const timer = setTimeout(syncToFirebase, 800);
    return () => clearTimeout(timer);
  }, [cart, user]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};