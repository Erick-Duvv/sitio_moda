import { ShopProduct } from "../components/shop/ShopProductCard";

export interface ExtendedProduct extends ShopProduct {
  images: string[];
  description: string;
  composition: string;
  care: string[];
}

export const PRODUCTS: ExtendedProduct[] = [
  {
    id: 1,
    name: "Vestido Structural",
    category: "Vestidos",
    price: "€ 385",
    image: "https://images.unsplash.com/photo-1746730921745-5f6afa4c56c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1746730921745-5f6afa4c56c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", 
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["XS", "S", "M", "L"],
    color: "Crema",
    colorHex: "#F5EFE1",
    isNew: true,
    description: "Una pieza arquitectónica que redefine la silueta contemporánea. Confeccionado en una mezcla de algodón y lino de alta densidad, este vestido presenta líneas limpias y una estructura que mantiene su forma, evocando la estética brutalista con una suavidad inesperada.",
    composition: "65% Algodón Orgánico, 35% Lino Europeo",
    care: ["Lavar en seco solamente", "No usar lejía", "Planchar a baja temperatura", "Guardar colgado para mantener la estructura"]
  },
  {
    id: 2,
    name: "Abrigo Nocturne",
    category: "Abrigos",
    price: "€ 490",
    image: "https://images.unsplash.com/photo-1651065566483-422c476f2047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1651065566483-422c476f2047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["S", "M", "L", "XL"],
    color: "Negro",
    colorHex: "#1A1A1A",
    description: "El abrigo definitivo para la noche urbana. Corte oversize con hombros marcados y solapas amplias. La lana virgen proporciona una calidez excepcional sin añadir peso innecesario.",
    composition: "100% Lana Virgen",
    care: ["Lavar en seco", "Cepillar suavemente para mantener el pelo"]
  },
  {
    id: 3,
    name: "Blazer Atelier",
    category: "Blazers",
    price: "€ 320",
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["XS", "S", "M"],
    color: "Arena",
    colorHex: "#C8B89A",
    isNew: true,
    description: "Sastrería precisa para el día a día. Este blazer de corte recto ofrece versatilidad y elegancia. Los botones de corozo natural añaden un toque orgánico al diseño minimalista.",
    composition: "80% Lana, 20% Seda",
    care: ["Lavar en seco", "Planchar con paño húmedo"]
  },
  {
    id: 4,
    name: "Falda Seda Ivoire",
    category: "Faldas",
    price: "€ 215",
    originalPrice: "€ 310",
    image: "https://images.unsplash.com/photo-1676777508421-c51b7b50df1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1676777508421-c51b7b50df1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["XS", "S", "M", "L"],
    color: "Crema",
    colorHex: "#F5EFE1",
    description: "Fluidez y movimiento en cada paso. Esta falda midi de seda cortada al bies se adapta al cuerpo de manera natural, ofreciendo una caída espectacular y un brillo sutil.",
    composition: "100% Seda Mulberry",
    care: ["Lavado a mano en frío", "Secar en plano", "Planchar a baja temperatura del revés"]
  },
  {
    id: 5,
    name: "Pantalón Palazzo",
    category: "Pantalones",
    price: "€ 195",
    image: "https://images.unsplash.com/photo-1770909792040-ccfac330491d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1770909792040-ccfac330491d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["S", "M", "L"],
    color: "Arena",
    colorHex: "#C8B89A",
    isNew: true,
    description: "Comodidad elevada a la categoría de lujo. Pantalones de pierna ancha con cintura alta, diseñados para alargar la silueta. Perfectos para transiciones del día a la noche.",
    composition: "90% Viscosa, 10% Poliéster",
    care: ["Lavado a máquina 30ºC", "No usar secadora"]
  },
  {
    id: 6,
    name: "Chaqueta Técnica",
    category: "Chaquetas",
    price: "€ 375",
    image: "https://images.unsplash.com/photo-1739961066036-c69541ee3dda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1739961066036-c69541ee3dda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1550614000-4b9519e090e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Negro",
    colorHex: "#1A1A1A",
    description: "Funcionalidad y estilo utilitario. Tejido técnico repelente al agua con múltiples bolsillos y detalles ajustables. Una prenda moderna para el clima impredecible.",
    composition: "100% Nylon Reciclado",
    care: ["Limpiar con paño húmedo", "No planchar"]
  },
  {
    id: 7,
    name: "Jersey Merino Fine",
    category: "Tops",
    price: "€ 145",
    image: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1631541909061-71e349d1f203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["XS", "S", "M", "L"],
    color: "Arena",
    colorHex: "#C8B89A",
    description: "Básico esencial de lujo. Lana merino extrafina suave al tacto, ideal para capas o para llevar solo. Cuello caja y acabados acanalados.",
    composition: "100% Lana Merino",
    care: ["Lavado a mano", "Secar en plano"]
  },
  {
    id: 8,
    name: "Vestido Largo Mineral",
    category: "Vestidos",
    price: "€ 445",
    image: "https://images.unsplash.com/photo-1746730921429-3a6489172f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1746730921429-3a6489172f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["XS", "S", "M"],
    color: "Crema",
    colorHex: "#F5EFE1",
    isNew: true,
    description: "Elegancia estatuaria. Vestido largo hasta el suelo con detalles drapeados que recuerdan a las formaciones minerales. Una pieza de declaración para ocasiones especiales.",
    composition: "100% Viscosa Sostenible",
    care: ["Lavar en seco"]
  },
  {
    id: 9,
    name: "Cazadora Cuero",
    category: "Abrigos",
    price: "€ 520",
    image: "https://images.unsplash.com/photo-1614037703835-701c7619b9ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1614037703835-701c7619b9ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["S", "M", "L"],
    color: "Negro",
    colorHex: "#1A1A1A",
    description: "Rebeldía sofisticada. Cuero de alta calidad con un corte ligeramente oversize. Detalles metálicos plateados y forro de seda.",
    composition: "100% Piel de Cordero",
    care: ["Limpieza profesional de pieles solamente"]
  },
  {
    id: 10,
    name: "Pantalón Wide Leg",
    category: "Pantalones",
    price: "€ 250",
    originalPrice: "€ 340",
    image: "https://images.unsplash.com/photo-1559334418-672d5a48531b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1559334418-672d5a48531b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["XS", "S", "M", "L"],
    color: "Terracota",
    colorHex: "#B25B3C",
    description: "Impacto visual y confort. Pantalón de pierna ancha en un tono terracota vibrante. La cintura estructurada define la figura.",
    composition: "100% Algodón",
    care: ["Lavado a máquina 30ºC"]
  },
  {
    id: 11,
    name: "Blusa Lino Atelier",
    category: "Tops",
    price: "€ 175",
    image: "https://images.unsplash.com/photo-1730714311842-02cbac4e957f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1730714311842-02cbac4e957f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Crema",
    colorHex: "#F5EFE1",
    isNew: true,
    description: "Frescura natural. Blusa de lino puro con mangas abullonadas y detalles calados. Perfecta para los días cálidos de verano.",
    composition: "100% Lino",
    care: ["Lavado a mano", "Secar a la sombra"]
  },
  {
    id: 12,
    name: "Gabardina Urban",
    category: "Abrigos",
    price: "€ 610",
    image: "https://images.unsplash.com/photo-1585731414127-93272a01bb39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1585731414127-93272a01bb39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    ],
    sizes: ["S", "M", "L"],
    color: "Arena",
    colorHex: "#C8B89A",
    description: "El clásico reinventado. Gabardina impermeable con corte moderno y detalles minimalistas. Cinturón ajustable y bolsillos profundos.",
    composition: "100% Algodón Impermeabilizado",
    care: ["Lavar en seco"]
  },
];
