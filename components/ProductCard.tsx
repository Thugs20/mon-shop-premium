"use client";
import { Product } from "../data/products";
import Link from "next/link"; // L'import qu'il manquait !

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-3 hover:border-[#38bdf8]/30 transition-all group shadow-2xl flex flex-col h-full">
      
      {/* On entoure seulement la partie visuelle et texte par le lien */}
      <Link href={`/shop/${product.id}`} className="cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-800/50">
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 bg-[#38bdf8] text-[#0f172a] text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">
            Premium
          </div>
        </div>

        <div className="mt-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#38bdf8] transition-colors">
              {product.name}
            </h3>
            <span className="text-[#38bdf8] font-black text-xl tracking-tighter">
              {product.price}€
            </span>
          </div>
          
          <p className="text-slate-400 text-sm mt-2 line-clamp-2 font-light">
            {product.description}
          </p>
        </div>
      </Link>

      {/* Le bouton reste EN DEHORS du Link pour éviter les erreurs de navigation */}
      <div className="mt-auto pt-6">
        <button 
          onClick={(e) => {
            e.preventDefault(); // Sécurité supplémentaire
            console.log("Ajout au panier logic ici");
          }}
          className="w-full bg-white text-[#0f172a] hover:bg-[#38bdf8] hover:scale-[1.02] py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all active:scale-95"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;