"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db, auth } from "../../lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  User, Package, LogOut, Calendar, 
  CreditCard, ChevronRight, ShoppingBag, Loader2 
} from "lucide-react";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(ordersData);
        } catch (error) {
          console.error("Erreur lors de la récupération des commandes:", error);
        } finally {
          setLoadingOrders(false);
        }
      }
    };

    fetchOrders();
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (authLoading || (user && loadingOrders)) {
    return (
      <div className="min-h-screen bg-[#1e293b] flex items-center justify-center">
        <Loader2 className="text-[#38bdf8] animate-spin" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1e293b] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER PROFIL */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#38bdf8] to-blue-600 rounded-full flex items-center justify-center text-[#0f172a] font-black text-2xl shadow-lg shadow-[#38bdf8]/20">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <User size={32} />}
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter">
                {user?.displayName || "Membre Premium"}
              </h1>
              <p className="text-slate-500 font-medium">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            Déconnexion
          </button>
        </div>

        {/* SECTION COMMANDES */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 ml-2">
            <Package size={20} className="text-[#38bdf8]" />
            <h2 className="text-white font-black uppercase tracking-widest text-sm">Historique des achats</h2>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-16 text-center space-y-4">
              <ShoppingBag size={48} className="text-slate-700 mx-auto" />
              <p className="text-slate-400 font-medium italic">Vous n'avez pas encore passé de commande.</p>
              <button 
                onClick={() => router.push("/shop")}
                className="text-[#38bdf8] font-bold uppercase tracking-widest text-xs border-b border-[#38bdf8]/30 pb-1"
              >
                Commencer mon shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl hover:bg-white/[0.04] transition-all">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    {/* Infos commande */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-[#38bdf8] text-[#0f172a] text-[9px] font-black px-3 py-1 rounded-full uppercase">
                          Payé
                        </span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase flex items-center gap-1">
                          <Calendar size={12} />
                          {order.createdAt?.toDate().toLocaleDateString('fr-FR')}
                        </span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase flex items-center gap-1">
                          <CreditCard size={12} />
                          {order.paymentMethod === 'card' ? 'Carte Bancaire' : 'KKIAPAY'}
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-sm">Commande #{order.id.slice(0, 8).toUpperCase()}</h4>
                      
                      {/* Miniatures produits */}
                      <div className="flex -space-x-2">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="w-10 h-10 rounded-lg border-2 border-[#1e293b] overflow-hidden bg-slate-800">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total et Action */}
                    <div className="flex flex-row md:flex-col justify-between items-end gap-2">
                      <div className="text-right">
                        <p className="text-slate-500 text-[10px] font-bold uppercase">Total réglé</p>
                        <p className="text-[#38bdf8] text-2xl font-black">{order.total}€</p>
                      </div>
                      <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}