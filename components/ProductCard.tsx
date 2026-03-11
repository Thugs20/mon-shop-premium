import { Product } from "../data/products";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-4 hover:border-[#38bdf8]/50 transition-all group shadow-xl">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-800">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-start">
          <h3 className="text-white font-semibold text-lg">{product.name}</h3>
          <span className="text-[#38bdf8] font-bold">{product.price}€</span>
        </div>
        <p className="text-slate-400 text-sm mt-2 line-clamp-2">{product.description}</p>
        <button className="w-full mt-6 bg-white/10 hover:bg-[#38bdf8] hover:text-[#0f172a] text-white py-3 rounded-xl font-bold transition-colors">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;