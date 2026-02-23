import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const hasMovedRef = useRef(false);

  // Initialize cursor position and movement
  useGSAP(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initially set cursor position with opacity 0 (invisible but maintains size)
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      // Make visible on first move
      if (!hasMovedRef.current) {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
        hasMovedRef.current = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Global hover listener
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorType) {
        setIsHovering(true);
        setCursorText(cursorType === "drag" ? "Drag" : "Ver");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Handle hover state animations
  useGSAP(() => {
    const cursor = cursorRef.current;
    const text = cursorTextRef.current;
    if (!cursor || !text) return;

    if (isHovering) {
      gsap.to(cursor, {
        width: 80,
        height: 80,
        backgroundColor: "#ffffff",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(text, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        delay: 0.05
      });
    } else {
      gsap.to(cursor, {
        width: 12,
        height: 12,
        backgroundColor: "#ffffff",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(text, {
        opacity: 0,
        scale: 0.5,
        duration: 0.2
      });
    }
  }, [isHovering]);

  return (
    <>
      <style>{`
        body, a, button, [role="button"] {
          cursor: none !important;
        }
        @media (hover: none) {
          body, a, button, [role="button"] {
            cursor: auto !important;
          }
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
        style={{ 
          width: 12, 
          height: 12, 
          backgroundColor: "#ffffff"
        }}
      >
        <span
          ref={cursorTextRef}
          className="text-black text-[10px] uppercase font-bold tracking-widest opacity-0 whitespace-nowrap"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {cursorText}
        </span>
      </div>
    </>
  );
}