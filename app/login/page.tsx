"use client";
import { useState, useRef, useEffect } from "react"; // useEffect ajouté ici
import { auth } from "../../lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  isSignInWithEmailLink, // Ajouté pour le Magic Link
  signInWithEmailLink    // Ajouté pour le Magic Link
} from "firebase/auth";
import { useRouter } from "next/navigation";
// Ajout de Eye et EyeOff dans les imports lucide-react
import { Mail, Lock, User, ArrowRight, Sparkles, AlertCircle, Loader2, Wand2, Eye, EyeOff } from "lucide-react"; 
import ReCAPTCHA from "react-google-recaptcha"; 

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const [captchaToken, setCaptchaToken] = useState<string | null>(null); 
  const [showPassword, setShowPassword] = useState(false); // État ajouté pour la visibilité
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const router = useRouter();

  // --- BLOC LOGIQUE MAGIC LINK ---
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailStorage = window.localStorage.getItem('emailForSignIn');
      if (!emailStorage) {
        emailStorage = window.prompt('Veuillez confirmer votre e-mail pour finaliser la connexion');
      }

      if (emailStorage) {
        setIsLoading(true);
        signInWithEmailLink(auth, emailStorage, window.location.href)
          .then(() => {
            window.localStorage.removeItem('emailForSignIn');
            router.push("/shop");
          })
          .catch((err) => {
            setError("Le lien a expiré ou a déjà été utilisé.");
            setIsLoading(false);
          });
      }
    }
  }, [router]);
  // -------------------------------

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!captchaToken) {
      setError("Veuillez valider le captcha.");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true); 

    try {
      // --- AJOUT DE LA VÉRIFICATION BACKEND ---
      const verifyRes = await fetch("/api/verify-captcha", {
        method: "POST",
        body: JSON.stringify({ token: captchaToken }),
        headers: { "Content-Type": "application/json" },
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        throw new Error("Captcha invalide ou expiré.");
      }
      // -----------------------------------------

      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/shop");
    } catch (err: any) {
  setIsLoading(false); 
  
  // Si c'est notre erreur personnalisée (Captcha)
  if (err.message === "Captcha invalide ou expiré.") {
    setError(err.message);
    return;
  }

  // Tes erreurs Firebase habituelles
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
      setMessage("Lien de réinitialisation envoyé ! Vérifiez votre boîte mail ( vérifier dans le spam si vous ne voyez rien dans votre boîte) .");
      setError("");
    } catch (err) {
      setError("Erreur lors de l'envoi de l'email.");
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setError("Entrez votre email pour recevoir le lien.");
      return;
    }
    setIsLoading(true);
    try {
      const actionCodeSettings = {
        url: window.location.origin + '/login', // Dynamique pour localhost ou Vercel
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage("Lien magique envoyé ! Vérifiez vos emails ( vérifier dans le spam si vous ne voyez rien dans votre boîte).  ");
      setError("");
    } catch (err) {
      setError("Erreur lors de l'envoi du lien.");
    } finally {
      setIsLoading(false);
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
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Mot de passe" 
              className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white outline-none focus:border-[#38bdf8]" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            {/* Bouton oeil inséré ici */}
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isRegister && (
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Confirmer mot de passe" 
                className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white outline-none focus:border-[#38bdf8]" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>
          )}

          <div className="flex justify-center py-2 scale-90 sm:scale-100">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} 
              onChange={(token) => setCaptchaToken(token)}
              theme="dark"
            />
          </div>

          {error && <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase"><AlertCircle size={14}/> {error}</div>}
          {message && <div className="text-green-400 text-xs font-bold uppercase text-center">{message}</div>}

          <div className="flex flex-col gap-4">
            {!isRegister && (
              <button type="button" onClick={handleForgotPassword} className="text-[10px] text-slate-500 hover:text-white uppercase font-bold tracking-widest text-left">
                Mot de passe oublié ?
              </button>
            )}

            <button 
              disabled={isLoading || !captchaToken}
              className="w-full bg-[#38bdf8] text-[#0f172a] py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isRegister ? "S'inscrire" : "Se connecter"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        {!isRegister && (
          <button 
            onClick={handleMagicLink}
            className="w-full mt-4 flex items-center justify-center gap-2 text-slate-400 hover:text-[#38bdf8] text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            <Wand2 size={14} /> Connexion par email sans mot de passe
          </button>
        )}

        <button onClick={() => {setIsRegister(!isRegister); setError(""); setMessage("");}} className="w-full mt-6 text-slate-400 text-xs font-bold hover:text-white uppercase tracking-widest">
          {isRegister ? "Déjà membre ? Connexion" : "Pas de compte ? Créer un profil"}
        </button>
      </div>
    </main>
  );
}