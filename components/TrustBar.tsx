"use client";
import { Truck, ShieldCheck, Gem, Headphones } from "lucide-react";

const TrustBar = () => {
  const features = [
    { icon: <Truck size={18} />, text: "Livraison 48h" },
    { icon: <ShieldCheck size={18} />, text: "Paiement Sécurisé" },
    { icon: <Gem size={18} />, text: "Qualité Certifiée" },
    { icon: <Headphones size={18} />, text: "Support VIP" },
  ];

  return (
    // Ajout de mt-10 ou mt-20 pour décoller du Hero sur Desktop
    <div className="w-full bg-[#1e293b]/50 border-y border-white/5 py-6 md:py-10 mt-0 md:mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* On garde le grid-cols-2 sur mobile pour rester cohérent avec le Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-4">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center md:justify-start gap-3 group transition-all"
            >
              <div className="text-[#38bdf8] group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-slate-300 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;