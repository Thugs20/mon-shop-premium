// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMBBfqEVgJFhA3CGixg3e-KFJSivZi6Wo",
  authDomain: "premiumshop-4f78b.firebaseapp.com",
  projectId: "premiumshop-4f78b",
  storageBucket: "premiumshop-4f78b.firebasestorage.app",
  messagingSenderId: "430807071791",
  appId: "1:430807071791:web:f2381ff98209cbd68e5ada"
};

// Initialisation de Firebase (évite les erreurs au rechargement sur Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// On exporte les services pour les utiliser ailleurs
export const auth = getAuth(app);
export const db = getFirestore(app);