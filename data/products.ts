export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Montre Horizon Platinum",
    price: 1250,
    description: "L'élégance intemporelle alliée à la précision suisse.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    category: "Accessoires"
  },
  {
    id: 2,
    name: "Enceinte Aura Pure",
    price: 890,
    description: "Un son cristallin dans un design minimaliste en aluminium.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    category: "Audio"
  },
  {
    id: 3,
    name: "Lampe Éclipse LED",
    price: 450,
    description: "Éclairage intelligent avec contrôle tactile et design épuré.",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop",
    category: "Maison"
  }
];