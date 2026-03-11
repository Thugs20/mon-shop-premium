import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      {/* SECTION HÉROS (Titre) */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter">
          L'EXCELLENCE <span className="text-[#38bdf8]">PREMIUM</span>
        </h1>
        <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
          Découvrez notre sélection exclusive d'objets conçus pour ceux qui exigent le meilleur du design et de la technologie.
        </p>
      </div>

      {/* GRILLE DE PRODUITS */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}