"use client";
import { useState } from "react";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const categories = ["Tous", "Montres", "Accessoires", "Tech", "Design"];

  // Logique de filtrage
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Tous" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-[#1e293b] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* EN-TÊTE DE LA BOUTIQUE */}
        <div className="mb-12 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            SHOP <span className="text-[#38bdf8]">PREMIUM</span>
          </h1>
          <p className="text-slate-400 max-w-lg">
            Explorez notre catalogue complet de pièces sélectionnées pour leur excellence et leur design intemporel.
          </p>
        </div>

        {/* BARRE DE RECHERCHE ET FILTRES */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          {/* Recherche */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#38bdf8]/50 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Catégories */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? "bg-[#38bdf8] text-[#0f172a]" 
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLE DE PRODUITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* MESSAGE SI AUCUN RÉSULTAT */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 italic">Aucun produit ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShopPage;