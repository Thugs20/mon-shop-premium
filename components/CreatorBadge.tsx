"use client";
import { Mail, MessageCircle, Code2 } from "lucide-react";

const CreatorBadge = () => {
  return (
    <section className="py-16 px-6 border-t border-white/5 bg-slate-900/20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
        
        {/* Photo du créateur avec effet de cercle premium */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#38bdf8] p-1">
            <img 
              src="/images/ma_photo.webp" // Remplace par le chemin de ta photo
              alt="HOUETO Fabrice"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#38bdf8] p-2 rounded-full text-[#0f172a] shadow-lg">
            <Code2 size={16} />
          </div>
        </div>

        {/* Texte et Infos */}
        <div className="text-center md:text-left space-y-4">
          <div className="space-y-1">
            <p className="text-[#38bdf8] text-[10px] font-black uppercase tracking-[0.3em]">Conception & Design</p>
            <h3 className="text-2xl font-bold text-white tracking-tight">HOUETO Fabrice</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Expert en création de sites professionnels modernes. Ce projet PremiumShop est une démonstration de mon savoir-faire technique. 
              Besoin d'un site sur-mesure ?
            </p>
          </div>

          {/* Boutons de contact rapides */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a 
              href="mailto:creaction2siteweb.com@gmail.com"
              className="flex items-center gap-2 text-white/70 hover:text-[#38bdf8] transition-colors text-xs font-bold"
            >
              <Mail size={16} />
              creaction2siteweb.com@gmail.com
            </a>
            <a 
              href="https://wa.me/2290191690292"
              target="_blank"
              className="flex items-center gap-2 text-white/70 hover:text-green-400 transition-colors text-xs font-bold"
            >
              <MessageCircle size={16} />
              WhatsApp: +229 01 91 69 02 92
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorBadge;