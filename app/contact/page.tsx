"use client";
import { Mail, MessageCircle, MapPin, Send, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <main className="bg-[#1e293b] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête */}
        <div className="mb-16 space-y-4">
          <h2 className="text-[#38bdf8] font-bold tracking-[0.3em] text-xs uppercase">
            Service Client
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            CONTACTEZ-<span className="text-slate-600">NOUS.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Une question sur une commande ou besoin d'une expertise ? Notre équipe est à votre disposition pour vous offrir une assistance sur-mesure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* GAUCHE : Formulaire */}
          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Nom complet</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 px-6 text-white placeholder:text-slate-700 outline-none focus:border-[#38bdf8] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 px-6 text-white placeholder:text-slate-700 outline-none focus:border-[#38bdf8] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Sujet</label>
                <select className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#38bdf8] transition-colors appearance-none">
                  <option>Service après-vente</option>
                  <option>Question sur un produit</option>
                  <option>Collaboration</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 px-6 text-white placeholder:text-slate-700 outline-none focus:border-[#38bdf8] transition-colors resize-none"
                />
              </div>

              <button className="w-full bg-[#38bdf8] text-[#0f172a] py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all active:scale-[0.98]">
                Envoyer le message
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* DROITE : Informations de contact */}
          <div className="space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {/* Email */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 bg-[#38bdf8]/10 rounded-2xl flex items-center justify-center text-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-[#0f172a] transition-all">
                  <Mail size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold">Email</h4>
                  <p className="text-slate-500 text-sm">creaction2siteweb.com@gmail.com</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageCircle size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold">WhatsApp</h4>
                  <p className="text-slate-500 text-sm">+229 01 91 69 02 92</p>
                </div>
              </div>

              {/* Disponibilité */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
                  <Clock size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold">Heures d'ouverture</h4>
                  <p className="text-slate-500 text-sm">Lun - Ven : 09h00 - 19h00</p>
                </div>
              </div>
            </div>

            {/* Carte ou Label de localisation */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#38bdf8]/10 to-transparent border border-white/5 relative overflow-hidden group">
              <MapPin className="absolute -right-4 -bottom-4 size-32 text-white/5 group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-white font-bold mb-2">Notre Siège</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bénin, Ouémé, <br />
                Ekpe, Quartier résidentiel.
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
};

export default ContactPage;