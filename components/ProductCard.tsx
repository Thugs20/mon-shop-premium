"use client";
import { Product } from "../data/products";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext"; // Import du hook Favoris
import { Heart } from "lucide-react"; // Import de l'icône

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites(); // Logique favoris
  
  const active = isFavorite(product.id);

  return (
    <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-3 hover:border-[#38bdf8]/30 transition-all group flex flex-col h-full shadow-2xl">
      
      {/* Zone cliquable vers les détails */}
      <div className="relative"> {/* Container relatif pour isoler le bouton du Link */}
        
        {/* BOUTON FAVORIS (Ajouté ici pour flotter sur l'image) */}
        <button 
          onClick={(e) => {
            e.preventDefault(); // Empêche d'ouvrir la page produit en cliquant sur le coeur
            toggleFavorite(product);
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-xl backdrop-blur-md transition-all active:scale-90 border border-white/10 group/heart"
          style={{ backgroundColor: active ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)' }}
        >
          <Heart 
            size={18} 
            className={`transition-colors ${active ? "fill-[#38bdf8] text-[#38bdf8]" : "text-white/40 group-hover/heart:text-white"}`} 
          />
        </button>

        <Link href={`/shop/${product.id}`} className="cursor-pointer">
          {/* Container Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-800/50">
            <img 
              src={product.image} 
              alt={product.name}
              loading="lazy"
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            />

            {/* LE BADGE PREMIUM */}
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
      </div>
      
      {/* Bouton Panier */}
      <div className="mt-auto pt-6">
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-white text-[#0f172a] hover:bg-[#38bdf8] py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;