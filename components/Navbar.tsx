"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from "../context/CartContext"; 
import { useFavorites } from "../context/FavoritesContext";
// Ajout de l'import pour l'authentification
import { useAuth } from "../context/AuthContext";
import { ShoppingBag, Search, User, Menu, X, Heart } from "lucide-react"; 
import CartDrawer from "./CartDrawer"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const { cartCount } = useCart();
  const { favorites } = useFavorites();
  
  // Utilisation du hook d'authentification
  const { user } = useAuth();

  return (
    <>
      <header className="fixed top-4 inset-x-0 flex justify-center z-50 px-4">
        <nav className="w-full max-w-6xl bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 px-3 sm:px-5 py-3 rounded-2xl shadow-2xl mx-auto">
          <div className="flex items-center justify-between">
            
            {/* GAUCHE : Bloc Burger + Logo */}
            <div className="flex items-center gap-2 min-w-[120px] md:min-w-0">
              <button 
                className="md:hidden text-white p-2 shrink-0 -ml-2" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <Link href="/" className="flex items-center shrink-0">
                <div className="text-white font-black text-base sm:text-lg md:text-xl tracking-tighter whitespace-nowrap">
                  PREMIUM<span className="text-[#38bdf8]">SHOP</span>
                </div>
              </Link>
            </div>

            {/* CENTRE : Liens (Uniquement Desktop) */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300 whitespace-nowrap">
              <Link href="/" className="hover:text-[#38bdf8] transition-colors">Accueil</Link>
              <Link href="/shop" className="hover:text-[#38bdf8] transition-colors">Boutique</Link>
              <Link href="/a-propos" className="hover:text-[#38bdf8] transition-colors">À propos</Link>
              <Link href="/contact" className="hover:text-[#38bdf8] transition-colors">Contact</Link>
            </div>

            {/* DROITE : Actions */}
            <div className="flex items-center justify-end gap-1 sm:gap-3 shrink-0">
              <Link href="/shop" className="text-slate-300 hover:text-[#38bdf8] p-1.5 transition-colors">
                <Search size={20} />
              </Link>

              <Link href="/favoris" className="relative text-slate-300 hover:text-red-400 p-1.5 transition-colors">
                <Heart size={20} className={favorites.length > 0 ? "fill-red-500 text-red-500" : ""} />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1e293b]" />
                )}
              </Link>
              
              {/* LIEN COMPTE DYNAMIQUE DESKTOP */}
              <Link 
                href={user ? "/compte" : "/login"} 
                className={`hidden sm:block p-1.5 transition-colors ${user ? 'text-[#38bdf8]' : 'text-slate-300 hover:text-white'}`}
              >
                <User size={20} />
              </Link>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative bg-[#38bdf8] text-[#0f172a] ml-1 px-3 py-2 sm:px-5 rounded-xl text-[10px] sm:text-sm font-black flex items-center gap-2 hover:bg-white transition-all shadow-lg shadow-[#38bdf8]/20 shrink-0"
              >
                <ShoppingBag size={18} />
                <span className="hidden xs:inline uppercase tracking-tighter">Panier</span>
                
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-[#38bdf8] text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1e293b] font-black">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* MENU MOBILE */}
          {isOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 text-slate-300 font-medium pb-2">
              <Link href="/" onClick={() => setIsOpen(false)}>Accueil</Link>
              <Link href="/shop" onClick={() => setIsOpen(false)}>Boutique</Link>
              
              {/* LIEN COMPTE MOBILE */}
              <Link 
                href={user ? "/compte" : "/login"} 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-[#38bdf8] font-bold"
              >
                <User size={18} />
                {user ? "Mon Compte" : "Se Connecter"}
              </Link>

              <Link href="/a-propos" onClick={() => setIsOpen(false)}>À propos</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
              <Link href="/favoris" onClick={() => setIsOpen(false)} className="text-slate-300">Mes Favoris ({favorites.length})</Link>
            </div>
          )}
        </nav>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;