"use client";
import { products } from "@/data/products";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Star, Shield, Truck, RefreshCw } from "lucide-react";
import Link from "next/link";

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();
  
  // On cherche le produit qui correspond à l'ID dans l'URL
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e293b] text-white">
        <p>Produit introuvable...</p>
      </div>
    );
  }

  return (
    <main className="bg-[#1e293b] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* BOUTON RETOUR */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-[#38bdf8] transition-colors mb-8 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Retour à la boutique
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* IMAGE DU PRODUIT */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-800 border border-white/5">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* INFOS DU PRODUIT */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[#38bdf8] font-bold tracking-[0.2em] text-xs uppercase">
                Collection {product.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 pt-2">
                <span className="text-3xl font-black text-white">{product.price}€</span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <span className="text-slate-400 text-xs ml-2">(48 avis client)</span>
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* OPTIONS DE RÉASSURANCE DÉTAILLÉES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-white/5">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={20} className="text-[#38bdf8]" />
                <span className="text-[10px] text-slate-300 font-bold uppercase">Livraison Offerte</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield size={20} className="text-[#38bdf8]" />
                <span className="text-[10px] text-slate-300 font-bold uppercase">Garantie 2 ans</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCw size={20} className="text-[#38bdf8]" />
                <span className="text-[10px] text-slate-300 font-bold uppercase">Retours Gratuits</span>
              </div>
            </div>

            {/* ACTION */}
            <div className="pt-4">
              <button className="w-full bg-white text-[#0f172a] hover:bg-[#38bdf8] py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-white/5 active:scale-95">
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;