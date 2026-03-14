"use client";
import { ShieldCheck, Zap, Globe, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="bg-[#1e293b] min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* SECTION 1 : INTRODUCTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#38bdf8]/10 text-[#38bdf8] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
              <Award size={14} />
              L'Élite du Digital
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              BIENVENUE CHEZ <span className="text-[#38bdf8]">PREMIUM</span>SHOP.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Plus qu'une simple boutique, PremiumShop est le fruit d'une vision : 
              allier l'élégance du design moderne à une performance technique irréprochable. 
              Chaque produit est sélectionné pour sa qualité exceptionnelle et son caractère unique.
            </p>
          </div>
          
          <div className="relative">
            {/* Effet visuel "Glassmorphism" pour l'image de marque */}
            <div className="absolute inset-0 bg-[#38bdf8] blur-[120px] opacity-20" />
            <div className="relative aspect-square rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl p-8 flex items-center justify-center">
               <div className="text-center space-y-4">
                  <div className="text-8xl font-black text-white/10">2026</div>
                  <div className="text-white font-bold tracking-widest uppercase text-sm">Établi pour l'Excellence</div>
               </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 : NOS VALEURS (GRILLE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <ShieldCheck className="text-[#38bdf8]" size={32} />,
              title: "Qualité Certifiée",
              desc: "Chaque article passe un contrôle rigoureux pour garantir une satisfaction totale."
            },
            {
              icon: <Zap className="text-yellow-400" size={32} />,
              title: "Expérience Fluide",
              desc: "Un site optimisé, rapide et sécurisé pour un confort d'achat optimal."
            },
            {
              icon: <Globe className="text-green-400" size={32} />,
              title: "Impact Global",
              desc: "Nous livrons l'excellence partout dans le monde avec un suivi en temps réel."
            }
          ].map((val, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
              <div className="mb-6">{val.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{val.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* SECTION 3 : LA SIGNATURE TECHNIQUE */}
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[3.5rem] p-8 md:p-20 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
             <div className="text-white font-black text-9xl">HFR</div>
          </div>
          
          <div className="relative z-10 max-w-2xl space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              CONÇU PAR UN DÉVELOPPEUR, <br />
              POUR DES UTILISATEURS EXIGEANTS.
            </h2>
            <p className="text-slate-400 font-medium italic">
              "En créant PremiumShop, j'ai voulu prouver que le e-commerce pouvait être aussi beau que fonctionnel. Pas de templates génériques, juste du code propre et une passion pour l'interface utilisateur."
            </p>
            <div className="flex items-center gap-4">
               <div className="w-12 h-1 bg-[#38bdf8]" />
               <span className="text-white font-bold uppercase tracking-widest text-xs">HOUETO Fabrice — Lead Developer</span>
            </div>
            
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-4 bg-white text-[#0f172a] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#38bdf8] transition-all active:scale-95 group"
            >
              Découvrir la collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
};

export default AboutPage;