"use client";
import { Mail, ArrowRight, Sparkles } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden bg-[#38bdf8] rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-[#38bdf8]/20">
          
          {/* Déco subtile en arrière-plan */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <Sparkles size={14} className="text-[#38bdf8]" />
                Accès Privilège
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tighter leading-none">
                REJOIGNEZ LE <br /> CLUB PREMIUM.
              </h2>
              <p className="text-[#0f172a]/70 text-lg font-medium max-w-sm">
                Inscrivez-vous pour recevoir nos sorties exclusives et des offres réservées à nos membres.
              </p>
            </div>

            <div className="relative">
              <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="w-full bg-white/90 backdrop-blur-md border-none py-6 px-8 rounded-2xl text-[#0f172a] placeholder:text-slate-400 font-bold focus:ring-4 focus:ring-[#0f172a]/10 transition-all outline-none"
                />
                <button className="absolute right-2 bg-[#0f172a] text-white p-4 rounded-xl hover:scale-105 transition-all active:scale-95 group">
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              <p className="mt-4 text-[10px] text-[#0f172a]/50 font-bold uppercase tracking-widest ml-2">
                Zéro spam. Uniquement l'excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;