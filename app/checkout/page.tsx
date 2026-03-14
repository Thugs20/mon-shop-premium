"use client";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, ShieldCheck, CheckCircle2, ArrowLeft, Lock, Globe } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedNetwork, setSelectedNetwork] = useState("mtn");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
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
      setIsSuccess(true);
      clearCart();
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
          <p className="text-slate-400 font-medium">Merci pour votre achat. Votre facture est désormais disponible dans votre profil.</p>
          <button onClick={() => router.push("/compte")} className="w-full bg-white text-[#0f172a] py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#38bdf8] transition-all">
            Voir ma commande
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1e293b] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div className="space-y-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Retour
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">FINALISER <br /><span className="text-slate-600">L'ACHAT.</span></h1>

          <div className="space-y-4">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest ml-1">Mode de paiement (Simulation)</p>
            
            {/* --- OPTION CARTE --- */}
            <div className={`rounded-3xl border-2 transition-all overflow-hidden ${paymentMethod === 'card' ? 'border-[#38bdf8] bg-[#38bdf8]/5' : 'border-white/5 bg-white/[0.02]'}`}>
              <div onClick={() => setPaymentMethod("card")} className="p-6 cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${paymentMethod === 'card' ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-white/5 text-slate-500'}`}>
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Carte Bancaire</h4>
                    <div className="flex gap-2 mt-1 opacity-70 grayscale group-hover:grayscale-0 transition-all">
                        <img src="/images/logo-visa.png" alt="Visa" className="h-3" />
                        <img src="/images/logo-mastercard.png" alt="Mastercard" className="h-3" />
                    </div>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#38bdf8]' : 'border-slate-700'}`}>
                  {paymentMethod === 'card' && <div className="w-3 h-3 bg-[#38bdf8] rounded-full" />}
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="px-6 pb-6 pt-2 space-y-4 animate-in slide-in-from-top-2">
                  <div className="relative w-full h-44 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10 overflow-hidden mb-4">
                     <div className="flex justify-between items-start">
                        <div className="w-10 h-8 bg-yellow-500/20 rounded-md border border-yellow-500/30" />
                        <img src="/images/logo-visa.png" alt="Visa" className="h-4" />
                     </div>
                     <div className="mt-8">
                        <p className="text-white tracking-[0.2em] font-mono text-lg">**** **** **** 4242</p>
                     </div>
                     <div className="mt-6 flex justify-between items-end">
                        <div>
                            <p className="text-[8px] text-slate-500 uppercase">Card Holder</p>
                            <p className="text-[10px] text-white font-bold uppercase">{user?.displayName || "PREMIUM CUSTOMER"}</p>
                        </div>
                        <p className="text-[10px] text-white font-mono">12/28</p>
                     </div>
                     <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#38bdf8]/10 rounded-full blur-2xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase ml-1">Numéro de carte</label>
                    <input type="text" placeholder="#### #### #### ####" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#38bdf8]/50" />
                  </div>
                </div>
              )}
            </div>

            {/* --- OPTION KKIAPAY --- */}
            <div className={`rounded-3xl border-2 transition-all overflow-hidden ${paymentMethod === 'kkiapay' ? 'border-[#38bdf8] bg-[#38bdf8]/5' : 'border-white/5 bg-white/[0.02]'}`}>
              <div onClick={() => setPaymentMethod("kkiapay")} className="p-6 cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${paymentMethod === 'kkiapay' ? 'bg-[#38bdf8] text-[#0f172a]' : 'bg-white/5 text-slate-500'}`}>
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Mobile Money</h4>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Bénin, Togo, Côte d'Ivoire</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'kkiapay' ? 'border-[#38bdf8]' : 'border-slate-700'}`}>
                  {paymentMethod === 'kkiapay' && <div className="w-3 h-3 bg-[#38bdf8] rounded-full" />}
                </div>
              </div>

              {paymentMethod === 'kkiapay' && (
                <div className="px-6 pb-6 pt-2 space-y-6 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                        { id: 'mtn', color: '#ffcc00', img: '/images/logo-mtn.png' },
                        { id: 'moov', color: '#005bab', img: '/images/logo-moov.png' },
                        { id: 'celtiis', color: '#e5001a', img: '/images/logo-celtiis.jpg' }
                    ].map((net) => (
                      <button 
                        key={net.id}
                        onClick={() => setSelectedNetwork(net.id)}
                        className={`relative h-14 rounded-xl border-2 overflow-hidden transition-all flex items-center justify-center p-2 bg-white ${selectedNetwork === net.id ? 'border-[#38bdf8] scale-105 shadow-lg' : 'border-transparent grayscale opacity-50 hover:grayscale-0 hover:opacity-100'}`}
                      >
                        <img src={net.img} alt={net.id} className="h-full w-auto object-contain" />
                        {selectedNetwork === net.id && <div className="absolute top-1 right-1 w-2 h-2 bg-[#38bdf8] rounded-full" />}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase ml-1">Numéro {selectedNetwork.toUpperCase()}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#38bdf8] font-bold text-xs">+229</span>
                      <input type="tel" placeholder="00 00 00 00" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-14 pr-4 text-white text-sm focus:outline-none focus:border-[#38bdf8]/50" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* --- AUTRES MOYENS --- */}
            <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setPaymentMethod("paypal")} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === 'paypal' ? 'border-[#38bdf8] bg-[#38bdf8]/5' : 'border-white/5 bg-white/[0.02]'}`}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                </div>
                <div onClick={() => setPaymentMethod("western")} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === 'western' ? 'border-[#38bdf8] bg-[#38bdf8]/5' : 'border-white/5 bg-white/[0.02]'}`}>
                    <Globe size={18} className="text-[#38bdf8]" />
                    <span className="text-white font-bold text-[10px] uppercase">Western Union</span>
                </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5 flex items-start gap-4">
            <ShieldCheck className="text-[#38bdf8] shrink-0" size={20} />
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Vos transactions sont sécurisées par SSL 256 bits. Les logos sont utilisés à des fins de simulation visuelle.
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
                    <p className="text-white text-xs font-bold">{item.name}</p>
                    <p className="text-slate-500 text-[10px]">Qté: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-white font-bold text-sm">{item.price * item.quantity}€</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-6 space-y-4">
            <div className="flex justify-between text-white text-2xl font-black pt-4 border-t border-white/5">
              <span>TOTAL</span>
              <span className="text-[#38bdf8]">{cartTotal}€</span>
            </div>
          </div>

          <button onClick={handlePayment} disabled={isProcessing || cart.length === 0} className="w-full bg-[#38bdf8] text-[#0f172a] py-5 rounded-2xl font-black uppercase tracking-widest mt-10 hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-3">
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Traitement sécurisé...
              </>
            ) : (
              <>
                <Lock size={18} />
                Payer {cartTotal}€
              </>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}

function Loader2({ className, size }: { className?: string, size?: number }) {
  return <Smartphone className={className} size={size} />;
}