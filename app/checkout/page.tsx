"use client";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // LOGIQUE : Enregistrement de la commande dans Firebase
  const handlePayment = async () => {
    if (cart.length === 0) return;
    
    setIsProcessing(true);

    try {
      // Simulation d'un délai de paiement (2 secondes)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 1. On crée la commande dans Firestore
      await addDoc(collection(db, "orders"), {
        userId: user?.uid,
        userEmail: user?.email,
        userName: user?.displayName || "Client Premium",
        items: cart,
        total: cartTotal,
        paymentMethod: paymentMethod,
        status: "Payé",
        createdAt: serverTimestamp(),
      });

      // 2. Succès !
      setIsSuccess(true);
      clearCart(); // On vide le panier après succès
    } catch (error) {
      console.error("Erreur lors de la commande:", error);
      alert("Une erreur est survenue lors de la validation.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#1e293b] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6 bg-white/[0.02] border border-white/10 p-12 rounded-[3rem] backdrop-blur-xl">
          <div className="flex justify-center">
            <CheckCircle2 size={80} className="text-[#38bdf8] animate-bounce" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">COMMANDE VALIDÉE !</h1>
          <p className="text-slate-400 font-medium">Merci pour votre achat. Votre commande a été enregistrée avec succès dans votre espace membre.</p>
          <button 
            onClick={() => router.push("/shop")}
            className="w-full bg-white text-[#0f172a] py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#38bdf8] transition-all"
          >
            Retour à la boutique
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1e293b] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* GAUCHE : Options de Paiement */}
        <div className="space-y-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Retour
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">FINALISER <br /><span className="text-slate-600">L'ACHAT.</span></h1>

          <div className="space-y-4">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest ml-1">Mode de paiement (Simulation)</p>
            
            {/* Option Carte */}
            <div 
              onClick={() => setPaymentMethod("card")}
              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'card' ? 'border-[#38bdf8] bg-[#38bdf8]/5' : 'border-white/5 bg-white/[0.02]'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${paymentMethod === 'card' ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-white/5 text-slate-500'}`}>
                  <CreditCard size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Carte Bancaire</h4>
                  <p className="text-slate-500 text-xs font-medium">Visa, Mastercard, AMEX</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#38bdf8]' : 'border-slate-700'}`}>
                {paymentMethod === 'card' && <div className="w-3 h-3 bg-[#38bdf8] rounded-full" />}
              </div>
            </div>

            {/* Option Kkiapay */}
            <div 
              onClick={() => setPaymentMethod("kkiapay")}
              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'kkiapay' ? 'border-[#38bdf8] bg-[#38bdf8]/5' : 'border-white/5 bg-white/[0.02]'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${paymentMethod === 'kkiapay' ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-white/5 text-slate-500'}`}>
                  <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">KKIAPAY</h4>
                  <p className="text-slate-500 text-xs font-medium">Mobile Money (Bénin & International)</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'kkiapay' ? 'border-[#38bdf8]' : 'border-slate-700'}`}>
                {paymentMethod === 'kkiapay' && <div className="w-3 h-3 bg-[#38bdf8] rounded-full" />}
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5 flex items-start gap-4">
            <ShieldCheck className="text-[#38bdf8] shrink-0" size={20} />
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Vos transactions sont sécurisées par un protocole SSL 256 bits. En cliquant sur "Payer", vous acceptez nos conditions générales de vente.
            </p>
          </div>
        </div>

        {/* DROITE : Récapitulatif */}
        <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[3rem] h-fit sticky top-32">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Votre Panier</h3>
          
          <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-lg overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{item.name}</p>
                    <p className="text-slate-500 text-[10px]">Qté: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-white font-bold text-sm">{item.price * item.quantity}€</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-6 space-y-4">
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Sous-total</span>
              <span>{cartTotal}€</span>
            </div>
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Livraison</span>
              <span className="text-green-400 font-bold uppercase text-[10px]">Gratuite</span>
            </div>
            <div className="flex justify-between text-white text-2xl font-black pt-4 border-t border-white/5">
              <span>TOTAL</span>
              <span className="text-[#38bdf8]">{cartTotal}€</span>
            </div>
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing || cart.length === 0}
            className="w-full bg-[#38bdf8] text-[#0f172a] py-5 rounded-2xl font-black uppercase tracking-widest mt-10 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isProcessing ? "Traitement en cours..." : `Payer ${cartTotal}€`}
          </button>
        </div>

      </div>
    </main>
  );
}