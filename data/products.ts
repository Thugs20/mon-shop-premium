export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  colors: string[];
  specs: string[];
}

// Ta liste de catégories officielle
export const categories = [
  "Sneakers", "Chemises", "Vestes", "Montres", 
  "Audio", "Lunettes", "Sacs", "Parfums", "Maison", "Tech"
];

export const products: Product[] = [
  {
    id: 1,
    name: "Sneaker Vanguard Phantom",
    price: 185,
    description: "Semelle aérodynamique et confort absolu pour un style urbain premium.",
    image: "/images/chaussures1.webp", // À toi d'ajouter l'image ici plus tard
    category: "Sneakers",
    colors: ["#000000", "#ffffff"],
    specs: ["Cuir véritable", "Semelle Memory Foam"]
  },
  {
    id: 2,
    name: "Chemise Oxford Azure",
    price: 95,
    description: "Coupe ajustée et coton égyptien pour une allure impeccable en toute circonstance.",
    image: "/images/products/chemise-1.webp",
    category: "Chemises",
    colors: ["#38bdf8", "#ffffff"],
    specs: ["100% Coton égyptien", "Repassage facile"]
  },
  // Tu pourras dupliquer et changer les ID/Noms pour atteindre tes 100 produits
];