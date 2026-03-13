"use client";
import Link from 'next/link';
import { useFavorites } from "@/context/FavoritesContext";
import { 
  Instagram, Twitter, Facebook, 
  ArrowUpRight, Globe, ShieldCheck 
} from "lucide-react";

const Footer = () => {
  const { favorites } = useFavorites();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLONNE 1 : LOGO & VISION */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="text-white font-black text-2xl tracking-tighter">
                PREMIUM<span className="text-[#38bdf8]">SHOP</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              L'excellence du design rencontre l'innovation technologique. 
              Votre destination pour une expérience shopping inégalée.
            </p>
            <div className="flex gap-4">
              <a className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-[#38bdf8] transition-all"><Instagram size={18} /></a>
              <a className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-[#38bdf8] transition-all"><Twitter size={18} /></a>
              <a className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-[#38bdf8] transition-all"><Facebook size={18} /></a>
            </div>
          </div>

          {/* COLONNE 2 : EXPLORER */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Explorer</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-slate-500 hover:text-white text-sm transition-colors flex items-center gap-2 group">Boutique <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/a-propos" className="text-slate-500 hover:text-white text-sm transition-colors">Notre Histoire</Link></li>
              <li><Link href="/contact" className="text-slate-500 hover:text-white text-sm transition-colors">Contact</Link></li>
              <li>
                <Link href="/favoris" className="text-slate-500 hover:text-white text-sm transition-colors flex items-center gap-2">
                  Favoris <span className="text-[10px] bg-[#38bdf8]/10 text-[#38bdf8] px-2 py-0.5 rounded-full font-bold">{favorites.length}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLONNE 3 : SERVICES */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li className="flex items-center gap-2"><Globe size={16} className="text-[#38bdf8]" /> Livraison Mondiale</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#38bdf8]" /> Paiement Sécurisé</li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Suivi de commande</Link></li>
            </ul>
          </div>

          {/* COLONNE 4 : LEGAL */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Mentions</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Conditions Générales</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Politique de Confidentialité</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>

        </div>

        {/* BARRE FINALE */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-600 text-[11px] font-bold uppercase tracking-widest">
            © {currentYear} PREMIUMSHOP — TOUS DROITS RÉSERVÉS
          </p>
          <div className="text-slate-600 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
            DESIGNED WITH <span className="text-red-500">❤</span> BY HFR WEB DESIGNER
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;