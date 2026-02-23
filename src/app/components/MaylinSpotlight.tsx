import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SPOTLIGHT_IMAGE =
  "https://images.unsplash.com/photo-1760264549905-6b7016bc5980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbGlmZXN0eWxlJTIwZWxlZ2FudCUyMHdvbWFuJTIwb3V0ZG9vciUyMHVyYmFufGVufDF8fHx8MTc3MTcyMDk3NXww&ixlib=rb-4.1.0&q=80&w=1400";

export function MaylinSpotlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Responsive Parallax Effect for the image
    mm.add({
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)"
    }, (context) => {
      const { isMobile } = context.conditions as any;

      if (imageRef.current) {
        gsap.to(imageRef.current, {
            yPercent: isMobile ? 3 : 6,
            ease: "none",
            force3D: true,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: isMobile ? 0.3 : 1.5, // Even faster for tactile feel
            }
        });
      }
    });

    // Text Reveal Animations
    const fadeElements = textContentRef.current?.querySelectorAll(".fade-up");
    if (fadeElements) {
        gsap.fromTo(
            fadeElements,
            { y: 35, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: textContentRef.current,
                    start: "top 75%",
                }
            }
        );
    }

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[58%_1fr] min-h-screen">
        {/* Left — large image */}
        <div className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
          <div 
            ref={imageRef}
            className="absolute inset-0 gpu-accelerated" 
            style={{ height: "112%", top: "-6%", transform: "translateY(-6%)" }}
          >
            <img
              src={SPOTLIGHT_IMAGE}
              alt="Maylin Editorial"
              className="w-full h-full object-cover-optimized gpu-accelerated"
            />
          </div>
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent 70%, rgba(10,10,10,0.6) 100%)",
            }}
          />
          {/* Image caption */}
          <div className="absolute bottom-8 left-8">
            <p
              className="text-white/30"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Look 04 — Primavera/Verano 2025
            </p>
          </div>
        </div>

        {/* Right — narrative text */}
        <div
          ref={textContentRef}
          className="flex flex-col justify-center px-10 md:px-14 py-20 md:py-0"
        >
          {/* Label */}
          <p
            className="text-white/30 uppercase mb-8 fade-up"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 400,
              letterSpacing: "0.3em",
            }}
          >
            02 — La Historia
          </p>

          {/* Headline */}
          <div className="fade-up">
            <h2
              className="text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 3.8vw, 4.5rem)",
                fontWeight: 700,
                lineHeight: 1.0,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Entre el
            </h2>
            <h2
              className="text-white/75 italic"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 3.8vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              silencio
            </h2>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 3.8vw, 4.5rem)",
                fontWeight: 700,
                lineHeight: 1.0,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              y el impacto.
            </h2>
          </div>

          {/* Separator */}
          <div
            className="w-12 h-px bg-white/25 my-8 fade-up"
          />

          {/* Body text */}
          <p
            className="text-white/50 max-w-xs fade-up"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 300,
              lineHeight: 1.75,
              letterSpacing: "0.01em",
            }}
          >
            La nueva colección de Maylin nace de la tensión entre la quietud y
            el movimiento. Cada pieza es una declaración arquitectónica: construida
            para durar, concebida para transformar. No es ropa. Es lenguaje.
          </p>

          {/* Stats row */}
          <div
            className="flex gap-10 mt-10 fade-up"
          >
            {[
              { num: "47", label: "Piezas únicas" },
              { num: "08", label: "Materiales" },
              { num: "03", label: "Drops" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-white"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </p>
                <p
                  className="text-white/30 mt-1"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#"
            className="inline-flex items-center gap-3 mt-14 text-white border border-white/20 hover:border-white/70 px-7 py-4 group transition-all duration-300 self-start fade-up"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
            data-cursor="view"
          >
            Descubrir la colección
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
