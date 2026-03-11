import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      {/* L'effet Glassmorphism : bg-white/10 et backdrop-blur */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-8 py-4 rounded-2xl flex justify-between items-center shadow-2xl">
        
        <div className="text-white font-bold text-xl tracking-tighter">
          PREMIUM<span className="text-blue-500">SHOP</span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition">Accueil</Link>
          <Link href="/boutique" className="hover:text-white transition">Boutique</Link>
          <Link href="/panier" className="bg-blue-600 px-5 py-2 rounded-xl text-white hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">
            Panier (0)
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;