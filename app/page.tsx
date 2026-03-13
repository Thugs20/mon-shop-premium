import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#1e293b] min-h-screen">
      {/* 1. SECTION HERO (Celle qu'on vient de coder) */}
      <Hero />

      {/* 2. Insertion juste sous le Hero */}
      <TrustBar />

      {/* SECTION CATALOGUE */}
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

  {/* GRILLE : 2 colonnes sur mobile pour le côté "pro" */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>
    </main>
  );
}