import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1738247999648-c251148e4dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWwlMjBjaW5lbWF0aWMlMjBkYXJrfGVufDF8fHx8MTc3MTcyMDk3MXww&ixlib=rb-4.1.0&q=80&w=1920";

const SplitText = ({ children, className, style }: { children: string; className?: string; style?: React.CSSProperties }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`} style={style}>
      {children.split("").map((char, i) => (
        <span key={i} className="inline-block reveal-text will-change-transform" style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export function MaylinHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    const mm = gsap.matchMedia();

    // 1. Image Scale Down (Page Load)
    tl.fromTo(
      imageRef.current,
      { scale: 1.1 },
      { scale: 1.0, duration: 3.5, ease: "power2.out" }
    );

    // 2. Text Reveal
    const chars = textContainerRef.current?.querySelectorAll(".reveal-text");
    if (chars) {
        tl.fromTo(chars, { y: "100%" }, { y: "0%", duration: 1, stagger: 0.02, ease: "power3.out" }, "-=3.0");
    }
    
    const otherElements = textContainerRef.current?.querySelectorAll(".fade-up");
    if (otherElements) {
        tl.fromTo(otherElements, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" }, "-=2.5");
    }

    // 3. Responsive Parallax on Scroll
    mm.add({
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)"
    }, (context) => {
      const { isMobile } = context.conditions as any;
      
      // Image Parallax
      gsap.to(imageRef.current, {
          yPercent: isMobile ? 3 : 20, // Significantly reduced intensity on mobile for performance
          ease: "none",
          force3D: true,
          scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: isMobile ? 0.5 : 2, // Faster response on mobile
          }
      });

      // Text Parallax
      gsap.to(textContainerRef.current, {
          yPercent: isMobile ? -2 : -20, // Significantly reduced intensity on mobile
          opacity: 0,
          ease: "none",
          force3D: true,
          scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: isMobile ? 0.5 : 2, // Faster response on mobile
          }
      });
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden hero-container-mobile bg-fixed-optimized"
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <img
          ref={imageRef}
          src={HERO_IMAGE}
          alt="Maylin — La Nueva Era"
          fetchPriority="high"
          decoding="async"
          className="w-full h-[115%] md:h-[120%] object-cover-optimized object-top -mt-[5%] md:-mt-[10%] gpu-accelerated" // Slightly smaller and centered correctly for mobile
        />
      </div>

      {/* Layered gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 60%)",
        }}
      />

      {/* Hero text content */}
      <div
        ref={textContainerRef}
        className="absolute bottom-0 left-0 right-0 px-8 md:px-14 pb-16 md:pb-20 z-10"
      >
        {/* Season label */}
        <p
          className="text-white/50 mb-4 tracking-widest uppercase fade-up"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 400,
            letterSpacing: "0.3em",
          }}
        >
          Colección SS 2025
        </p>

        {/* Main headline — editorial, enormous */}
        <div className="flex flex-col">
          <h1
            className="text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(4rem, 11vw, 13rem)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            <SplitText>La Nueva</SplitText>
          </h1>
          <h1
            className="text-white/90 italic"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(4rem, 11vw, 13rem)",
              fontWeight: 400,
              lineHeight: 0.88,
              letterSpacing: "0.01em",
              margin: 0,
              paddingLeft: "clamp(1rem, 4vw, 7rem)",
            }}
          >
             <SplitText>Era.</SplitText>
          </h1>
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-10 mt-10 fade-up">
          <a
            href="#"
            className="text-white border-b border-white/40 hover:border-white pb-0.5 transition-all duration-300 group"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
            data-cursor="view"
          >
            Ver la Colección
            <span className="inline-block ml-3 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
          <span className="text-white/25 hidden md:block" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", fontFamily: "'Space Grotesk', sans-serif" }}>
            Desplázate para descubrir
          </span>
        </div>
      </div>

      {/* Corner label */}
      <div
        className="absolute top-24 right-10 hidden md:block fade-up"
      >
        <p
          className="text-white/30 writing-mode-vertical"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Alta Costura Contemporánea
        </p>
      </div>
    </section>
  );
}
