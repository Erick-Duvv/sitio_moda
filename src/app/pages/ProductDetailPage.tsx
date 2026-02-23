import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Minus, Plus, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ShopProductCard } from "../components/shop/ShopProductCard";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const { addItem } = useCart();

  // States
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(PRODUCTS.slice(0, 4));
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedSize(null);
      setQuantity(1);
      // Mock related products (exclude current)
      const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
      setRelatedProducts(related.length > 0 ? related : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="font-serif text-xl">Producto no encontrado</p>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    addItem(product, selectedSize, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-14 lg:px-20">
        
        {/* Breadcrumb / Back Navigation could go here */}
        
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          
          {/* ── LEFT: PRODUCT GALLERY ─────────────────── */}
          <div className="flex-1 lg:w-[55%] xl:w-[60%] flex flex-col gap-4">
            {/* Main Image Container */}
            <div className="relative aspect-[3/4] bg-[#F5F5F5] w-full overflow-hidden group">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows (Desktop Hover) */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Mobile Swipe Indicators (Simple dots for now) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
                {product.images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all ${selectedImage === idx ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails (Desktop) */}
            <div className="hidden lg:grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-[3/4] bg-[#F5F5F5] overflow-hidden border transition-all ${selectedImage === idx ? "border-black" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: PRODUCT INFO ───────────────────── */}
          <div className="flex-1 lg:w-[45%] xl:w-[40%] flex flex-col pt-2 lg:pt-0">
            
            {/* Header */}
            <div className="mb-8">
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl mb-3 font-normal text-[#1A1A1A]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <p 
                  className="text-xl md:text-2xl font-medium tracking-wide"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {product.price}
                </p>
                {product.originalPrice && (
                  <p className="text-black/40 line-through font-light decoration-1">
                    {product.originalPrice}
                  </p>
                )}
              </div>
            </div>

            {/* Description Preview */}
            <div className="mb-10 text-black/70 leading-relaxed font-light text-sm md:text-base max-w-md">
              <p>{product.description}</p>
            </div>

            {/* Color Selector */}
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-black/40 mb-3 block">Color: {product.color}</span>
              <div className="flex gap-3">
                <button 
                  className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${product.color === product.color ? "border-[#1A1A1A]" : "border-transparent"}`}
                >
                  <div className="w-full h-full rounded-full border border-black/10" style={{ backgroundColor: product.colorHex }} />
                </button>
                {/* Mock other colors if needed, for now just the active one is enough for the design pattern */}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-widest text-black/40">Talla</span>
                <button className="text-xs underline text-black/60 hover:text-black">Guía de Tallas</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 flex items-center justify-center border text-sm transition-all ${
                      selectedSize === size 
                        ? "border-[#1A1A1A] bg-[#1A1A1A] text-white" 
                        : "border-black/10 hover:border-black/40 text-[#1A1A1A]"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center border border-black/10 h-12 w-full sm:w-32 px-4 justify-between">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="text-black/40 hover:text-black p-2"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="font-medium">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="text-black/40 hover:text-black p-2"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              {/* Desktop Button (Hidden on mobile if using sticky) */}
              <Button
                className="flex-1 h-12 rounded-none bg-[#117837] hover:bg-[#0e632d] text-white uppercase tracking-widest text-xs font-medium hidden md:flex"
                disabled={!selectedSize}
                onClick={handleAddToCart}
              >
                {justAdded
                  ? "✓ Añadido al carrito"
                  : selectedSize
                  ? `Añadir al Carrito — ${product.price}`
                  : "Selecciona una Talla"}
              </Button>
            </div>

            {/* Accordions */}
            <div className="border-t border-black/10">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="materials" className="border-b border-black/10">
                  <AccordionTrigger className="uppercase tracking-widest text-xs font-medium py-6 hover:no-underline">
                    Composición y Materiales
                  </AccordionTrigger>
                  <AccordionContent className="text-black/60 font-light leading-relaxed">
                    {product.composition}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care" className="border-b border-black/10">
                  <AccordionTrigger className="uppercase tracking-widest text-xs font-medium py-6 hover:no-underline">
                    Instrucciones de Cuidado
                  </AccordionTrigger>
                  <AccordionContent className="text-black/60 font-light leading-relaxed">
                    <ul className="list-disc pl-4 space-y-1">
                      {product.care.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-b border-black/10">
                  <AccordionTrigger className="uppercase tracking-widest text-xs font-medium py-6 hover:no-underline">
                    Envíos y Devoluciones
                  </AccordionTrigger>
                  <AccordionContent className="text-black/60 font-light leading-relaxed">
                    Envío gratuito en pedidos superiores a 300€. Devoluciones aceptadas dentro de los 14 días posteriores a la entrega.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>
        </div>

        {/* ── RELATED PRODUCTS ──────────────────────── */}
        <div className="mt-32 border-t border-black/10 pt-16">
          <h2 
            className="text-3xl font-normal mb-10 text-center md:text-left"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Completa el Look
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <div key={p.id}>
                 <Link to={`/producto/${p.id}`}>
                  <ShopProductCard product={p} />
                 </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── MOBILE STICKY BUTTON ───────────────────── */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-black/10 p-4 z-50 md:hidden pb-safe">
        <Button
          className="w-full h-12 rounded-none bg-[#117837] hover:bg-[#0e632d] text-white uppercase tracking-widest text-xs font-medium"
          disabled={!selectedSize}
          onClick={handleAddToCart}
        >
          {justAdded ? "✓ Añadido" : selectedSize ? "Añadir al Carrito" : "Selecciona Talla"}
        </Button>
      </div>

    </div>
  );
}