# 🛒 PREMIUMSHOP - E-Commerce Modern Experience

**PREMIUMSHOP** est une application web e-commerce haute performance conçue avec une approche "Fullstack" moderne. Ce projet met l'accent sur une interface utilisateur cinématique, une sécurité renforcée et une logique de gestion de données en temps réel.

## 🚀 Technologies Utilisées

* **Framework :** [Next.js 14+](https://nextjs.org/) (App Router)
* **Langage :** TypeScript
* **Stylisation :** Tailwind CSS (Glassmorphism & Responsive Design)
* **Backend & Auth :** [Firebase](https://firebase.google.com/) (Email/Password & Magic Link)
* **Sécurité :** Google reCAPTCHA v2 avec validation côté serveur (API Routes)
* **Déploiement :** [Vercel](https://vercel.com/)

## 🛡️ Fonctionnalités Clés & Sécurité

### 🔐 Authentification Sécurisée
L'application propose trois modes de connexion :
1.  **Email/Mot de passe classique** avec gestion des erreurs Firebase.
2.  **Magic Link :** Connexion simplifiée sans mot de passe via email.
3.  **Réinitialisation de mot de passe :** Système complet de récupération.

### 🤖 Protection Anti-Robot (reCAPTCHA)
Contrairement aux intégrations basiques, PREMIUMSHOP utilise une **validation hybride** :
* **Client-side :** Widget Google reCAPTCHA pour le filtrage initial.
* **Server-side :** Une route API Next.js dédiée (`/api/verify-captcha`) communique directement avec les serveurs de Google pour valider le jeton avant toute interaction avec Firebase. Cela garantit qu'aucun script automatisé ne peut créer de comptes.

### 🎨 Design Premium
* Interface **ultra-responsive** adaptée à tous les supports.
* Utilisation de **Glassmorphism** pour un look moderne et épuré.
* Optimisation des images pour un chargement rapide.

## 📦 Installation & Configuration Locale

1.  **Cloner le projet :**
    ```bash
    git clone [https://github.com/Thugs20/mon-shop-premium](https://github.com/Thugs20/mon-shop-premium.git)
    ```
2.  **Installer les dépendances :**
    ```bash
    npm install
    ```
3.  **Configurer les variables d'environnement :**
    Créez un fichier `.env.local` à la racine et ajoutez vos clés Firebase et reCAPTCHA :
    ```env
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
    RECAPTCHA_SECRET_KEY=...
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    # (etc.)
    ```
4.  **Lancer le projet :**
    ```bash
    npm run dev
    ```
Pour visitez le site : https://mon-shop-premium.vercel.app/

## 👨‍💻 Développeur
Conçu et développé par **HOUETO Fabrice** (HFR Web Designer).
