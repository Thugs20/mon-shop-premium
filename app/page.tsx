import Hero from "../components/Hero";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <main className="bg-[#1e293b] min-h-screen">
      {/* 1. SECTION HERO (Celle qu'on vient de coder) */}
      <Hero />

      {/* 2. SECTION PRODUITS (Avec un titre pour séparer) */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-[#38bdf8] font-bold tracking-widest text-xs uppercase mb-2">
              Notre Catalogue
            </h2>
            <p className="text-4xl font-black text-white tracking-tighter">
              LES PIÈCES <span className="text-slate-500">MAÎTRESSES</span>
            </p>
          </div>
          <button className="text-white border-b border-[#38bdf8] pb-1 text-sm font-bold hover:text-[#38bdf8] transition-colors">
            Voir toute la boutique →
          </button>
        </div>

        {/* GRILLE DE PRODUITS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}