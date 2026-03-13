"use client";
import { useState } from "react";
import { products } from "@/data/products";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext"; // Import Panier
import { useFavorites } from "@/context/FavoritesContext"; // Import Favoris
import { 
  ChevronLeft, Heart, Check, 
  Truck, ShieldCheck, RotateCcw 
} from "lucide-react";

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart(); // Logique panier
  const { toggleFavorite, isFavorite } = useFavorites(); // Logique favoris
  
  const [selectedColor, setSelectedColor] = useState(0);
  
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) return <div className="bg-[#1e293b] min-h-screen" />;

  // On vérifie si ce produit spécifique est dans les favoris
  const active = isFavorite(product.id);

  return (
    <main className="bg-[#1e293b] min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* BARRE DE NAVIGATION (Optimisée Mobile) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group py-2"
          >
            <div className="p-2 rounded-full border border-white/5 group-hover:border-[#38bdf8]/50 transition-colors">
              <ChevronLeft size={18} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Retour</span>
          </button>
          
          <div className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.3em] border-l md:border-l-0 border-[#38bdf8]/30 pl-3 md:pl-0">
            PremiumShop <span className="mx-1 text-slate-700">/</span> {product.category} <span className="mx-1 text-slate-700">/</span> {product.name}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* COLONNE GAUCHE : IMAGE */}
          <div className="lg:col-span-5 relative group mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-800/50 border border-white/5 shadow-2xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" 
              />
            </div>
            
            {/* BOUTON FAVORIS (FUSIONNÉ AVEC LE CONTEXT) */}
            <button 
              onClick={() => toggleFavorite(product)}
              className="absolute top-6 right-6 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white transition-all hover:scale-110 active:scale-90 z-10"
            >
              <Heart 
                size={20} 
                className={active ? "fill-[#38bdf8] text-[#38bdf8]" : "text-white"} 
              />
            </button>
          </div>

          {/* COLONNE DROITE : INFOS */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-light text-[#38bdf8] tracking-tighter">{product.price}€</p>
            </div>

            {/* Couleurs */}
            {product.colors && (
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sélectionner une nuance</p>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      style={{ backgroundColor: color }}
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === index ? "border-[#38bdf8] scale-110 ring-4 ring-[#38bdf8]/10" : "border-white/5 opacity-60"
                      }`}
                    >
                      {selectedColor === index && (
                        <Check size={16} className={color.toLowerCase() === "#ffffff" ? "text-black" : "text-white"} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-white/5">
              <p className="text-slate-400 leading-relaxed font-light text-base md:text-lg">
                {product.description}
              </p>
            </div>

            {/* Action & Réassurance */}
            <div className="space-y-6 pt-4">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-white text-black py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#38bdf8] transition-all active:scale-95 shadow-xl"
              >
                Ajouter au Panier
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <Truck size={16} className="text-[#38bdf8]" />
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Livraison 48h</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <RotateCcw size={16} className="text-[#38bdf8]" />
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Retours Offerts</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <ShieldCheck size={16} className="text-[#38bdf8]" />
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Garantie 2 ans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;