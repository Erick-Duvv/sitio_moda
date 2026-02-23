import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MARQUEE_TEXT =
  "ALTA COSTURA CONTEMPORÁNEA — DISEÑADO PARA IMPACTAR — MAYLIN 2025 — NUEVA ERA — ";

const repeated = Array(6).fill(MARQUEE_TEXT).join("");

export function MaylinMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate duration based on width for consistent speed
    // But fixed duration is fine for now
    const duration = 30;

    const tween = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: duration,
      ease: "none",
    });

    const handleMouseEnter = () => gsap.to(tween, { timeScale: 0.5, duration: 0.5 });
    const handleMouseLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });

    const container = containerRef.current;
    if (container) {
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
        if (container) {
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
        }
        tween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-[#0a0a0a] relative cursor-default"
      style={{ paddingBlock: "1.1rem" }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8" />

      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-white/85 flex-shrink-0"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {repeated}
          </span>
        ))}
      </div>
    </div>
  );
}
