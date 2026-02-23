import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  hoverImage: string;
  tag?: string | null;
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductCard({ product, className = "", style }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sizesRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);

  const sizes = product.sizes ?? ["XS", "S", "M", "L", "XL"];

  // Set initial GSAP states
  useGSAP(() => {
    if (sizesRef.current) {
      gsap.set(sizesRef.current, { opacity: 0, y: 6 });
    }
    if (img2Ref.current) {
      gsap.set(img2Ref.current, { opacity: 0 });
    }
  }, []);

  useGSAP(() => {
    if (!sizesRef.current) return;
    if (isHovered) {
      gsap.to(sizesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(img1Ref.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
      gsap.to(img2Ref.current, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
    } else {
      gsap.to(sizesRef.current, {
        opacity: 0,
        y: 6,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(img1Ref.current, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
      gsap.to(img2Ref.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
    }
  }, [isHovered]);

  const handleAddSize = (size: string) => {
    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 2000);
  };

  return (
    <div
      ref={cardRef}
      className={`group ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "#EEECEA", aspectRatio: "3/4" }}
        data-cursor="view"
      >
        {/* Tag */}
        {product.tag && (
          <span
            className="absolute top-4 left-4 z-10"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#0a0a0a",
            }}
          >
            [{product.tag}]
          </span>
        )}

        {/* Main image */}
        <img
          ref={img1Ref}
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ opacity: 1 }}
        />

        {/* Hover image */}
        <img
          ref={img2Ref}
          src={product.hoverImage}
          alt={`${product.name} - detalle`}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Product info */}
      <div className="pt-4">
        {/* Category */}
        <p
          className="text-[#0a0a0a]/35 mb-1.5"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.58rem",
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {product.category}
        </p>

        {/* Name + tag inline */}
        <div className="flex items-baseline gap-2 mb-1">
          <h3
            className="text-[#0a0a0a]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.05rem",
              fontWeight: 500,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {product.name}
          </h3>
          {product.tag === "NUEVO" && (
            <span
              className="text-[#0a0a0a]/50"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.5rem",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              [NUEVO]
            </span>
          )}
        </div>

        {/* Price */}
        <p
          className="text-[#0a0a0a]/65"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 300,
            letterSpacing: "0.06em",
            margin: 0,
          }}
        >
          {product.price}
        </p>

        {/* Quick Add sizes – appear on hover */}
        <div
          ref={sizesRef}
          className="flex items-center gap-3 mt-3"
        >
          <div
            className="w-full"
            style={{
              borderTop: "1px solid rgba(10,10,10,0.12)",
              paddingTop: "10px",
            }}
          >
            <div className="flex items-center gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleAddSize(size)}
                  className="relative"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 400,
                    letterSpacing: "0.18em",
                    color: addedSize === size ? "#0a0a0a" : "rgba(10,10,10,0.5)",
                    textTransform: "uppercase",
                    background: "none",
                    border: "none",
                    padding: 0,
                    transition: "color 0.2s ease",
                  }}
                >
                  {addedSize === size ? "Añadido" : size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}