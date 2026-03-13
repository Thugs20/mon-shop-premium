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
    image: "/images/chemises1.webp",
    category: "Chemises",
    colors: ["#38bdf8", "#ffffff"],
    specs: ["100% Coton égyptien", "Repassage facile"]
  },
    {
    id: 3,
    name: "Montre Chronos Steel",
    price: 320,
    description: "Montre élégante avec mouvement quartz haute précision.",
    image: "/images/montres1.webp",
    category: "Montres",
    colors: ["#000000","#9ca3af"],
    specs: ["Verre saphir","Bracelet acier"]
  },
  {
    id: 4,
    name: "Sac Urban Voyager",
    price: 140,
    description: "Sac moderne conçu pour les déplacements urbains.",
    image: "/images/sacs1.webp",
    category: "Sacs",
    colors: ["#111827","#4b5563"],
    specs: ["Compartiment laptop","Cuir synthétique"]
  },
  {
    id: 5,
    name: "Casque Pulse Pro",
    price: 210,
    description: "Casque audio immersif avec réduction de bruit.",
    image: "/images/audio1.webp",
    category: "Audio",
    colors: ["#000000","#374151"],
    specs: ["Noise cancelling","40h autonomie"]
  },
  {
    id: 6,
    name: "Veste Arctic Shield",
    price: 240,
    description: "Veste chaude résistante au vent.",
    image: "/images/vestes1.webp",
    category: "Vestes",
    colors: ["#020617","#6b7280"],
    specs: ["Isolation thermique","Imperméable"]
  },
  {
    id: 7,
    name: "Parfum Midnight Essence",
    price: 95,
    description: "Fragrance intense aux notes boisées.",
    image: "/images/parfums1.webp",
    category: "Parfums",
    colors: ["#111111"],
    specs: ["Notes boisées","Longue tenue"]
  },
  {
    id: 8,
    name: "Lampe Aura Minimal",
    price: 75,
    description: "Lampe design minimaliste pour intérieur moderne.",
    image: "/images/maison1.webp",
    category: "Maison",
    colors: ["#ffffff","#111827"],
    specs: ["LED économique","Design aluminium"]
  },
  {
    id: 9,
    name: "Smartwatch Nova Track",
    price: 260,
    description: "Montre connectée avec suivi santé avancé.",
    image: "/images/tech1.webp",
    category: "Tech",
    colors: ["#000000","#2563eb"],
    specs: ["GPS intégré","Suivi cardiaque"]
  },
  {
    id: 10,
    name: "Lunettes Solaris Black",
    price: 120,
    description: "Lunettes de soleil polarisées.",
    image: "/images/lunettes1.webp",
    category: "Lunettes",
    colors: ["#000000"],
    specs: ["Verres UV400","Monture légère"]
  },
  {
    id: 11,
    name: "Sneaker Velocity Prime",
    price: 178,
    description: "Sneaker dynamique pour la ville.",
    image: "/images/chaussures2.webp",
    category: "Sneakers",
    colors: ["#020617","#e5e7eb"],
    specs: ["Amorti Air","Grip urbain"]
  },
  {
    id: 12,
    name: "Chemise Skyline Fit",
    price: 102,
    description: "Chemise moderne parfaite pour le bureau.",
    image: "/images/chemises2.webp",
    category: "Chemises",
    colors: ["#ffffff","#1e40af"],
    specs: ["Coton premium","Coupe slim"]
  },
  {
    id: 13,
    name: "Enceinte Sonic Bass",
    price: 150,
    description: "Enceinte portable avec basses profondes.",
    image: "/images/audio2.webp",
    category: "Audio",
    colors: ["#000000","#ef4444"],
    specs: ["Bluetooth 5.3","20h autonomie"]
  },
  {
    id: 14,
    name: "Veste Urban Windbreaker",
    price: 170,
    description: "Veste légère coupe-vent.",
    image: "/images/vestes2.webp",
    category: "Vestes",
    colors: ["#111827","#2563eb"],
    specs: ["Coupe vent","Tissu respirant"]
  },
  {
    id: 15,
    name: "Sac Explorer Leather",
    price: 220,
    description: "Sac en cuir robuste pour voyages.",
    image: "/images/sacs2.webp",
    category: "Sacs",
    colors: ["#7c2d12"],
    specs: ["Cuir véritable","Grande capacité"]
  },
  {
    id: 16,
    name: "Montre Titan Chronograph",
    price: 410,
    description: "Montre chronographe sportive.",
    image: "/images/montres2.webp",
    category: "Montres",
    colors: ["#111827","#9ca3af"],
    specs: ["Chronographe","Résistant 10ATM"]
  },
  {
    id: 17,
    name: "Sneaker Phantom Glide",
    price: 188,
    description: "Sneaker premium futuriste.",
    image: "/images/chaussures3.webp",
    category: "Sneakers",
    colors: ["#000000","#22c55e"],
    specs: ["Semelle boost","Mesh respirant"]
  },
  {
    id: 18,
    name: "Chemise Classic Navy",
    price: 98,
    description: "Chemise bleu marine élégante.",
    image: "/images/chemises3.webp",
    category: "Chemises",
    colors: ["#1e3a8a"],
    specs: ["Coton premium","Respirante"]
  },
  {
    id: 19,
    name: "Parfum Royal Oud",
    price: 130,
    description: "Fragrance orientale raffinée.",
    image: "/images/parfums2.webp",
    category: "Parfums",
    colors: ["#111111"],
    specs: ["Oud naturel","Tenue intense"]
  },
  {
    id: 20,
    name: "Chaise Nordic Wood",
    price: 160,
    description: "Chaise design scandinave.",
    image: "/images/maison2.webp",
    category: "Maison",
    colors: ["#a16207"],
    specs: ["Bois massif","Design ergonomique"]
  },
  {
    id: 21,
    name: "Laptop AirLite 14",
    price: 980,
    description: "Ordinateur portable léger.",
    image: "/images/tech2.webp",
    category: "Tech",
    colors: ["#9ca3af"],
    specs: ["16GB RAM","SSD 512GB"]
  },
  {
    id: 22,
    name: "Lunettes Aero Vision",
    price: 135,
    description: "Lunettes élégantes anti reflets.",
    image: "/images/lunettes2.webp",
    category: "Lunettes",
    colors: ["#111827","#d1d5db"],
    specs: ["Anti reflet","Monture titane"]
  },
  {
    id: 23,
    name: "Sneaker Skyline Boost",
    price: 195,
    description: "Sneaker performance style urbain.",
    image: "/images/chaussures4.webp",
    category: "Sneakers",
    colors: ["#000000","#facc15"],
    specs: ["Semelle boost","Grip urbain"]
  },
  {
    id: 24,
    name: "Chemise Milano Prestige",
    price: 110,
    description: "Chemise élégante italienne.",
    image: "/images/chemises4.webp",
    category: "Chemises",
    colors: ["#ffffff","#111827"],
    specs: ["Coton premium","Coupe ajustée"]
  },
  {
    id: 25,
    name: "Montre Silver Edge",
    price: 290,
    description: "Montre minimaliste moderne.",
    image: "/images/montres3.webp",
    category: "Montres",
    colors: ["#9ca3af"],
    specs: ["Quartz","Bracelet acier"]
  },
  {
    id: 26,
    name: "Sac Metro Backpack",
    price: 130,
    description: "Sac à dos urbain.",
    image: "/images/sacs3.webp",
    category: "Sacs",
    colors: ["#111827"],
    specs: ["Compartiment PC","Tissu résistant"]
  },
  {
    id: 27,
    name: "Casque Studio Max",
    price: 260,
    description: "Casque audio haute fidélité.",
    image: "/images/audio3.webp",
    category: "Audio",
    colors: ["#000000"],
    specs: ["HiFi","Bluetooth"]
  },
  {
    id: 28,
    name: "Veste Alpine Pro",
    price: 260,
    description: "Veste technique montagne.",
    image: "/images/vestes3.webp",
    category: "Vestes",
    colors: ["#111827","#ef4444"],
    specs: ["Imperméable","Respirante"]
  },
  {
    id: 29,
    name: "Parfum Velvet Night",
    price: 120,
    description: "Parfum intense et élégant.",
    image: "/images/parfums3.webp",
    category: "Parfums",
    colors: ["#000000"],
    specs: ["Notes ambrées","Longue tenue"]
  },
  {
    id: 30,
    name: "Lampe Halo Light",
    price: 85,
    description: "Lampe LED moderne.",
    image: "/images/maison3.webp",
    category: "Maison",
    colors: ["#ffffff"],
    specs: ["LED","Design circulaire"]
  },
    {
    id: 31,
    name: "Sneaker Aero Street",
    price: 172,
    description: "Sneaker légère pour un usage quotidien.",
    image: "/images/chaussures5.webp",
    category: "Sneakers",
    colors: ["#000000","#ffffff"],
    specs: ["Semelle EVA","Mesh respirant"]
  },
  {
    id: 32,
    name: "Montre Lunar Steel",
    price: 350,
    description: "Montre élégante avec cadran minimaliste.",
    image: "/images/montres4.webp",
    category: "Montres",
    colors: ["#111827","#9ca3af"],
    specs: ["Quartz","Verre saphir"]
  },
  {
    id: 33,
    name: "Sac Travel Pro",
    price: 210,
    description: "Sac robuste pour voyages fréquents.",
    image: "/images/sacs4.webp",
    category: "Sacs",
    colors: ["#111827"],
    specs: ["Grande capacité","Cuir synthétique"]
  },
  {
    id: 34,
    name: "Chemise Riviera Linen",
    price: 90,
    description: "Chemise en lin idéale pour l'été.",
    image: "/images/chemises5.webp",
    category: "Chemises",
    colors: ["#f3f4f6"],
    specs: ["100% lin","Respirante"]
  },
  {
    id: 35,
    name: "Enceinte BassWave",
    price: 180,
    description: "Enceinte portable avec basses puissantes.",
    image: "/images/audio4.webp",
    category: "Audio",
    colors: ["#000000","#ef4444"],
    specs: ["Bluetooth","24h autonomie"]
  },
  {
    id: 36,
    name: "Veste Storm Guard",
    price: 260,
    description: "Veste imperméable pour météo extrême.",
    image: "/images/vestes4.webp",
    category: "Vestes",
    colors: ["#020617"],
    specs: ["Imperméable","Isolation thermique"]
  },
  {
    id: 37,
    name: "Parfum Amber Signature",
    price: 115,
    description: "Parfum aux notes ambrées profondes.",
    image: "/images/parfums4.webp",
    category: "Parfums",
    colors: ["#111111"],
    specs: ["Notes ambrées","Longue tenue"]
  },
  {
    id: 38,
    name: "Lampe Orbit LED",
    price: 92,
    description: "Lampe LED design circulaire.",
    image: "/images/maison4.webp",
    category: "Maison",
    colors: ["#ffffff"],
    specs: ["LED","Faible consommation"]
  },
  {
    id: 39,
    name: "Table Nova Glass",
    price: 420,
    description: "Table moderne avec plateau en verre.",
    image: "/images/maison5.webp",
    category: "Maison",
    colors: ["#d1d5db"],
    specs: ["Verre trempé","Structure acier"]
  },
  {
    id: 40,
    name: "Lunettes Horizon Style",
    price: 128,
    description: "Lunettes de soleil modernes.",
    image: "/images/lunettes3.webp",
    category: "Lunettes",
    colors: ["#000000","#374151"],
    specs: ["UV400","Monture légère"]
  },

  {
    id: 41,
    name: "Smartphone Nova X",
    price: 780,
    description: "Smartphone performant dernière génération.",
    image: "/images/tech3.webp",
    category: "Tech",
    colors: ["#000000","#9ca3af"],
    specs: ["128GB","OLED"]
  },
  {
    id: 42,
    name: "Sneaker Urban Drift",
    price: 168,
    description: "Sneaker au style streetwear.",
    image: "/images/chaussures6.webp",
    category: "Sneakers",
    colors: ["#111827","#10b981"],
    specs: ["Semelle confort","Mesh"]
  },
  {
    id: 43,
    name: "Montre Atlas Gold",
    price: 520,
    description: "Montre premium avec finition dorée.",
    image: "/images/montres5.webp",
    category: "Montres",
    colors: ["#facc15"],
    specs: ["Automatique","Verre saphir"]
  },
  {
    id: 44,
    name: "Sac Office Elite",
    price: 195,
    description: "Sac élégant pour professionnels.",
    image: "/images/sacs5.webp",
    category: "Sacs",
    colors: ["#111827"],
    specs: ["Compartiment laptop","Cuir"]
  },
  {
    id: 45,
    name: "Casque SoundCore Max",
    price: 240,
    description: "Casque audio studio.",
    image: "/images/audio5.webp",
    category: "Audio",
    colors: ["#000000"],
    specs: ["HiFi","Bluetooth 5"]
  },
  {
    id: 46,
    name: "Veste Urban Leather",
    price: 390,
    description: "Veste en cuir élégante.",
    image: "/images/vestes5.webp",
    category: "Vestes",
    colors: ["#000000"],
    specs: ["Cuir véritable","Doublure chaude"]
  },
  {
    id: 47,
    name: "Parfum Noir Prestige",
    price: 145,
    description: "Parfum sophistiqué longue durée.",
    image: "/images/parfums5.webp",
    category: "Parfums",
    colors: ["#111111"],
    specs: ["Notes boisées","24h tenue"]
  },
  {
    id: 48,
    name: "Chaise Minimal Nordic",
    price: 150,
    description: "Chaise design scandinave.",
    image: "/images/maison6.webp",
    category: "Maison",
    colors: ["#a16207"],
    specs: ["Bois massif","Ergonomique"]
  },
  {
    id: 49,
    name: "Tablette VisionPad",
    price: 520,
    description: "Tablette tactile haute performance.",
    image: "/images/tech4.webp",
    category: "Tech",
    colors: ["#9ca3af"],
    specs: ["10 pouces","128GB"]
  },
  {
    id: 50,
    name: "Lunettes Aero Titanium",
    price: 165,
    description: "Monture légère en titane.",
    image: "/images/lunettes4.webp",
    category: "Lunettes",
    colors: ["#111827"],
    specs: ["Titane","Anti reflet"]
  },
    {
    id: 51,
    name: "Sneaker Pulse Runner",
    price: 182,
    description: "Sneaker sportive au confort durable.",
    image: "/images/chaussures7.webp",
    category: "Sneakers",
    colors: ["#000000","#f87171"],
    specs: ["Semelle amortie","Mesh respirant"]
  },
  {
    id: 52,
    name: "Chemise Royal White",
    price: 105,
    description: "Chemise blanche élégante pour occasions formelles.",
    image: "/images/chemises6.webp",
    category: "Chemises",
    colors: ["#ffffff"],
    specs: ["Coton premium","Coupe slim"]
  },
  {
    id: 53,
    name: "Montre Aero Chrono",
    price: 375,
    description: "Montre chronographe au design sportif.",
    image: "/images/montres6.webp",
    category: "Montres",
    colors: ["#111827","#9ca3af"],
    specs: ["Chronographe","Bracelet acier"]
  },
  {
    id: 54,
    name: "Sac Nomad Travel",
    price: 240,
    description: "Sac robuste pour les grands voyages.",
    image: "/images/sacs6.webp",
    category: "Sacs",
    colors: ["#1f2937"],
    specs: ["Grande capacité","Résistant à l'eau"]
  },
  {
    id: 55,
    name: "Enceinte Wave Mini",
    price: 130,
    description: "Petite enceinte portable avec son puissant.",
    image: "/images/audio6.webp",
    category: "Audio",
    colors: ["#000000","#3b82f6"],
    specs: ["Bluetooth","15h autonomie"]
  },
  {
    id: 56,
    name: "Veste Urban Denim",
    price: 190,
    description: "Veste en denim pour style casual.",
    image: "/images/vestes6.webp",
    category: "Vestes",
    colors: ["#1e3a8a"],
    specs: ["Denim durable","Coupe moderne"]
  },
  {
    id: 57,
    name: "Parfum Golden Spice",
    price: 125,
    description: "Fragrance épicée et chaleureuse.",
    image: "/images/parfums6.webp",
    category: "Parfums",
    colors: ["#111111"],
    specs: ["Notes épicées","Tenue longue"]
  },
  {
    id: 58,
    name: "Lampe Zen Light",
    price: 88,
    description: "Lampe décorative pour ambiance relaxante.",
    image: "/images/maison7.webp",
    category: "Maison",
    colors: ["#f3f4f6"],
    specs: ["LED","Lumière douce"]
  },
  {
    id: 59,
    name: "Smartwatch FitTrack",
    price: 230,
    description: "Montre connectée pour suivi sportif.",
    image: "/images/tech5.webp",
    category: "Tech",
    colors: ["#000000","#10b981"],
    specs: ["Suivi sport","GPS"]
  },
  {
    id: 60,
    name: "Lunettes Sun Elite",
    price: 140,
    description: "Lunettes élégantes avec protection UV.",
    image: "/images/lunettes5.webp",
    category: "Lunettes",
    colors: ["#000000","#9ca3af"],
    specs: ["UV400","Monture légère"]
  },

  {
    id: 61,
    name: "Sneaker Street Nova",
    price: 176,
    description: "Sneaker moderne pour style urbain.",
    image: "/images/chaussures8.webp",
    category: "Sneakers",
    colors: ["#020617","#d1d5db"],
    specs: ["Semelle EVA","Respirant"]
  },
  {
    id: 62,
    name: "Chemise Business Blue",
    price: 108,
    description: "Chemise élégante pour le travail.",
    image: "/images/chemises7.webp",
    category: "Chemises",
    colors: ["#1e40af"],
    specs: ["Coton premium","Anti plis"]
  },
  {
    id: 63,
    name: "Montre Prestige Silver",
    price: 440,
    description: "Montre haut de gamme en acier.",
    image: "/images/montres7.webp",
    category: "Montres",
    colors: ["#9ca3af"],
    specs: ["Automatique","Verre saphir"]
  },
  {
    id: 64,
    name: "Sac Metro Compact",
    price: 150,
    description: "Sac compact pour usage quotidien.",
    image: "/images/sacs7.webp",
    category: "Sacs",
    colors: ["#111827"],
    specs: ["Compact","Résistant"]
  },
  {
    id: 65,
    name: "Casque Studio Pulse",
    price: 265,
    description: "Casque audio studio professionnel.",
    image: "/images/audio7.webp",
    category: "Audio",
    colors: ["#000000"],
    specs: ["HiFi","Bluetooth"]
  },
  {
    id: 66,
    name: "Veste Winter Pro",
    price: 320,
    description: "Veste chaude pour conditions froides.",
    image: "/images/vestes7.webp",
    category: "Vestes",
    colors: ["#111827"],
    specs: ["Isolation thermique","Imperméable"]
  },
  {
    id: 67,
    name: "Parfum Crystal Fresh",
    price: 110,
    description: "Parfum frais et léger.",
    image: "/images/parfums7.webp",
    category: "Parfums",
    colors: ["#ffffff"],
    specs: ["Notes citronnées","Longue tenue"]
  },
  {
    id: 68,
    name: "Table Nordic Oak",
    price: 480,
    description: "Table en bois massif style nordique.",
    image: "/images/maison8.webp",
    category: "Maison",
    colors: ["#92400e"],
    specs: ["Bois massif","Design moderne"]
  },
  {
    id: 69,
    name: "Laptop NovaBook",
    price: 1100,
    description: "Ordinateur portable puissant.",
    image: "/images/tech6.webp",
    category: "Tech",
    colors: ["#9ca3af"],
    specs: ["16GB RAM","1TB SSD"]
  },
  {
    id: 70,
    name: "Lunettes Titanium Frame",
    price: 180,
    description: "Monture élégante en titane.",
    image: "/images/lunettes6.webp",
    category: "Lunettes",
    colors: ["#374151"],
    specs: ["Titane","Anti reflet"]
  },

  {
    id: 71,
    name: "Sneaker Apex Run",
    price: 192,
    description: "Sneaker haute performance.",
    image: "/images/chaussures9.webp",
    category: "Sneakers",
    colors: ["#000000","#22c55e"],
    specs: ["Amorti boost","Respirant"]
  },
  {
    id: 72,
    name: "Chemise Classic Grey",
    price: 92,
    description: "Chemise grise élégante.",
    image: "/images/chemises8.webp",
    category: "Chemises",
    colors: ["#9ca3af"],
    specs: ["Coton doux","Coupe moderne"]
  },
  {
    id: 73,
    name: "Montre Black Titanium",
    price: 510,
    description: "Montre en titane noir premium.",
    image: "/images/montres8.webp",
    category: "Montres",
    colors: ["#020617"],
    specs: ["Titane","Automatique"]
  },
  {
    id: 74,
    name: "Sac Business Elite",
    price: 230,
    description: "Sac professionnel élégant.",
    image: "/images/sacs8.webp",
    category: "Sacs",
    colors: ["#111827"],
    specs: ["Compartiment PC","Cuir"]
  },
  {
    id: 75,
    name: "Enceinte BoomMax",
    price: 210,
    description: "Enceinte puissante pour soirées.",
    image: "/images/audio8.webp",
    category: "Audio",
    colors: ["#000000","#ef4444"],
    specs: ["Bluetooth","Bass boost"]
  },
  {
    id: 76,
    name: "Veste Alpine Explorer",
    price: 350,
    description: "Veste technique pour aventures.",
    image: "/images/vestes8.webp",
    category: "Vestes",
    colors: ["#1f2937"],
    specs: ["Respirante","Imperméable"]
  },
  {
    id: 77,
    name: "Parfum Ocean Breeze",
    price: 105,
    description: "Parfum frais inspiré de l'océan.",
    image: "/images/parfums8.webp",
    category: "Parfums",
    colors: ["#ffffff"],
    specs: ["Notes marines","Longue tenue"]
  },
  {
    id: 78,
    name: "Lampe Modern Cube",
    price: 95,
    description: "Lampe décorative design cube.",
    image: "/images/maison9.webp",
    category: "Maison",
    colors: ["#f3f4f6"],
    specs: ["LED","Design minimal"]
  },
  {
    id: 79,
    name: "Smartphone Orion Pro",
    price: 890,
    description: "Smartphone puissant avec écran OLED.",
    image: "/images/tech7.webp",
    category: "Tech",
    colors: ["#000000"],
    specs: ["OLED","256GB"]
  },
  {
    id: 80,
    name: "Lunettes Retro Vision",
    price: 150,
    description: "Lunettes style rétro chic.",
    image: "/images/lunettes7.webp",
    category: "Lunettes",
    colors: ["#111827","#d1d5db"],
    specs: ["UV400","Monture métal"]
  },

  {
    id: 81,
    name: "Sneaker Velocity Max",
    price: 200,
    description: "Sneaker performance pour sport.",
    image: "/images/chaussures10.webp",
    category: "Sneakers",
    colors: ["#000000","#facc15"],
    specs: ["Amorti dynamique","Grip"]
  },
  {
    id: 82,
    name: "Chemise Elite White",
    price: 115,
    description: "Chemise premium pour occasions formelles.",
    image: "/images/chemises9.webp",
    category: "Chemises",
    colors: ["#ffffff"],
    specs: ["Coton italien","Coupe slim"]
  },
  {
    id: 83,
    name: "Montre Horizon Gold",
    price: 560,
    description: "Montre élégante finition dorée.",
    image: "/images/montres9.webp",
    category: "Montres",
    colors: ["#facc15"],
    specs: ["Automatique","Bracelet acier"]
  },
  {
    id: 84,
    name: "Sac Explorer Trek",
    price: 210,
    description: "Sac solide pour voyages et aventures.",
    image: "/images/sacs9.webp",
    category: "Sacs",
    colors: ["#111827"],
    specs: ["Résistant","Grande capacité"]
  },
  {
    id: 85,
    name: "Casque Bass Studio",
    price: 280,
    description: "Casque audio professionnel.",
    image: "/images/audio9.webp",
    category: "Audio",
    colors: ["#000000"],
    specs: ["HiFi","Noise cancelling"]
  },
  {
    id: 86,
    name: "Veste Classic Coat",
    price: 330,
    description: "Manteau élégant pour hiver.",
    image: "/images/vestes9.webp",
    category: "Vestes",
    colors: ["#020617"],
    specs: ["Laine","Chaud"]
  },
  {
    id: 87,
    name: "Parfum Night Velvet",
    price: 135,
    description: "Fragrance profonde et mystérieuse.",
    image: "/images/parfums9.webp",
    category: "Parfums",
    colors: ["#000000"],
    specs: ["Notes boisées","Longue tenue"]
  },
  {
    id: 88,
    name: "Chaise Loft Modern",
    price: 175,
    description: "Chaise design style loft.",
    image: "/images/maison10.webp",
    category: "Maison",
    colors: ["#374151"],
    specs: ["Structure acier","Assise confortable"]
  },
  {
    id: 89,
    name: "Tablette NovaTab",
    price: 620,
    description: "Tablette tactile rapide et fluide.",
    image: "/images/tech8.webp",
    category: "Tech",
    colors: ["#9ca3af"],
    specs: ["128GB","10 pouces"]
  },
  {
    id: 90,
    name: "Lunettes Carbon Frame",
    price: 170,
    description: "Monture légère en fibre carbone.",
    image: "/images/lunettes8.webp",
    category: "Lunettes",
    colors: ["#000000"],
    specs: ["Carbone","Ultra léger"]
  },

  {
    id: 91,
    name: "Sneaker Fusion Run",
    price: 205,
    description: "Sneaker moderne haute performance.",
    image: "/images/chaussures11.webp",
    category: "Sneakers",
    colors: ["#111827","#22c55e"],
    specs: ["Amorti boost","Respirant"]
  },
  {
    id: 92,
    name: "Chemise Prestige Black",
    price: 118,
    description: "Chemise noire élégante.",
    image: "/images/chemises10.webp",
    category: "Chemises",
    colors: ["#000000"],
    specs: ["Coton premium","Coupe slim"]
  },
  {
    id: 93,
    name: "Montre Solar Edge",
    price: 470,
    description: "Montre solaire moderne.",
    image: "/images/montres10.webp",
    category: "Montres",
    colors: ["#111827"],
    specs: ["Solaire","Verre saphir"]
  },
  {
    id: 94,
    name: "Sac Urban Classic",
    price: 165,
    description: "Sac polyvalent pour usage quotidien.",
    image: "/images/sacs10.webp",
    category: "Sacs",
    colors: ["#1f2937"],
    specs: ["Résistant","Compartiments multiples"]
  },
  {
    id: 95,
    name: "Enceinte Pulse Boom",
    price: 190,
    description: "Enceinte portable puissante.",
    image: "/images/audio10.webp",
    category: "Audio",
    colors: ["#000000","#ef4444"],
    specs: ["Bluetooth","Bass boost"]
  },
  {
    id: 96,
    name: "Veste Storm Pro",
    price: 360,
    description: "Veste technique pour conditions extrêmes.",
    image: "/images/vestes10.webp",
    category: "Vestes",
    colors: ["#020617"],
    specs: ["Imperméable","Respirante"]
  },
  {
    id: 97,
    name: "Parfum Imperial Gold",
    price: 150,
    description: "Fragrance luxueuse et intense.",
    image: "/images/parfums10.webp",
    category: "Parfums",
    colors: ["#facc15"],
    specs: ["Notes orientales","Longue tenue"]
  },
  {
    id: 98,
    name: "Lampe Halo Ring",
    price: 105,
    description: "Lampe LED design circulaire moderne.",
    image: "/images/maison11.webp",
    category: "Maison",
    colors: ["#ffffff"],
    specs: ["LED","Design minimal"]
  },
  {
    id: 99,
    name: "Laptop OrionBook",
    price: 1250,
    description: "Ordinateur portable puissant pour travail.",
    image: "/images/tech9.webp",
    category: "Tech",
    colors: ["#9ca3af"],
    specs: ["32GB RAM","1TB SSD"]
  },
  {
    id: 100,
    name: "Lunettes Urban Frame",
    price: 160,
    description: "Monture élégante pour usage quotidien.",
    image: "/images/lunettes9.webp",
    category: "Lunettes",
    colors: ["#111827"],
    specs: ["Anti reflet","Monture métal"]
  },
  {
    id: 101,
    name: "Smartwatch Zenith Pro",
    price: 295,
    description: "Montre connectée haut de gamme.",
    image: "/images/tech10.webp",
    category: "Tech",
    colors: ["#000000"],
    specs: ["GPS","Suivi santé"]
  },
  {
    id: 102,
    name: "Lunettes Skyline Vision",
    price: 175,
    description: "Lunettes premium au design moderne.",
    image: "/images/lunettes10.webp",
    category: "Lunettes",
    colors: ["#374151"],
    specs: ["UV400","Monture titane"]
  }
];