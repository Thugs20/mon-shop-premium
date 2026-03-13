import Navbar from "../components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PremiumShop | L'excellence du design",
  description: "Boutique e-commerce haut de gamme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Le CartProvider entoure tout pour que le panier marche partout */}
        <CartProvider>
          <FavoritesProvider>
            <Navbar />
            {children}
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}