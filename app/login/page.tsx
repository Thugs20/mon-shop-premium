"use client";
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail 
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nouveau
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Pour le succès du reset mail
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (isRegister && password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/shop");
    } catch (err: any) {
      // Gestion des erreurs Firebase
      if (err.code === 'auth/user-not-found') setError("Aucun compte trouvé avec cet email.");
      else if (err.code === 'auth/wrong-password') setError("Mot de passe incorrect.");
      else if (err.code === 'auth/email-already-in-use') setError("Cet email est déjà utilisé.");
      else if (err.code === 'auth/invalid-email') setError("Format d'email invalide.");
      else setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Entrez votre email pour recevoir le lien de réinitialisation.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Lien de réinitialisation envoyé ! Vérifiez votre boîte mail.");
      setError("");
    } catch (err) {
      setError("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <main className="min-h-screen bg-[#1e293b] flex items-center justify-center px-6 pt-20">
      <div className="relative w-full max-w-md bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-2xl">
        <h1 className="text-3xl font-black text-white text-center mb-8 uppercase tracking-tighter">
          {isRegister ? "Créer un profil" : "Identification"}
        </h1>

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegister && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input type="text" placeholder="Nom complet" className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-[#38bdf8]" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input type="email" placeholder="Email" className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-[#38bdf8]" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input type="password" placeholder="Mot de passe" className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-[#38bdf8]" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {isRegister && (
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input type="password" placeholder="Confirmer mot de passe" className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-[#38bdf8]" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          )}

          {error && <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase"><AlertCircle size={14}/> {error}</div>}
          {message && <div className="text-green-400 text-xs font-bold uppercase text-center">{message}</div>}

          {!isRegister && (
            <button type="button" onClick={handleForgotPassword} className="text-[10px] text-slate-500 hover:text-white uppercase font-bold tracking-widest">
              Mot de passe oublié ?
            </button>
          )}

          <button className="w-full bg-[#38bdf8] text-[#0f172a] py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all">
            {isRegister ? "S'inscrire" : "Se connecter"}
            <ArrowRight size={18} />
          </button>
        </form>

        <button onClick={() => {setIsRegister(!isRegister); setError(""); setMessage("");}} className="w-full mt-6 text-slate-400 text-xs font-bold hover:text-white uppercase tracking-widest">
          {isRegister ? "Déjà membre ? Connexion" : "Pas de compte ? Créer un profil"}
        </button>
      </div>
    </main>
  );
}