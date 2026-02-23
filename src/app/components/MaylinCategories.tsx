import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const DRESS_IMG =
  "https://images.unsplash.com/photo-1756483510864-5bc7bdc3cf22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYXV0ZSUyMGNvdXR1cmUlMjBkcmVzcyUyMGVsZWdhbnQlMjB3b21hbnxlbnwxfHx8fDE3NzE3MjA5NzN8MA&ixlib=rb-4.1.0&q=80&w=800";

const BLOUSE_IMG =
  "https://images.unsplash.com/photo-1666358067414-c77508c771b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZmFzaGlvbiUyMHNpbGslMjBibG91c2UlMjB3aGl0ZSUyMHN0dWRpbyUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3MTcyMDk3N3ww&ixlib=rb-4.1.0&q=80&w=800";

const ACC_IMG =
  "https://images.unsplash.com/photo-1685527012908-394504c2a230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhY2Nlc3NvcmllcyUyMGhhbmRiYWclMjBmYXNoaW9uJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzE3MjA5NzR8MA&ixlib=rb-4.1.0&q=80&w=800";

interface CategoryItemProps {
  image: string;
  name: string;
  count: string;
  href?: string;
}

function CategoryHoverCard({ image, name, count }: CategoryItemProps) {
  return (
    <div className="group relative overflow-hidden cursor-pointer h-full w-full" data-cursor="view">
      <div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10"
      />
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      {/* Hover overlay text */}
      <div className="absolute inset-0 z-20 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span
          className="text-white flex items-center gap-2"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Explorar <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}

export function MaylinCategories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Reveal Animations
    const fadeElements = containerRef.current?.querySelectorAll(".fade-up");
    if (fadeElements) {
        gsap.fromTo(
            fadeElements,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );
    }

    // Parallax Animations (Desktop only mostly visible)
    // Image 1 (Main) - Moves faster (up)
    if (parallaxRefs.current[0]) {
        gsap.to(parallaxRefs.current[0], {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
    }

    // Image 2 (Secondary) - Moves slower
    if (parallaxRefs.current[1]) {
        gsap.to(parallaxRefs.current[1], {
            y: -40,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
    }

    // Image 3 (Small) - Moves barely
    if (parallaxRefs.current[2]) {
        gsap.to(parallaxRefs.current[2], {
            y: -20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
    }

  }, { scope: containerRef });

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !parallaxRefs.current.includes(el)) {
      parallaxRefs.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAF8F5] py-24 md:py-32 overflow-hidden"
    >
      {/* Section header */}
      <div className="px-8 md:px-14 mb-16 fade-up">
        <p
          className="text-black/35 uppercase mb-3"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 400,
            letterSpacing: "0.3em",
          }}
        >
          01 — Explorar
        </p>
        <h2
          className="text-[#0a0a0a]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 5.5vw, 6rem)",
            fontWeight: 700,
            lineHeight: 0.95,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Las <span className="italic" style={{ fontWeight: 400 }}>Categorías</span>
        </h2>
      </div>

      {/* Broken grid collage */}
      <div className="relative px-8 md:px-14">
        {/* Desktop broken grid */}
        <div className="hidden md:block relative" style={{ height: "680px" }}>
          {/* Image 1: Tall dress — far left */}
          <div
            ref={addToRefs}
            className="absolute fade-up"
            style={{ left: "0%", top: "0", width: "33%", height: "88%" }}
          >
            <CategoryHoverCard image={DRESS_IMG} name="Vestidos" count="28" />
            {/* Label above */}
            <div className="absolute -top-8 left-0">
              <p
                className="text-[#0a0a0a]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                Vestidos
              </p>
              <p
                className="text-black/40"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                28 piezas
              </p>
            </div>
          </div>

          {/* Image 2: Blouse — center, offset lower */}
          <div
            ref={addToRefs}
            className="absolute fade-up"
            style={{ left: "30%", top: "10%", width: "36%", height: "72%" }}
          >
            <CategoryHoverCard image={BLOUSE_IMG} name="Blusas" count="19" />
            {/* Label below */}
            <div className="absolute -bottom-8 right-0 text-right">
              <p
                className="text-[#0a0a0a]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                Blusas
              </p>
              <p
                className="text-black/40"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                19 piezas
              </p>
            </div>
          </div>

          {/* Image 3: Accessories — right, lower, small */}
          <div
            ref={addToRefs}
            className="absolute fade-up"
            style={{ right: "0%", top: "28%", width: "26%", height: "60%" }}
          >
            <CategoryHoverCard image={ACC_IMG} name="Accesorios" count="14" />
            {/* Label right side */}
            <div className="absolute -top-8 left-0">
              <p
                className="text-[#0a0a0a]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                Accesorios
              </p>
              <p
                className="text-black/40"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                14 piezas
              </p>
            </div>
          </div>

          {/* Decorative element: large number */}
          <span
            className="absolute text-black/[0.04] select-none pointer-events-none fade-up"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22vw",
              fontWeight: 900,
              bottom: "-4%",
              left: "50%",
              transform: "translateX(-50%)",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            2025
          </span>
        </div>

        {/* Mobile stacked layout */}
        <div className="md:hidden flex flex-col gap-6 fade-up">
          {[
            { img: DRESS_IMG, name: "Vestidos", count: "28 piezas", h: "420px" },
            { img: BLOUSE_IMG, name: "Blusas", count: "19 piezas", h: "340px" },
            { img: ACC_IMG, name: "Accesorios", count: "14 piezas", h: "280px" },
          ].map((cat) => (
            <div key={cat.name}>
              <p
                className="text-[#0a0a0a] mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                {cat.name}
              </p>
              <div style={{ height: cat.h }} className="overflow-hidden">
                <CategoryHoverCard image={cat.img} name={cat.name} count={cat.count} />
              </div>
              <p
                className="text-black/40 mt-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                {cat.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
