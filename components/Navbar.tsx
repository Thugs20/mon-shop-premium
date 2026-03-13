"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from "../context/CartContext"; 
import { useFavorites } from "../context/FavoritesContext"; // Ajout du hook Favoris
import { ShoppingBag, Search, User, Menu, X, Heart } from "lucide-react"; // Ajout de Heart
import CartDrawer from "./CartDrawer"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const { cartCount } = useCart();
  const { favorites } = useFavorites(); // Récupération des favoris

  return (
    <>
      <header className="fixed top-4 inset-x-0 flex justify-center z-50 px-4">
        <nav className="w-full max-w-6xl bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 px-4 sm:px-5 py-3 rounded-2xl shadow-2xl">
  <div className="flex items-center justify-between gap-2">
    
    {/* 1. GAUCHE : BURGER (Mobile uniquement) - shrink-0 pour qu'il ne s'écrase jamais */}
    <button 
      className="md:hidden text-white p-2 shrink-0"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {/* 2. CENTRE/GAUCHE : LOGO - shrink-0 pour garder sa taille */}
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <div className="text-white font-black text-lg md:text-xl tracking-tighter whitespace-nowrap">
        PREMIUM<span className="text-[#38bdf8]">SHOP</span>
      </div>
    </Link>

    {/* 3. CENTRE : MENU (Desktop uniquement) */}
    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300 whitespace-nowrap">
      <Link href="/" className="hover:text-[#38bdf8] transition-colors">Accueil</Link>
      <Link href="/shop" className="hover:text-[#38bdf8] transition-colors">Boutique</Link>
      <Link href="/a-propos" className="hover:text-[#38bdf8] transition-colors">À propos</Link>
      <Link href="/contact" className="hover:text-[#38bdf8] transition-colors">Contact</Link>
    </div>

    {/* 4. DROITE : ACTIONS - shrink-0 pour protéger le bloc d'icônes */}
    <div className="flex items-center gap-1 sm:gap-4 lg:gap-6 shrink-0">
      
      {/* Recherche */}
      <Link 
        href="/shop" 
        className="text-slate-300 hover:text-[#38bdf8] p-1.5 transition-colors"
        aria-label="Rechercher"
      >
        <Search size={19} className="md:size-[20px]" />
      </Link>

      {/* FAVORIS */}
      <Link 
        href="/favoris" 
        className="relative text-slate-300 hover:text-red-400 p-1.5 transition-colors"
        aria-label="Favoris"
      >
        <Heart size={19} className={`md:size-[20px] ${favorites.length > 0 ? "fill-red-500 text-red-500" : ""}`} />
        {favorites.length > 0 && (
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#1e293b]" />
        )}
      </Link>
      
      {/* Compte */}
      <button className="text-slate-300 hover:text-white p-1.5">
        <User size={19} className="md:size-[20px]" />
      </button>

      {/* LE BOUTON PANIER */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="relative bg-[#38bdf8] text-[#0f172a] ml-1 px-3 py-2 sm:px-5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white transition-all active:scale-95 shadow-lg shadow-[#38bdf8]/20 shrink-0"
      >
        <ShoppingBag size={18} />
        <span className="hidden sm:inline uppercase tracking-tighter">Panier</span>
        
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-[#38bdf8] text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-[#1e293b] font-black animate-pulse">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  </div>

  {/* 5. MENU MOBILE */}
  {isOpen && (
    <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 text-slate-300 font-medium pb-2">
      <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[#38bdf8]">Accueil</Link>
      <Link href="/shop" onClick={() => setIsOpen(false)} className="hover:text-[#38bdf8]">Boutique</Link>
      <Link href="/a-propos" onClick={() => setIsOpen(false)} className="hover:text-[#38bdf8]">À propos</Link>
      <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#38bdf8]">Contact</Link>
      <Link href="/favoris" onClick={() => setIsOpen(false)} className="hover:text-red-400">Mes Favoris ({favorites.length})</Link>
    </div>
  )}
</nav>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;