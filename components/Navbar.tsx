"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from "../context/CartContext"; 
import { ShoppingBag, Search, User, Menu, X } from "lucide-react"; 
import CartDrawer from "./CartDrawer"; // N'oublie pas l'import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Pour le menu burger
  const [isCartOpen, setIsCartOpen] = useState(false); // Pour le tiroir panier
  const { cartCount } = useCart();

  return (
    <>
      <header className="fixed top-4 inset-x-0 flex justify-center z-50 px-4">
        <nav className="w-full max-w-6xl bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between">
            
            {/* 1. GAUCHE : BURGER (Mobile uniquement) */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* 2. CENTRE/GAUCHE : LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <div className="text-white font-black text-lg md:text-xl tracking-tighter">
                PREMIUM<span className="text-[#38bdf8]">SHOP</span>
              </div>
            </Link>

            {/* 3. CENTRE : MENU (Desktop uniquement) */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
              <Link href="/" className="hover:text-[#38bdf8] transition-colors">Accueil</Link>
              <Link href="/shop" className="hover:text-[#38bdf8] transition-colors">Boutique</Link>
              <Link href="/a-propos" className="hover:text-[#38bdf8] transition-colors">À propos</Link>
              <Link href="/contact" className="hover:text-[#38bdf8] transition-colors">Contact</Link>
            </div>

            {/* 4. DROITE : ACTIONS (Toujours visibles) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Recherche - Redirige vers la boutique */}
            <Link 
  href="/shop" 
  className="text-slate-300 hover:text-[#38bdf8] p-2 transition-colors"
  aria-label="Rechercher"
>
  <Search size={20} />
</Link>
              
              {/* Compte */}
              <button className="text-slate-300 hover:text-white p-2">
                <User size={20} />
              </button>

              {/* LE BOUTON PANIER (Fusionné avec ta logique) */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative bg-[#38bdf8] text-[#0f172a] px-3 py-2 sm:px-5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white transition-all active:scale-95 shadow-lg shadow-[#38bdf8]/20"
              >
                <ShoppingBag size={18} />
                <span className="hidden sm:inline uppercase tracking-tighter">Panier</span>
                
                {/* Badge Dynamique */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-[#38bdf8] text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1e293b] font-black animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* 5. MENU MOBILE (S'affiche quand isOpen est vrai) */}
          {isOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 text-slate-300 font-medium pb-2">
              <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[#38bdf8]">Accueil</Link>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="hover:text-[#38bdf8]">Boutique</Link>
              <Link href="/a-propos" onClick={() => setIsOpen(false)} className="hover:text-[#38bdf8]">À propos</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#38bdf8]">Contact</Link>
            </div>
          )}
        </nav>
      </header>

      {/* COMPOSANT PANIER LATÉRAL (Le tiroir) */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;