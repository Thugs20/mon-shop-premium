import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
// Nouveaux imports
import Newsletter from "../components/Newsletter";
import CreatorBadge from "../components/CreatorBadge";
import Footer from "../components/Footer";

export default function Home() {
  // LOGIQUE MENTOR : On ne prend que les 3 premiers produits pour la vitrine
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="bg-[#1e293b] min-h-screen">
      {/* 1. SECTION HERO */}
      <Hero />

      {/* 2. BARRE DE CONFIANCE */}
      <TrustBar />

      {/* SECTION CATALOGUE SÉLECTIONNÉ */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-[#38bdf8] font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase">
              PremiumShop Selection
            </h2>
            <p className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
              NOS PIÈCES <span className="text-slate-600 italic">EXCLUSIVES</span>
            </p>
          </div>
          
          <Link
            href="/shop"
            className="group text-white/60 border-b border-white/10 pb-1 text-xs font-bold uppercase tracking-widest hover:text-[#38bdf8] hover:border-[#38bdf8] transition-all"
          >
            Tout voir 
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* GRILLE : On utilise featuredProducts au lieu de products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Petit rappel discret sur mobile pour aller à la boutique */}
        <div className="mt-12 md:hidden">
            <Link 
              href="/shop"
              className="w-full block text-center py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl"
            >
                Explorer toute la collection
            </Link>
        </div>
      </section>

      {/* 3. NOUVELLES SECTIONS INTÉGRÉES */}
      <Newsletter />
      <CreatorBadge />
      <Footer />
    </main>
  );
}