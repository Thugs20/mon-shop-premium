"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
// Ajout des imports pour la synchronisation
import { db } from "../lib/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
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
  const { user } = useAuth(); // Récupération de l'utilisateur connecté

  // 1. Charger le panier local au démarrage (Hydratation)
  useEffect(() => {
    const savedCart = localStorage.getItem('premium-shop-cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // 2. ÉCOUTER les changements sur Firebase (Synchro entrante)
  useEffect(() => {
    if (!user) return;

    const cartRef = doc(db, "userCarts", user.uid);
    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        const cloudData = docSnap.data().items as CartItem[];
        // On ne met à jour que si les données sont différentes du local
        if (JSON.stringify(cloudData) !== JSON.stringify(cart)) {
          setCart(cloudData || []);
        }
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 3. Sauvegarder en local ET sur Firebase (Synchro sortante)
  useEffect(() => {
    localStorage.setItem('premium-shop-cart', JSON.stringify(cart));

    const syncToFirebase = async () => {
      if (user) {
        try {
          const cartRef = doc(db, "userCarts", user.uid);
          await setDoc(cartRef, {
            items: cart,
            updatedAt: new Date()
          }, { merge: true });
        } catch (error) {
          console.error("Erreur synchro cloud:", error);
        }
      }
    };

    // On utilise un petit debounce pour ne pas surcharger Firebase à chaque clic
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