"use client";
import { Product } from "../data/products";
import Link from "next/link";
import { useCart } from "../context/CartContext"; // Import du hook

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart(); // On récupère la fonction
  return (
    <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-3 hover:border-[#38bdf8]/30 transition-all group flex flex-col h-full shadow-2xl">
      
      {/* Zone cliquable vers les détails */}
      <Link href={`/shop/${product.id}`} className="cursor-pointer">
        
        {/* Container Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-800/50">
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />

          {/* LE BADGE PREMIUM (Retour en force !) */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-[#38bdf8]/90 backdrop-blur-md text-[#0f172a] text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-[0.15em] shadow-lg flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#0f172a] rounded-full animate-pulse" />
              Premium
            </div>
          </div>
        </div>

        {/* Infos Produit */}
        <div className="mt-5 space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#38bdf8] transition-colors">
              {product.name}
            </h3>
            <span className="text-[#38bdf8] font-black text-xl tracking-tighter">
              {product.price}€
            </span>
          </div>
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
            {product.category}
          </p>
        </div>
      </Link>
      
      {/* Bouton Panier */}
      <div className="mt-auto pt-6">
        <button 
      onClick={() => addToCart(product)} // On appelle la fonction au clic
      className="w-full bg-white text-[#0f172a] hover:bg-[#38bdf8] py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg"
    >
      Ajouter au panier
    </button>
      </div>
    </div>
  );
};

export default ProductCard;