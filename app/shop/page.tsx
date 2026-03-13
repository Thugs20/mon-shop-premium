"use client";
import { useState } from "react";
// On importe les données et la liste des catégories de ton fichier data
import { products, categories } from "../../data/products"; 
import ProductCard from "../../components/ProductCard";
import { Search } from "lucide-react";

const ShopPage = () => {
  // À l'intérieur de ton composant ShopPage
const [searchTerm, setSearchTerm] = useState("");
const [activeCategory, setActiveCategory] = useState("Tous");

// Cette constante va recalculer automatiquement la liste dès que 'searchTerm' ou 'activeCategory' change
const filteredProducts = products.filter((product) => {
  // 1. On vérifie si le nom correspond à la recherche
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  // 2. On vérifie si la catégorie correspond
  const matchesCategory = 
    activeCategory === "Tous" || product.category === activeCategory;

  // Le produit n'est affiché que s'il remplit les deux conditions
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

        {/* BARRE DE RECHERCHE */}
        <div className="relative w-full md:w-96 mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#38bdf8]/50 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* SECTION CATÉGORIES AVEC SCROLL HORIZONTAL */}
        <div className="w-full mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 ml-1">
            Filtrer par univers
          </p>
          
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
            {/* Bouton "Tous" unique */}
            <button
              key="all-category"
              onClick={() => setActiveCategory("Tous")}
              className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeCategory === "Tous" 
                ? "bg-[#38bdf8] border-[#38bdf8] text-[#0f172a] shadow-lg shadow-[#38bdf8]/20 scale-105" 
                : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              Tous
            </button>

            {/* Les catégories dynamiques (Sneakers, Chemises, etc.) */}
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                  activeCategory === cat 
                  ? "bg-[#38bdf8] border-[#38bdf8] text-[#0f172a] shadow-lg shadow-[#38bdf8]/20 scale-105" 
                  : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
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