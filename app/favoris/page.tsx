"use client";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/ProductCard";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <main className="bg-[#1e293b] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de la page */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Link 
              href="/shop" 
              className="flex items-center gap-2 text-[#38bdf8] text-[10px] font-bold uppercase tracking-[0.2em] group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Retour à la boutique
            </Link>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
              MES <span className="text-[#38bdf8]">COUPS DE CŒUR</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium italic text-sm md:text-right">
            {favorites.length} {favorites.length > 1 ? "articles sélectionnés" : "article sélectionné"}
          </p>
        </div>

        {/* Grille de produits */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]">
            <div className="p-8 rounded-full bg-white/5 mb-6">
              <Heart size={48} className="text-slate-700" />
            </div>
            <h2 className="text-white text-xl font-bold mb-2">Votre liste est vide</h2>
            <p className="text-slate-500 text-sm mb-8 text-center max-w-xs">
              Explorez nos collections et sauvegardez vos articles préférés pour les retrouver plus tard.
            </p>
            <Link 
              href="/shop"
              className="bg-[#38bdf8] text-[#0f172a] px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all active:scale-95"
            >
              Découvrir la collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoritesPage;