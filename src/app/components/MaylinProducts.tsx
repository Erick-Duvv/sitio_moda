import { useCallback, useRef, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: 1,
    name: "Vestido Onyx",
    category: "Vestidos",
    price: "€ 385",
    image:
      "https://images.unsplash.com/photo-1623609163915-d21853ad7d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5JTIwbWluaW1hbCUyMGJsYWNrJTIwYmFja2dyb3VuZCUyMGRyZXNzfGVufDF8fHx8MTc3MTcyMDk3OHww&ixlib=rb-4.1.0&q=80&w=800",
    tag: "Más vendido",
  },
  {
    id: 2,
    name: "Abrigo Nocturne",
    category: "Abrigos",
    price: "€ 490",
    image:
      "https://images.unsplash.com/photo-1759090889533-d04bac321eb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwd29tYW4lMjBjb2F0JTIwZWRpdG9yaWFsJTIwbWFnYXppbmV8ZW58MXx8fHwxNzcxNzIwOTc4fDA&ixlib=rb-4.1.0&q=80&w=800",
    tag: "Nuevo",
  },
  {
    id: 3,
    name: "Conjunto Blanc",
    category: "Conjuntos",
    price: "€ 320",
    image:
      "https://images.unsplash.com/photo-1587003484867-ba695bd4e4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd29tYW4lMjBtaW5pbWFsJTIwd2hpdGUlMjBiYWNrZ3JvdW5kJTIwZWxlZ2FudCUyMHN1aXR8ZW58MXx8fHwxNzcxNzIwOTc5fDA&ixlib=rb-4.1.0&q=80&w=800",
    tag: null,
  },
  {
    id: 4,
    name: "Gabardina Umbra",
    category: "Abrigos",
    price: "€ 520",
    image:
      "https://images.unsplash.com/photo-1735835842096-d256641e7b37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWRpdG9yaWFsJTIwdHJlbmNoJTIwY29hdCUyMHdvbWFuJTIwd2Fsa2luZyUyMHN0cmVldHxlbnwxfHx8fDE3NzE3MjA5OTl8MA&ixlib=rb-4.1.0&q=80&w=800",
    tag: "Exclusivo",
  },
  {
    id: 5,
    name: "Blusa Seda Ivoire",
    category: "Blusas",
    price: "€ 195",
    image:
      "https://images.unsplash.com/photo-1666358067414-c77508c771b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZmFzaGlvbiUyMHNpbGslMjBibG91c2UlMjB3aGl0ZSUyMHN0dWRpbyUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3MTcyMDk3N3ww&ixlib=rb-4.1.0&q=80&w=800",
    tag: "Nuevo",
  },
];

export function MaylinProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useGSAP(() => {
    const fadeElements = sectionRef.current?.querySelectorAll(".fade-up");
    if (fadeElements) {
        gsap.fromTo(
            fadeElements,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            }
        );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF8F5] py-24 md:py-32 overflow-hidden"
    >
      {/* Header row */}
      <div className="px-8 md:px-14 flex items-end justify-between mb-12 fade-up">
        <div>
          <p
            className="text-black/35 uppercase mb-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 400,
              letterSpacing: "0.3em",
            }}
          >
            03 — Novedades
          </p>
          <h2
            className="text-[#0a0a0a]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Recién <span className="italic" style={{ fontWeight: 400 }}>llegados</span>
          </h2>
        </div>

        {/* Arrow controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="w-11 h-11 flex items-center justify-center border border-black/20 hover:border-black/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 group"
            aria-label="Anterior"
            data-cursor="view"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.25}
              className="group-hover:-translate-x-0.5 transition-transform duration-300"
            />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="w-11 h-11 flex items-center justify-center border border-black/20 hover:border-black/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 group"
            aria-label="Siguiente"
            data-cursor="view"
          >
            <ArrowRight
              size={15}
              strokeWidth={1.25}
              className="group-hover:translate-x-0.5 transition-transform duration-300"
            />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden pl-8 md:pl-14 fade-up" ref={emblaRef}>
        <div className="flex gap-5 md:gap-7">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              className="flex-shrink-0 cursor-pointer group"
              style={{ width: "clamp(220px, 28vw, 360px)" }}
              data-cursor="view"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-[#EFEFEC]" style={{ aspectRatio: "3/4" }}>
                {product.tag && (
                  <div
                    className="absolute top-4 left-4 z-10 bg-[#0a0a0a] text-white px-3 py-1"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.55rem",
                      fontWeight: 400,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {product.tag}
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Quick add overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a] text-white py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-[400ms]">
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 400,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    + Añadir al carrito
                  </span>
                </div>
              </div>

              {/* Product info */}
              <div className="pt-4">
                <p
                  className="text-black/40 mb-1"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 400,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {product.category}
                </p>
                <div className="flex items-baseline justify-between">
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
                  <span
                    className="text-[#0a0a0a]/70"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 300,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile arrows */}
      <div className="md:hidden flex items-center justify-center gap-5 mt-10 fade-up">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="w-11 h-11 flex items-center justify-center border border-black/20 hover:border-black/70 disabled:opacity-20 transition-all duration-300"
          aria-label="Anterior"
        >
          <ArrowLeft size={15} strokeWidth={1.25} />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="w-11 h-11 flex items-center justify-center border border-black/20 hover:border-black/70 disabled:opacity-20 transition-all duration-300"
          aria-label="Siguiente"
        >
          <ArrowRight size={15} strokeWidth={1.25} />
        </button>
      </div>

      {/* View all link */}
      <div className="px-8 md:px-14 mt-14 fade-up">
        <a
          href="#"
          className="inline-flex items-center gap-3 text-[#0a0a0a] border-b border-black/25 hover:border-black pb-0.5 transition-all duration-300 group"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.68rem",
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Ver todos los productos
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
