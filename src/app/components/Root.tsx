import { useEffect } from "react";
import { Outlet } from "react-router";
import { MaylinHeader } from "./MaylinHeader";
import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "../context/CartContext";
import { CustomCursor } from "./ui/CustomCursor";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─────────────────────────────────────────────
// GSAP Global Performance Configuration
// ─────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// Reduce callbacks and optimize refresh events
ScrollTrigger.config({ 
  limitCallbacks: true,
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" // Limit refreshes
});

// Enable smooth scroll normalization with optimized settings for touch
if (typeof window !== "undefined" && ScrollTrigger.isTouch === 1) {
  ScrollTrigger.normalizeScroll({
    allowNestedScroll: true
  });
}

export function Root() {
  useEffect(() => {
    // Debounce resize events to protect the main thread
    let resizeTimer: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CartProvider>
      <div
        className="min-h-screen w-full overflow-x-hidden relative"
        style={{ backgroundColor: "#FAF8F5" }}
      >
        <CustomCursor />
        <MaylinHeader />
        <CartDrawer />
        <Outlet />
      </div>
    </CartProvider>
  );
}
