"use client";

const Hero = () => {
  return (
    // mt-6 sur mobile (au lieu de 11) et min-h auto pour éviter le vide inutile
    <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-center pt-16 md:pt-20 mt-6 md:mt-11 overflow-hidden">
      
      {/* EFFETS DE LUMIÈRE SUBTILS */}
      <div className="absolute top-1/4 -right-20 w-[200px] h-[200px] bg-[#38bdf8]/5 blur-[60px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 gap-4 items-center">
        
        {/* CÔTÉ GAUCHE : TEXTE */}
        <div className="space-y-3 md:space-y-8">
          <div className="space-y-2 md:space-y-4">
            <span className="text-[#38bdf8] font-bold tracking-[0.2em] text-[9px] md:text-xs uppercase">
              L'exclusivité à votre portée
            </span>
            
            <h1 className="text-2xl md:text-[5.4rem] font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter uppercase">
              REFINING THE <br /> 
              <span className="text-[#38bdf8]">MODERN</span> <br />
              EXPERIENCE
            </h1>
            
            <p className="text-slate-400 text-[9px] md:text-lg max-w-sm leading-tight md:leading-relaxed">
              L'ingénierie de précision rencontre un design minimaliste.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 pt-1">
            <button className="bg-white text-[#0f172a] px-3 py-2 md:px-8 md:py-4 rounded-lg md:rounded-2xl text-[9px] md:text-sm font-bold hover:bg-[#38bdf8] transition-all shadow-lg shadow-white/5">
              Boutique
            </button>
            <button className="border border-white/10 text-white px-3 py-2 md:px-8 md:py-4 rounded-lg md:rounded-2xl text-[9px] md:text-sm font-bold hover:bg-white/5 transition-all">
              Vision
            </button>
          </div>
        </div>

        {/* CÔTÉ DROIT : IMAGE */}
        <div className="relative flex justify-center">
          <div className="relative z-10 animate-float max-w-[130px] md:max-w-[390px]">
            <img 
              src="/images/hero1.webp" 
              alt="Produit Premium" 
              className="w-full h-auto drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] md:drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)] rounded-xl md:rounded-3xl border border-white/5"
              loading="lazy"
            />
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;