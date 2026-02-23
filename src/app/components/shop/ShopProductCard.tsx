import * as React from "react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";

gsap.registerPlugin(useGSAP);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface ShopProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  sizes: string[];
  color: string;
  colorHex: string;
  isNew?: boolean;
}

interface ShopProductCardProps {
  product: ShopProduct;
  featured?: boolean; // spans 2 cols — editorial layout
}

// ─────────────────────────────────────────────
// Card Component
// ─────────────────────────────────────────────
export function ShopProductCard({ product }: { product: ShopProduct }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered]   = useState(false);
  const [addedSize, setAddedSize]   = useState<string | null>(null);
  const [showSizes, setShowSizes]   = useState(false);

  const { addItem } = useCart();

  // Layer refs (GSAP targets)
  const imgRef        = useRef<HTMLImageElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const sizesRef      = useRef<HTMLDivElement>(null);

  // ── GSAP: image scale + overlay reveal ────
  useGSAP(() => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: isHovered ? 1.05 : 1,
        duration: 0.65,
        ease: "power2.out",
      });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: isHovered ? 1 : 0,
        y: isHovered ? 0 : 10,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, { scope: containerRef, dependencies: [isHovered] });

  // ── Quick add handler ──────────────────────
  const handleAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to global cart
    addItem(product as import("../../data/products").ExtendedProduct, size, 1);
    setAddedSize(size);
    setTimeout(() => {
      setAddedSize(null);
      setShowSizes(false);
    }, 1800);
  };

  // ── Sizes toggle ───────────────────────────
  useGSAP(() => {
    if (!sizesRef.current) return;
    gsap.to(sizesRef.current, {
      opacity: showSizes ? 1 : 0,
      y: showSizes ? 0 : 6,
      duration: 0.28,
      ease: "power2.out",
    });
  }, { scope: containerRef, dependencies: [showSizes] });

  return (
    <div
      ref={containerRef}
      className="flex flex-col group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShowSizes(false); }}
      data-cursor="view"
    >
      {/* Image layer — 3:4 aspect ratio */}
      <div
        className="relative overflow-hidden w-full bg-[#F5F5F5]"
        style={{ aspectRatio: "3/4" }}
      >
        {/* [NUEVO] badge */}
        {product.isNew && (
          <span
            className="absolute top-3 left-3 z-10 uppercase tracking-[0.22em] text-[#117837] bg-white/90 border border-[#117837] px-2 py-1"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.45rem",
              fontWeight: 500,
            }}
          >
            NUEVO
          </span>
        )}

        {/* Main image */}
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ transform: "scale(1)" }}
        />

        {/* Hover overlay — quick add */}
        <div
          ref={overlayRef}
          className="absolute bottom-0 left-0 right-0 hidden lg:block"
          style={{
            opacity: 0,
            background: "linear-gradient(to top, rgba(26,26,26,0.4) 0%, transparent 100%)",
            padding: "24px 16px 16px",
          }}
        >
          {!showSizes ? (
            <button
              onClick={(e) => { e.stopPropagation(); setShowSizes(true); }}
              className="w-full flex items-center justify-center gap-2 uppercase tracking-[0.22em] text-white bg-white/10 border border-white/50 backdrop-blur-sm transition-colors hover:bg-white/20"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 500,
                minHeight: 44,
              }}
            >
              <ShoppingBag size={12} strokeWidth={1} />
              Añadir
            </button>
          ) : (
            <div
              ref={sizesRef}
              className="flex items-center justify-center gap-2 flex-wrap"
            >
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={(e) => handleAdd(size, e)}
                  className="uppercase tracking-[0.16em] transition-all"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.56rem",
                    fontWeight: 400,
                    color: addedSize === size ? "#117837" : "#FFFFFF",
                    background: addedSize === size ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.15)",
                    border: addedSize === size
                      ? "0.5px solid #117837"
                      : "0.5px solid rgba(255,255,255,0.5)",
                    padding: "10px",
                    minHeight: 44,
                    minWidth: 44,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {addedSize === size ? <Check size={10} strokeWidth={2} /> : size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info layer */}
      <div className="pt-4 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3
            className="text-[#1A1A1A] leading-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            {product.name}
          </h3>
          <span
            className="text-[#1A1A1A]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            {product.price}
          </span>
        </div>
        
        <p
          className="uppercase tracking-[0.05em] text-black/40"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.7rem",
          }}
        >
          {product.color}
        </p>
      </div>
    </div>
  );
}