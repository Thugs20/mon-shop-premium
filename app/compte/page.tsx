"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db, auth } from "../../lib/firebase";
import { collection, query, where, getDocs, orderBy, doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  User, Package, LogOut, Calendar, 
  CreditCard, ChevronRight, ShoppingBag, Loader2,
  MapPin, Download, Truck, CheckCircle2, X
} from "lucide-react";

// --- CORRECTION DES IMPORTS PDF ---
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Message de succès
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

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // --- LOGIQUE RÉELLE DE GÉNÉRATION PDF ---
  const handleDownloadInvoice = (order: any) => {
    const docPdf = new jsPDF();
    const primaryColor = [29, 132, 177]; // #1d84b1
    const darkColor = [51, 65, 85];    // #334155
    const lightGray = [241, 245, 249]; // #f1f5f9

    // --- 1. FILIGRANE (WATERMARK) ---
    docPdf.setTextColor(64, 64, 64); // Très léger
    docPdf.setFontSize(60);
    docPdf.setFont("helvetica", "bold");
    docPdf.saveGraphicsState();
    docPdf.setGState(new (docPdf as any).GState({ opacity: 0.1 })); // Transparence
    docPdf.text("PREMIUM SHOP", 40, 150, { angle: 45 });
    docPdf.restoreGraphicsState();

    // --- 2. LOGO & HEADER ---
    // Un petit rectangle décoratif en haut à droite pour le style
    docPdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    docPdf.rect(160, 0, 50, 10, 'F');

    docPdf.setFont("helvetica", "bold");
    docPdf.setFontSize(26);
    docPdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    docPdf.text("PREMIUM", 20, 30);
    docPdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    docPdf.text("SHOP", 68, 30); // Décalé après PREMIUM

    // --- 3. INFOS FACTURE ---
    docPdf.setFontSize(9);
    docPdf.setTextColor(100);
    docPdf.setFont("helvetica", "normal");
    docPdf.text("RÉFÉRENCE COMMANDE", 140, 25);
    docPdf.setFont("helvetica", "bold");
    docPdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    docPdf.text(`#${order.id.slice(0, 10).toUpperCase()}`, 140, 30);

    docPdf.setFont("helvetica", "normal");
    docPdf.setTextColor(100);
    docPdf.text("DATE D'ÉMISSION", 140, 38);
    docPdf.setFont("helvetica", "bold");
    docPdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    docPdf.text(order.createdAt?.toDate().toLocaleDateString('fr-FR'), 140, 43);

    // --- 4. BLOC CLIENT ---
    docPdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    docPdf.roundedRect(20, 55, 80, 25, 3, 3, 'F');
    
    docPdf.setFontSize(8);
    docPdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    docPdf.text("FACTURÉ À", 25, 62);
    
    docPdf.setFontSize(10);
    docPdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    docPdf.setFont("helvetica", "bold");
    docPdf.text(user?.displayName || "Client Premium", 25, 68);
    docPdf.setFont("helvetica", "normal");
    docPdf.setFontSize(9);
    docPdf.text(order.shippingAddress?.address || "Adresse non renseignée", 25, 73);

    // --- 5. TABLEAU STYLISÉ ---
    autoTable(docPdf, {
      startY: 90,
      head: [['DÉSIGNATION', 'QTÉ', 'PRIX UNIT.', 'TOTAL HT']],
      body: order.items.map((item: any) => [
        item.name.toUpperCase(),
        item.quantity,
        `${item.price} €`,
        `${(item.price * item.quantity).toFixed(2)} €`
      ]),
      theme: 'plain', // Plus moderne
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: primaryColor as [number, number, number],
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'left',
        lineWidth: { bottom: 0.5 },
        lineColor: primaryColor as [number, number, number]
      },
      styles: {
        fontSize: 9,
        cellPadding: 6,
        textColor: [50, 50, 50]
      },
      columnStyles: {
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right', fontStyle: 'bold' }
      },
      margin: { left: 20, right: 20 }
    });

    // --- 6. RÉCAPITULATIF FINAL ---
    const finalY = (docPdf as any).lastAutoTable.finalY || 150;

    docPdf.setFontSize(10);
    docPdf.setTextColor(100);
    docPdf.text("SOUS-TOTAL", 140, finalY + 15);
    docPdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    docPdf.text(`${order.total} €`, 190, finalY + 15, { align: "right" });

    // Ligne de total
    docPdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    docPdf.setLineWidth(1);
    docPdf.line(130, finalY + 20, 190, finalY + 20);

    docPdf.setFontSize(14);
    docPdf.setFont("helvetica", "bold");
    docPdf.text("TOTAL RÉGLÉ", 140, finalY + 30);
    docPdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    docPdf.text(`${order.total} €`, 190, finalY + 30, { align: "right" });

    // --- 7. FOOTER ---
    docPdf.setFontSize(8);
    docPdf.setTextColor(180);
    docPdf.setFont("helvetica", "italic");
    docPdf.text("Document généré numériquement par Premium Shop. Merci pour votre confiance.", 105, 285, { align: "center" });

    docPdf.save(`Facture_PremiumShop_${order.id.slice(0, 8)}.pdf`);
  };

  // --- LOGIQUE DU BOUTON SUIVI / REÇU AVEC MESSAGE ---
  const handleUpdateStatus = async (orderId: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: "received" });
      
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: "received" } : o));
      
      // Affichage du message de succès
      setSuccessMessage("Commande confirmée avec succès !");
      setTimeout(() => setSuccessMessage(null), 4000); // Disparaît après 4s
    } catch (error) {
      console.error("Erreur mise à jour statut:", error);
    }
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
      <div className="max-w-6xl mx-auto space-y-12 relative">
        
        {/* MESSAGE DE SUCCÈS FLOATING */}
        {successMessage && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-[#38bdf8] text-[#0f172a] px-6 py-3 rounded-2xl shadow-2xl shadow-[#38bdf8]/20 flex items-center gap-3 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={18} />
            <span className="font-bold text-sm uppercase tracking-wider">{successMessage}</span>
            <button onClick={() => setSuccessMessage(null)} className="ml-2 hover:opacity-50">
              <X size={16} />
            </button>
          </div>
        )}

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
              <button onClick={() => router.push("/shop")} className="text-[#38bdf8] font-bold uppercase tracking-widest text-xs border-b border-[#38bdf8]/30 pb-1">
                Commencer mon shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-all">
                  <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-[#38bdf8] text-[#0f172a] text-[9px] font-black px-3 py-1 rounded-full uppercase">Payé</span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase flex items-center gap-1">
                          <Calendar size={12} /> {order.createdAt?.toDate().toLocaleDateString('fr-FR')}
                        </span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase flex items-center gap-1">
                          <CreditCard size={12} /> {order.paymentMethod === 'card' ? 'Carte Bancaire' : 'KKIAPAY'}
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-sm">Commande #{order.id.slice(0, 8).toUpperCase()}</h4>
                      <div className="flex -space-x-2">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="w-10 h-10 rounded-lg border-2 border-[#1e293b] overflow-hidden bg-slate-800">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-end gap-2">
                      <div className="text-right">
                        <p className="text-slate-500 text-[10px] font-bold uppercase">Total réglé</p>
                        <p className="text-[#38bdf8] text-2xl font-black">{order.total}€</p>
                      </div>
                      <button onClick={() => toggleOrder(order.id)} className={`p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all ${expandedOrder === order.id ? 'rotate-90 bg-[#38bdf8]/20 text-[#38bdf8]' : ''}`}>
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>

                  {expandedOrder === order.id && (
                    <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/5 bg-black/20 animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                        <div className="space-y-3">
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Articles</p>
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between bg-white/[0.03] p-3 rounded-2xl border border-white/5">
                              <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                                <div>
                                  <p className="text-white text-xs font-bold">{item.name}</p>
                                  <p className="text-slate-500 text-[10px]">Qté: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="text-white text-xs font-black">{item.price}€</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-6">
                          <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Adresse de livraison</p>
                            <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 flex gap-3">
                              <MapPin size={16} className="text-[#38bdf8] shrink-0" />
                              <div className="text-xs text-slate-300 leading-relaxed">
                                <p className="font-bold text-white mb-1">{order.shippingAddress?.fullName || user?.displayName}</p>
                                <p>{order.shippingAddress?.address}</p>
                                <p>{order.shippingAddress?.city}, {order.shippingAddress?.country}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="bg-[#38bdf8]/10 p-4 rounded-2xl border border-[#38bdf8]/20">
                               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                 <span>Sous-total</span>
                                 <span>{order.total}€</span>
                               </div>
                               <div className="flex justify-between text-sm font-black text-white pt-3 border-t border-white/10">
                                 <span>Total final</span>
                                 <span className="text-[#38bdf8]">{order.total}€</span>
                               </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <button onClick={() => handleDownloadInvoice(order)} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                                <Download size={14} /> Reçu PDF
                              </button>
                              
                              {order.status === "received" ? (
                                <button disabled className="flex items-center justify-center gap-2 bg-green-500/10 text-green-500 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-green-500/20">
                                  <CheckCircle2 size={14} /> Reçue
                                </button>
                              ) : (
                                <button onClick={() => handleUpdateStatus(order.id)} className="flex items-center justify-center gap-2 bg-[#38bdf8] hover:bg-white text-[#0f172a] py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-[#38bdf8]/20">
                                  <Truck size={14} /> Suivi / Reçue
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}