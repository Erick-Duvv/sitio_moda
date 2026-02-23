import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard, type Product } from "../components/collection/ProductCard";
import { MaylinFooter } from "../components/MaylinFooter";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// Filter Data
// ─────────────────────────────────────────────
const FILTER_CATEGORIES = [
  { label: "Talla",    options: ["XS", "S", "M", "L", "XL"] },
  { label: "Color",    options: ["Crema", "Negro", "Arena", "Topo", "Ivory"] },
  { label: "Silueta",  options: ["Recto", "Fluido", "Estructurado", "Oversized"] },
  { label: "Precio",   options: ["— 200€", "200 – 400€", "400€ +"] },
  { label: "Categoría",options: ["Vestidos", "Abrigos", "Pantalones", "Blusas", "Conjuntos"] },
];

// ─────────────────────────────────────────────
// Product Data
// ─────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vestido Onyx",
    category: "Vestidos",
    price: "€ 385",
    tag: "NUEVO",
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1739616194269-46f6247e65fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1764065340249-ee8bec50d2f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 2,
    name: "Abrigo Nocturne",
    category: "Abrigos",
    price: "€ 490",
    tag: "NUEVO",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1704915066475-79cd1c8f4b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1742540425862-9bb91cec3871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 3,
    name: "Conjunto Blanc",
    category: "Conjuntos",
    price: "€ 320",
    tag: null,
    sizes: ["XS", "S", "M"],
    image: "https://images.unsplash.com/photo-1759229874810-26aa9a3dda92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1770294758942-7ce9ca052986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 4,
    name: "Pantalón Ivoire",
    category: "Pantalones",
    price: "€ 195",
    tag: "NUEVO",
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1654512697746-0c7f20924c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1738247999474-c3ea1d7d699e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 5,
    name: "Gabardina Umbra",
    category: "Abrigos",
    price: "€ 520",
    tag: null,
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1621341104121-d610c0dc4228?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1742540425862-9bb91cec3871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 6,
    name: "Vestido Arquitectura",
    category: "Vestidos",
    price: "€ 445",
    tag: "NUEVO",
    sizes: ["XS", "S", "M"],
    image: "https://images.unsplash.com/photo-1759090889296-1b82083f981d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1769103638533-eb73b58b610b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 7,
    name: "Blusa Seda Minuit",
    category: "Blusas",
    price: "€ 215",
    tag: null,
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1744135995007-f1dde493d241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1770294758942-7ce9ca052986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 8,
    name: "Vestido Noir",
    category: "Vestidos",
    price: "€ 475",
    tag: "NUEVO",
    sizes: ["XS", "S", "M"],
    image: "https://images.unsplash.com/photo-1758387813664-5cd1211304f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1764065340249-ee8bec50d2f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 9,
    name: "Palazzo Mineral",
    category: "Pantalones",
    price: "€ 250",
    tag: null,
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1661099508870-5f959f1e151a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1768609956986-7c1776f70454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 10,
    name: "Capa Siena",
    category: "Abrigos",
    price: "€ 610",
    tag: "NUEVO",
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1755483503929-a2eb08de1c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1712307339325-82c8edf6d412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 11,
    name: "Camisa Atelier",
    category: "Blusas",
    price: "€ 175",
    tag: null,
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1655203091785-9b07e64e4459?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1711113456820-639918258722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 12,
    name: "Traje Cendre",
    category: "Conjuntos",
    price: "€ 695",
    tag: "NUEVO",
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1712307339325-82c8edf6d412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1738247999474-c3ea1d7d699e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

// ─────────────────────────────────────────────
// Collection Page
// ─────────────────────────────────────────────
export function CollectionPage() {
  const pageRef       = useRef<HTMLDivElement>(null);
  const heroTitleRef  = useRef<HTMLHeadingElement>(null);
  const heroDescRef   = useRef<HTMLDivElement>(null);
  const filterBarRef  = useRef<HTMLDivElement>(null);
  const filterPanelRef= useRef<HTMLDivElement>(null);
  const gridRef       = useRef<HTMLDivElement>(null);
  const pauseRef      = useRef<HTMLDivElement>(null);
  const typoRef       = useRef<HTMLDivElement>(null);

  const [activeOptions, setActiveOptions] = useState<Record<string, string[]>>({});
  const [filterOpen, setFilterOpen]       = useState(false);

  const toggleOption = (category: string, option: string) => {
    setActiveOptions(prev => {
      const current = prev[category] ?? [];
      return {
        ...prev,
        [category]: current.includes(option)
          ? current.filter(o => o !== option)
          : [...current, option],
      };
    });
  };

  const clearFilters = () => setActiveOptions({});
  const totalActive = Object.values(activeOptions).flat().length;

  // ── GSAP entrance + scroll animations ────────
  useGSAP(
    () => {
      // Init filter panel closed
      if (filterPanelRef.current) {
        gsap.set(filterPanelRef.current, { height: 0, overflow: "hidden" });
      }

      // Hero title char reveal
      if (heroTitleRef.current) {
        const chars = heroTitleRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.03, ease: "power4.out", delay: 0.2 }
        );
      }

      // Hero desc fade
      if (heroDescRef.current) {
        gsap.fromTo(
          heroDescRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.7 }
        );
      }

      // Filter bar fade
      if (filterBarRef.current) {
        gsap.fromTo(
          filterBarRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.95 }
        );
      }

      // Grid items — scroll-triggered stagger
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".grid-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
          }
        );
      }

      // Pause module parallax
      if (pauseRef.current) {
        const img = pauseRef.current.querySelector(".pause-img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: pauseRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      }

      // Typography pause block reveal
      if (typoRef.current) {
        gsap.fromTo(
          typoRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: typoRef.current, start: "top 78%" },
          }
        );
      }
    },
    { scope: pageRef }
  );

  // ── Filter panel open/close (GSAP) ───────────
  useGSAP(
    () => {
      if (!filterPanelRef.current) return;
      gsap.to(filterPanelRef.current, {
        height: filterOpen ? "auto" : 0,
        duration: filterOpen ? 0.48 : 0.32,
        ease: filterOpen ? "power3.out" : "power3.in",
        overwrite: true,
      });
    },
    { dependencies: [filterOpen] }
  );

  // Split title into chars for mask reveal
  const titleLines = "Colección\nSS 2025".split("\n");

  return (
    <div ref={pageRef} style={{ backgroundColor: "#FAF8F5" }}>

      {/* ── HERO TRANSITION HEADER ──────────────── */}
      <section
        style={{ paddingTop: "calc(72px + 4rem)", paddingBottom: "3rem" }}
        className="px-6 sm:px-8 md:px-14"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-16">

          {/* Title block */}
          <div className="md:w-[60%]">
            <p
              className="mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 400,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.38)",
              }}
            >
              01 — Temporada
            </p>
            <h1
              ref={heroTitleRef}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3rem, 9vw, 9rem)",
                fontWeight: 700,
                lineHeight: 0.93,
                letterSpacing: "-0.025em",
                color: "#0a0a0a",
                margin: 0,
                overflow: "hidden",
                hyphens: "none",
              }}
            >
              {titleLines.map((line, li) => (
                <span
                  key={li}
                  style={{ display: "block", overflow: "hidden" }}
                >
                  {line.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="char"
                      style={{
                        display: "inline-block",
                        whiteSpace: char === " " ? "pre" : undefined,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          {/* Description */}
          <div
            ref={heroDescRef}
            className="md:flex flex-col justify-end self-end pb-2"
            style={{ opacity: 0 }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(10,10,10,0.55)",
                maxWidth: "260px",
              }}
            >
              Una exploración de volumen y precisión.
              <br />
              Siluetas estructuradas que dialogan con
              <br />
              la arquitectura del cuerpo en movimiento.
            </p>
            <div
              className="mt-5"
              style={{ width: "32px", height: "1px", backgroundColor: "rgba(10,10,10,0.25)" }}
            />
          </div>
        </div>
      </section>

      {/* ── FILTER UTILITY BAR ──────────────────── */}
      <div
        ref={filterBarRef}
        className="px-6 sm:px-8 md:px-14"
        style={{ opacity: 0 }}
      >
        {/* Top rule */}
        <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(10,10,10,0.12)", marginBottom: "18px" }} />

        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left: filter controls */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* Filtrar toggle */}
            <button
              onClick={() => setFilterOpen(v => !v)}
              className="flex items-center gap-1.5 group"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 400,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: filterOpen ? "#0a0a0a" : "rgba(10,10,10,0.45)",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "color 0.2s ease",
              }}
            >
              <SlidersHorizontal
                size={11}
                strokeWidth={1.5}
                style={{
                  transform: filterOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
              Filtrar
              {totalActive > 0 && (
                <span style={{ color: "#0a0a0a", marginLeft: "2px" }}>({totalActive})</span>
              )}
            </button>

            <span
              style={{ width: "1px", height: "14px", backgroundColor: "rgba(10,10,10,0.15)", display: "inline-block" }}
            />

            {/* Category quick-select */}
            {FILTER_CATEGORIES.map(cat => {
              const count = (activeOptions[cat.label] ?? []).length;
              const isActive = count > 0;
              return (
                <button
                  key={cat.label}
                  onClick={() => setFilterOpen(true)}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: isActive ? "#0a0a0a" : "rgba(10,10,10,0.45)",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textDecoration: isActive ? "underline" : "none",
                    textUnderlineOffset: "4px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {cat.label}
                  {isActive && (
                    <span style={{ marginLeft: "3px", opacity: 0.6 }}>({count})</span>
                  )}
                </button>
              );
            })}

            {/* Clear */}
            {totalActive > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(10,10,10,0.4)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(10,10,10,0.2)",
                  paddingBottom: "1px",
                }}
              >
                <X size={8} strokeWidth={2} />
                Limpiar
              </button>
            )}
          </div>

          {/* Product count */}
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              color: "rgba(10,10,10,0.4)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            42 Piezas
          </p>
        </div>

        {/* Bottom rule */}
        <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(10,10,10,0.08)", marginTop: "18px" }} />
      </div>

      {/* ── FILTER PANEL (animated) ─────────────── */}
      <div ref={filterPanelRef} style={{ overflow: "hidden" }}>
        <div
          className="px-6 sm:px-8 md:px-14 py-8"
          style={{ borderBottom: "1px solid rgba(10,10,10,0.08)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {FILTER_CATEGORIES.map(cat => (
              <div key={cat.label}>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.52rem",
                    fontWeight: 500,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(10,10,10,0.35)",
                  }}
                >
                  {cat.label}
                </p>
                <div className="flex flex-col gap-2.5">
                  {cat.options.map(option => {
                    const isSelected = (activeOptions[cat.label] ?? []).includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => toggleOption(cat.label, option)}
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: isSelected ? 500 : 300,
                          letterSpacing: "0.1em",
                          color: isSelected ? "#0a0a0a" : "rgba(10,10,10,0.55)",
                          background: "none",
                          border: "none",
                          padding: 0,
                          textAlign: "left",
                          cursor: "pointer",
                          textDecoration: isSelected ? "underline" : "none",
                          textUnderlineOffset: "4px",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Apply row */}
          <div className="mt-8 flex items-center justify-between">
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.3)",
              }}
            >
              {totalActive} {totalActive === 1 ? "filtro activo" : "filtros activos"}
            </p>
            <button
              onClick={() => setFilterOpen(false)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                background: "none",
                border: "1px solid rgba(10,10,10,0.25)",
                padding: "8px 20px",
                cursor: "pointer",
                transition: "border-color 0.2s ease",
              }}
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>

      {/* ── BROKEN GRID ─────────────────────────── */}
      <div
        ref={gridRef}
        className="px-6 sm:px-8 md:px-14"
        style={{ paddingTop: "48px" }}
      >

        {/* ── ROW 1 — Asymmetric 65 / 35 ── */}
        <div
          className="grid-item flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-6"
          style={{ alignItems: "flex-end" }}
        >
          {/* Large — 65% */}
          <div className="w-full md:w-[65%]">
            <ProductCard product={PRODUCTS[0]} style={{ width: "100%" }} />
          </div>

          {/* Small — 35%, offset up */}
          <div className="w-full md:w-[35%] md:pb-10">
            <p
              className="mb-7 hidden md:block"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.52rem",
                fontWeight: 400,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.22)",
              }}
            >
              002 — Abrigos
            </p>
            <ProductCard product={PRODUCTS[1]} style={{ width: "100%" }} />
          </div>
        </div>

        {/* ── ROW 2 — Three Equal ── */}
        <div className="grid-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          {PRODUCTS.slice(2, 5).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* ── PAUSE MODULE 1 — Lifestyle + Quote ── */}
        <div
          ref={pauseRef}
          className="grid-item relative overflow-hidden mb-4 md:mb-6"
          style={{ height: "clamp(280px, 52vw, 680px)" }}
        >
          <img
            className="pause-img absolute inset-0 w-full h-full object-cover object-center scale-110"
            src="https://images.unsplash.com/photo-1769103638533-eb73b58b610b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
            alt="Editorial lifestyle"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(10,10,10,0.56) 0%, rgba(10,10,10,0.10) 55%, rgba(10,10,10,0) 100%)",
            }}
          />

          {/* Quote */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <blockquote>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 3.5vw, 3.2rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.22,
                  color: "#FAF8F5",
                  maxWidth: "600px",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                "El lujo no es la riqueza.
                <br />
                Es la ausencia de lo superfluo."
              </p>
              <footer
                className="mt-4"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 400,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(250,248,245,0.50)",
                }}
              >
                — Maylin SS 2025
              </footer>
            </blockquote>
          </div>
        </div>

        {/* ── ROW 3 — Reversed 35 / 65 ── */}
        <div
          className="grid-item flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-6"
          style={{ alignItems: "flex-start" }}
        >
          {/* Small — 35%, offset down */}
          <div className="w-full md:w-[35%] md:pt-14">
            <p
              className="mb-7 hidden md:block"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.52rem",
                fontWeight: 400,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.22)",
              }}
            >
              006 — Vestidos
            </p>
            <ProductCard product={PRODUCTS[5]} style={{ width: "100%" }} />
          </div>

          {/* Large — 65% */}
          <div className="w-full md:w-[65%]">
            <ProductCard product={PRODUCTS[6]} style={{ width: "100%" }} />
          </div>
        </div>

        {/* ── ROW 4 — Three Equal ── */}
        <div className="grid-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          {PRODUCTS.slice(7, 10).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* ── PAUSE MODULE 2 — Pure Typography ── */}
        <div
          ref={typoRef}
          className="grid-item relative mb-4 md:mb-6 py-16 md:py-24 px-0"
          style={{
            borderTop: "1px solid rgba(10,10,10,0.08)",
            borderBottom: "1px solid rgba(10,10,10,0.08)",
          }}
        >
          {/* Off-center label */}
          <p
            className="absolute top-8 right-0 hidden md:block"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.52rem",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(10,10,10,0.2)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Maylin — SS 2025
          </p>

          <div style={{ maxWidth: "72%", marginLeft: "auto" }}>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.1,
                color: "rgba(10,10,10,0.12)",
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Cada pieza,
              <br />
              un acto de intención.
            </p>
          </div>

          <div
            className="mt-8 md:mt-12 flex items-center gap-8"
            style={{ marginLeft: "auto", maxWidth: "72%" }}
          >
            <div
              style={{ width: "48px", height: "1px", backgroundColor: "rgba(10,10,10,0.2)" }}
            />
            <a
              href="#"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 400,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.55)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(10,10,10,0.25)",
                paddingBottom: "2px",
              }}
            >
              Ver la editorial completa
            </a>
          </div>
        </div>

        {/* ── ROW 5 — Two Products + Editorial Text ── */}
        <div className="grid-item grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24">
          {PRODUCTS.slice(10, 12).map((p, i) => (
            <div
              key={p.id}
              style={{ marginTop: i === 1 ? "clamp(40px, 5vw, 80px)" : "0" }}
            >
              <ProductCard product={p} />
            </div>
          ))}

          {/* Editorial text block — third column */}
          <div
            className="hidden md:flex flex-col justify-center"
            style={{ paddingLeft: "2rem", paddingTop: "2rem" }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.52rem",
                fontWeight: 400,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.28)",
                marginBottom: "20px",
              }}
            >
              12 de 42 Piezas
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1rem, 1.4vw, 1.3rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.65,
                color: "rgba(10,10,10,0.38)",
              }}
            >
              La forma como
              <br />
              argumento estético.
            </p>
            <button
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                background: "none",
                border: "none",
                padding: 0,
                marginTop: "28px",
                cursor: "pointer",
                textAlign: "left",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textDecorationColor: "rgba(10,10,10,0.3)",
              }}
            >
              Cargar más →
            </button>
          </div>
        </div>

        {/* Mobile "load more" */}
        <div className="md:hidden flex justify-center mb-16">
          <button
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#0a0a0a",
              background: "none",
              border: "1px solid rgba(10,10,10,0.25)",
              padding: "12px 32px",
              cursor: "pointer",
            }}
          >
            Cargar más
          </button>
        </div>

      </div>

      {/* ── FOOTER ────────────────────────────────── */}
      <MaylinFooter />
    </div>
  );
}