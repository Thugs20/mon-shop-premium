"use client";
import { Product } from "../data/products";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-3 hover:border-[#38bdf8]/30 transition-all group flex flex-col h-full">
      <Link href={`/shop/${product.id}`} className="cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-800/50">
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy" // Optimisation demandée
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="mt-5 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-bold text-lg leading-tight">{product.name}</h3>
            <span className="text-[#38bdf8] font-black">{product.price}€</span>
          </div>
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">{product.category}</p>
        </div>
      </Link>
      
      <div className="mt-auto pt-6">
        <button className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#38bdf8] transition-all">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;