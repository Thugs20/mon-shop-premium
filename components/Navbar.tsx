import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="fixed top-6 left-0 right-0 flex justify-center z-50 px-4">
      {/* Barre de navigation horizontale */}
      <nav className="flex w-full max-w-6xl items-center justify-between bg-white/15 backdrop-blur-2xl border border-white/30 px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* LOGO */}
        <div className="text-white font-bold text-xl tracking-tighter">
          PREMIUM<span className="text-[#38bdf8]">SHOP</span>
        </div>
        
        {/* LIENS & PANIER - Toujours visibles pour l'instant */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-200">
            <Link href="/" className="hover:text-[#38bdf8] transition-colors">Accueil</Link>
            <Link href="/boutique" className="hover:text-[#38bdf8] transition-colors">Boutique</Link>
          </div>
          
          <Link href="/panier" className="bg-[#38bdf8] text-[#0f172a] px-5 py-2 rounded-xl text-sm font-bold hover:bg-white transition-all">
            Panier (0)
          </Link>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;