import * as React from "react";
import { useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShoppingBag, Check, Heart, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import useEmblaCarousel from "embla-carousel-react";
import { MobileQuickAddDrawer } from "./MobileQuickAddDrawer";

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
  images?: string[];
  sizes: string[];
  color: string;
  colorHex: string;
  isNew?: boolean;
}

interface ShopProductCardProps {
  product: ShopProduct;
  featured?: boolean; // spans 2 cols — editorial layout
  compact?: boolean; // small grid mode (6 columns)
  gridMode?: "large" | "medium" | "small";
}

// ─────────────────────────────────────────────
// Card Component
// ─────────────────────────────────────────────
export const ShopProductCard = React.memo(function ShopProductCard({ product, compact, gridMode }: ShopProductCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered]   = useState(false);
  const [addedSize, setAddedSize]   = useState<string | null>(null);
  const [showSizes, setShowSizes]   = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Embla Carousel for Mobile Devices
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const [selectedColor, setSelectedColor] = useState(product.colorHex || "#1A1A1A");
  const mockColors = useMemo(() => {
    const base = product.colorHex || "#1A1A1A";
    const alt1 = base === "#1A1A1A" ? "#F5EFE1" : "#1A1A1A";
    const alt2 = "#8C8C8C";
    return [base, alt1, alt2];
  }, [product.colorHex]);

  const { addItem } = useCart();

  // Layer refs (GSAP targets)
  const overlayRef    = useRef<HTMLDivElement>(null);
  const sizesRef      = useRef<HTMLDivElement>(null);

  // ── GSAP: overlay reveal ────
  useGSAP(() => {
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
    e.preventDefault();
    // Add to global cart
    addItem(product as import("../../data/products").ExtendedProduct, size, 1);
    setAddedSize(size);
    setTimeout(() => {
      setAddedSize(null);
      setShowSizes(false);
    }, 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setInWishlist(!inWishlist);
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
      className="flex flex-col group relative w-full h-full cursor-pointer bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShowSizes(false); }}
      data-cursor="view"
    >
      {/* Image layer — 3:4 aspect ratio */}
      <div
        className={`relative overflow-hidden w-full bg-[#F5F5F5] ${compact ? 'mb-0' : 'mb-2 lg:mb-3'}`}
        style={{ aspectRatio: "3/4" }}
      >
        {/* MOBILE: Embla Carousel */}
        <div className="lg:hidden w-full h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {productImages.map((src, i) => (
              <div key={i} className="flex-[0_0_100%] h-full relative">
                <img src={src} alt={`${product.name} ${i}`} className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </div>
          {/* Dots Indicator */}
          {productImages.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
              {productImages.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === selectedIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP: Hover Effect */}
        <div className="hidden lg:block w-full h-full relative">
          <img 
            src={productImages[0]} 
            alt={product.name} 
            className={`absolute inset-0 w-full h-full object-cover object-top ${productImages.length > 1 ? 'transition-opacity duration-500 group-hover:opacity-0' : ''}`} 
          />
          {productImages.length > 1 && (
            <img 
              src={productImages[1]} 
              alt={`${product.name} alt`} 
              className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
            />
          )}
        </div>

        {/* [NUEVO] badge */}
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-[#0c7133] text-white px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase shadow-md z-10">
            NUEVO
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 p-1"
        >
          <Heart
            strokeWidth={1}
            className={`w-5 h-5 transition-colors ${
              inWishlist
                ? 'fill-[#DE2626] text-[#DE2626]'
                : 'text-gray-900 hover:fill-[#DE2626]'
            }`}
          />
        </button>

        {/* Hover overlay — quick add (Hidden in compact mode) */}
        {!compact && (
          <div
            ref={overlayRef}
            className="absolute bottom-0 left-0 right-0 hidden lg:block z-20"
            style={{
              opacity: 0,
              background: "linear-gradient(to top, rgba(26,26,26,0.3) 0%, transparent 100%)",
              padding: "24px 16px 16px",
            }}
          >
            {!showSizes ? (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowSizes(true); }}
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
        )}
      </div>

      {/* Info layer */}
      {!compact && (
        <div className="space-y-0.5 text-left mt-1 ml-1 pr-1 pb-1">
          <h3
            className="group-hover:text-[#0c7133] transition-colors tracking-[0.05em]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: 'capitalize',
              fontSize: 'clamp(12px, 2vw, 14px)',
              fontWeight: 400,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-0.5">
            <p
              className="text-black font-medium"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(13px, 1.5vw, 14px)',
              }}
            >
              {product.price}
            </p>
            {gridMode !== "large" && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMobileDrawerOpen(true); }}
                className="lg:hidden w-[22px] h-[22px] border border-black/20 flex items-center justify-center text-black/60 hover:text-black transition-colors"
                aria-label="Añadir al carrito"
              >
                <Plus size={12} strokeWidth={1} />
              </button>
            )}
          </div>
          
          <div className="flex gap-2 mt-2 pt-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            {mockColors.map((c, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedColor(c); }}
                className={`w-[13px] h-[13px] rounded-full border transition-all ${selectedColor === c ? "border-black scale-[1.15]" : "border-black/15"}`}
                style={{
                  backgroundColor: c,
                  boxShadow: selectedColor === c ? "0 0 0 1.5px white inset" : "none"
                }}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE 1-COLUMN BIG BUTTON */}
      {gridMode === "large" && (
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMobileDrawerOpen(true); }}
          className="lg:hidden w-full mt-3 py-3.5 bg-black text-white uppercase flex items-center justify-center transition-colors active:bg-black/80"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", fontWeight: 500 }}
        >
          Añadir
        </button>
      )}

      <MobileQuickAddDrawer
        product={product}
        isOpen={isMobileDrawerOpen}
        onOpenChange={setIsMobileDrawerOpen}
        mockColors={mockColors}
      />
    </div>
  );
});