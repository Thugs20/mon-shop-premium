"use client";
import { useCart } from "../context/CartContext";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, removeFromCart, addToCart, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay (Arrière-plan sombre) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Panneau latéral */}
      <div className="relative w-full max-w-md bg-[#0f172a] h-full shadow-2xl flex flex-col border-l border-white/5 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#38bdf8]" />
            <h2 className="text-white font-bold uppercase tracking-widest text-sm">Mon Panier</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Liste des produits */}
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-6 rounded-full bg-white/5">
                <ShoppingBag size={40} className="text-slate-600" />
              </div>
              <p className="text-slate-400 text-sm italic">Votre panier est vide.</p>
              <button 
                onClick={onClose}
                className="text-[#38bdf8] text-xs font-bold uppercase tracking-widest border-b border-[#38bdf8]/30 pb-1"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-bold text-sm leading-tight pr-2">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-600 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1">{item.category}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-3 bg-white/5 rounded-lg px-2 py-1">
                        {/* On pourrait ajouter une fonction de réduction de quantité ici */}
                        <span className="text-white text-xs font-bold">Qté: {item.quantity}</span>
                      </div>
                      <p className="text-[#38bdf8] font-bold text-sm">{item.price * item.quantity}€</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer avec Total */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-white/[0.02] space-y-4">
            <div className="flex justify-between items-end mb-2">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Sous-total</span>
              <span className="text-white text-2xl font-black tracking-tighter">{cartTotal}€</span>
            </div>
            <p className="text-[10px] text-slate-500 mb-6 italic">Frais de port et taxes calculés lors du paiement.</p>
            
            <button className="w-full bg-[#38bdf8] text-[#0f172a] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-xl shadow-[#38bdf8]/10">
              Passer la commande
            </button>
            <button 
              onClick={clearCart}
              className="w-full text-slate-500 hover:text-white py-2 text-[9px] font-bold uppercase tracking-widest transition-colors"
            >
              Vider le panier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;