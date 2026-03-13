"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Charger depuis le localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('premium-shop-favs');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Sauvegarder dans le localStorage
  useEffect(() => {
    localStorage.setItem('premium-shop-favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id); // On l'enlève s'il existe déjà
      }
      return [...prev, product]; // On l'ajoute s'il n'existe pas
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