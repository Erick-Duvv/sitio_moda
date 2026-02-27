import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Search, User, ShoppingBag } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useCart } from "../context/CartContext";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const NAV_DESKTOP = [
  { label: "Nueva Era",     href: "#" },
  { label: "Colecciones",   href: "/colecciones" },
  { label: "Tienda",        href: "/tienda" },
  { label: "El Manifiesto", href: "#" },
  { label: "Sobre Maylin",  href: "/nosotros" },
];

const NAV_MOBILE_MAIN = [
  { label: "Nueva Era",     href: "#",            num: "01" },
  { label: "Colecciones",   href: "/colecciones", num: "02" },
  { label: "Tienda",        href: "/tienda",       num: "03" },
  { label: "El Manifiesto", href: "#",            num: "04" },
  { label: "Sobre Maylin",  href: "/nosotros",    num: "05" },
];

const NAV_MOBILE_SEC = [
  { label: "Contacto", href: "/contacto" },
  { label: "Términos", href: "/terminos" },
  { label: "Política", href: "/politica" },
];

// ─────────────────────────────────────────────
// Desktop NavLink – underline grows from center
// ─────────────────────────────────────────────
function NavLink({
  href,
  children,
  color,
}: {
  href: string;
  children: React.ReactNode;
  color: string;
}) {
  const isInternal = href.startsWith("/");
  const underlineRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    if (underlineRef.current)
      gsap.to(underlineRef.current, { scaleX: 1, duration: 0.32, ease: "power3.out" });
  };
  const onLeave = () => {
    if (underlineRef.current)
      gsap.to(underlineRef.current, { scaleX: 0, duration: 0.22, ease: "power3.in" });
  };

  const sharedStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "0.65rem",
    fontWeight: 400,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    textDecoration: "none",
    color,
    position: "relative",
    transition: "color 0.35s ease",
    paddingBottom: "3px",
  };

  const underline = (
    <span
      ref={underlineRef}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "0.5px",
        backgroundColor: color,
        transform: "scaleX(0)",
        transformOrigin: "center",
      }}
    />
  );

  if (isInternal) {
    return (
      <Link to={href} style={sharedStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {children}
        {underline}
      </Link>
    );
  }
  return (
    <a href={href} style={sharedStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
      {underline}
    </a>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export function MaylinHeader() {
  const headerRef       = useRef<HTMLElement>(null);
  const overlayRef      = useRef<HTMLDivElement>(null);
  const overlayBgRef    = useRef<HTMLDivElement>(null);
  const navItemsRef     = useRef<(HTMLDivElement | null)[]>([]);
  const navSecRef       = useRef<HTMLDivElement>(null);
  const navFooterRef    = useRef<HTMLDivElement>(null);
  const line1Ref        = useRef<HTMLSpanElement>(null);
  const line2Ref        = useRef<HTMLSpanElement>(null);
  const cartBadgeRef    = useRef<HTMLSpanElement>(null);

  const lastScrollY     = useRef(0);
  const scrolledRef     = useRef(false);
  const isHiddenRef     = useRef(false);
  const menuOpenRef     = useRef(false);

  const [menuOpen, setMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems: cartCount, openCart } = useCart();

  const isHomePage = location.pathname === "/";

  // Derived color: when scrolled (and menu closed) or on non-hompage → dark; otherwise white
  const isLight = (!isHomePage || isScrolled) && !menuOpen;
  const textColor  = isLight ? "#0a0a0a"            : "#FAF8F5";
  const logoColor  = isLight ? "#0a0a0a"            : "#FAF8F5";
  const iconColor  = isLight ? "rgba(10,10,10,0.7)" : "rgba(250,248,245,0.75)";
  const iconHover  = isLight ? "#0a0a0a"            : "#FAF8F5";
  const borderClr  = isLight ? "rgba(10,10,10,0.1)" : "rgba(250,248,245,0.08)";

  // ── Initial entrance ───────────────────────
  useGSAP(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.1 }
    );
  }, []);

  // ── Smart Sticky + Backdrop transition ─────
  useEffect(() => {
    const SCROLL_THRESHOLD = 80;   // px before backdrop activates
    const HIDE_THRESHOLD   = 140;  // px before smart-hide kicks in

    const onScroll = () => {
      const currentY = window.scrollY;
      if (menuOpenRef.current) { lastScrollY.current = currentY; return; }

      // Always visible sticky header (only update backdrop)
      const nowScrolled = currentY > SCROLL_THRESHOLD;
      if (nowScrolled !== scrolledRef.current) {
        scrolledRef.current = nowScrolled;
        setIsScrolled(nowScrolled);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Menu open / close ───────────────────────
  const openMenu = useCallback(() => {
    menuOpenRef.current = true;
    setMenuOpen(true);

    // Reveal overlay
    gsap.set(overlayRef.current, { display: "flex" });
    gsap.fromTo(
      overlayBgRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.75, ease: "power4.inOut" }
    );

    // Stagger nav items
    const items = navItemsRef.current.filter(Boolean);
    gsap.fromTo(
      items,
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out", delay: 0.35 }
    );
    if (navSecRef.current) {
      gsap.fromTo(
        navSecRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.65 }
      );
    }
    if (navFooterRef.current) {
      gsap.fromTo(
        navFooterRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.75 }
      );
    }

    // Animate hamburger → X
    if (line1Ref.current && line2Ref.current) {
      gsap.to(line1Ref.current, {
        rotate: 45,
        y: 5,
        width: 22,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(line2Ref.current, {
        rotate: -45,
        y: -5,
        width: 22,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, []);

  const closeMenu = useCallback(() => {
    // Animate X → hamburger
    if (line1Ref.current && line2Ref.current) {
      gsap.to(line1Ref.current, {
        rotate: 0,
        y: 0,
        width: 22,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(line2Ref.current, {
        rotate: 0,
        y: 0,
        width: 14,
        duration: 0.35,
        ease: "power3.out",
      });
    }

    // Fade out items
    const items = navItemsRef.current.filter(Boolean);
    gsap.to([items, navSecRef.current, navFooterRef.current], {
      opacity: 0,
      y: -16,
      duration: 0.25,
      stagger: 0.04,
      ease: "power2.in",
    });

    // Collapse overlay
    gsap.to(overlayBgRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.55,
      ease: "power4.inOut",
      delay: 0.1,
      onComplete: () => {
        gsap.set(overlayRef.current, { display: "none" });
        menuOpenRef.current = false;
        setMenuOpen(false);
      },
    });
  }, []);

  const toggleMenu = useCallback(() => {
    if (menuOpenRef.current) closeMenu();
    else openMenu();
  }, [openMenu, closeMenu]);

  // Close menu on route navigate
  const handleMobileNav = (href: string) => {
    closeMenu();
    setTimeout(() => {
      if (href.startsWith("/")) navigate(href);
    }, 650);
  };

  // ─── Render ────────────────────────────────
  return (
    <>
      {/* ── HEADER ────────────────────────────── */}
      <header
        ref={headerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "clamp(20px, 4vw, 56px)",
          paddingRight: "clamp(20px, 4vw, 56px)",
          backgroundColor: (!isHomePage || isScrolled) && !menuOpen
            ? "rgba(250,248,245,0.82)"
            : "transparent",
          backdropFilter: (!isHomePage || isScrolled) && !menuOpen ? "blur(15px)" : "none",
          WebkitBackdropFilter: (!isHomePage || isScrolled) && !menuOpen ? "blur(15px)" : "none",
          borderBottom: (!isHomePage || isScrolled) && !menuOpen
            ? `1px solid ${borderClr}`
            : "1px solid transparent",
          transition:
            "background-color 0.45s ease, backdrop-filter 0.45s ease, border-color 0.45s ease",
          opacity: 0, // GSAP will animate this in
        }}
      >

        {/* ── MOBILE LAYOUT ──────────────────── */}
        <div
          className="flex md:hidden items-center justify-between w-full"
          style={{ height: 72 }}
        >
          {/* Hamburger — architectural (2 lines, asymmetric) */}
          <button
            onClick={toggleMenu}
            aria-label="Menú"
            style={{ background: "none", border: "none", padding: "8px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}
          >
            {/* Top line — longer */}
            <span
              ref={line1Ref}
              style={{
                display: "block",
                width: 22,
                height: 1,
                backgroundColor: menuOpen ? "#FAF8F5" : textColor,
                transformOrigin: "center",
                transition: "background-color 0.3s ease",
              }}
            />
            {/* Bottom line — shorter */}
            <span
              ref={line2Ref}
              style={{
                display: "block",
                width: 14,
                height: 1,
                backgroundColor: menuOpen ? "#FAF8F5" : textColor,
                transformOrigin: "center",
                transition: "background-color 0.3s ease",
              }}
            />
          </button>

          {/* Logo — centered */}
          <Link
            to="/"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              fontWeight: 500,
              letterSpacing: "0.42em",
              textDecoration: "none",
              color: menuOpen ? "#FAF8F5" : logoColor,
              transition: "color 0.35s ease",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            MAYLIN
          </Link>

          {/* Shopping Bag */}
          <button
            aria-label="Bolsa de compra"
            onClick={openCart}
            style={{ background: "none", border: "none", padding: "8px", cursor: "pointer", position: "relative" }}
          >
            <ShoppingBag
              size={18}
              strokeWidth={1}
              style={{ color: menuOpen ? "rgba(250,248,245,0.75)" : iconColor, transition: "color 0.35s ease" }}
            />
            {cartCount > 0 && (
              <span
                ref={cartBadgeRef}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 14,
                  height: 14,
                  backgroundColor: menuOpen ? "#FAF8F5" : (isLight ? "#0a0a0a" : "#FAF8F5"),
                  color: menuOpen ? "#0a0a0a" : (isLight ? "#FAF8F5" : "#0a0a0a"),
                  borderRadius: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.48rem",
                  fontWeight: 500,
                  transition: "background-color 0.35s ease, color 0.35s ease",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* ── DESKTOP LAYOUT ─────────────────── */}
        <div className="hidden md:flex items-center justify-between w-full">

          {/* Logo — left */}
          <Link
            to="/"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              fontWeight: 500,
              letterSpacing: "0.42em",
              textDecoration: "none",
              color: logoColor,
              transition: "color 0.45s ease",
              flexShrink: 0,
            }}
          >
            MAYLIN
          </Link>

          {/* Nav — center */}
          <nav style={{ display: "flex", alignItems: "center", gap: "clamp(24px, 3.5vw, 48px)" }}>
            {NAV_DESKTOP.map(link => (
              <NavLink key={link.label} href={link.href} color={textColor}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Icons — right */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
            {/* Search */}
            <IconButton label="Buscar" color={iconColor} hoverColor={iconHover}>
              <Search size={16} strokeWidth={1} />
            </IconButton>

            {/* Account */}
            <IconButton label="Cuenta" color={iconColor} hoverColor={iconHover}>
              <User size={16} strokeWidth={1} />
            </IconButton>

            {/* Bag */}
            <IconButton label="Bolsa" color={iconColor} hoverColor={iconHover} style={{ position: "relative" }} onClick={openCart}>
              <ShoppingBag size={16} strokeWidth={1} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -4,
                    width: 14,
                    height: 14,
                    backgroundColor: isLight ? "#0a0a0a" : "#FAF8F5",
                    color: isLight ? "#FAF8F5" : "#0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.48rem",
                    fontWeight: 500,
                    borderRadius: 0,
                    transition: "background-color 0.45s ease, color 0.45s ease",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </IconButton>
          </div>
        </div>
      </header>

      {/* ── FULL-SCREEN MENU OVERLAY ──────────── */}
      <div
        ref={overlayRef}
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          zIndex: 95,
          flexDirection: "column",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Animated black background */}
        <div
          ref={overlayBgRef}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(8,8,8,0.97)",
            clipPath: "inset(0 0 100% 0)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            paddingTop: 96,
            paddingBottom: 48,
            paddingLeft: "clamp(24px, 8vw, 64px)",
            paddingRight: "clamp(24px, 8vw, 64px)",
          }}
        >
          {/* Main nav items */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {NAV_MOBILE_MAIN.map((item, i) => (
              <div
                key={item.label}
                ref={el => { navItemsRef.current[i] = el; }}
                style={{ opacity: 0 }}
              >
                <button
                  onClick={() => handleMobileNav(item.href)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "20px 0",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    display: "flex",
                    alignItems: "baseline",
                    gap: 20,
                    borderBottom: "0.5px solid rgba(250,248,245,0.08)",
                  }}
                >
                  {/* Number label */}
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.52rem",
                      fontWeight: 400,
                      letterSpacing: "0.25em",
                      color: "rgba(250,248,245,0.28)",
                      flexShrink: 0,
                      paddingBottom: "6px",
                    }}
                  >
                    {item.num}
                  </span>

                  {/* Main label */}
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(2.4rem, 10vw, 4rem)",
                      fontWeight: 400,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      color: "#FAF8F5",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </div>
            ))}
          </nav>

          {/* Bottom section */}
          <div>
            {/* Secondary links */}
            <div
              ref={navSecRef}
              style={{
                opacity: 0,
                display: "flex",
                gap: 32,
                marginBottom: 36,
              }}
            >
              {NAV_MOBILE_SEC.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 300,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(250,248,245,0.45)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Footer: brand mark */}
            <div
              ref={navFooterRef}
              style={{
                opacity: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.5rem",
                  fontWeight: 400,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(250,248,245,0.18)",
                }}
              >
                © Maylin 2025
              </span>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.72rem",
                  fontWeight: 400,
                  letterSpacing: "0.28em",
                  color: "rgba(250,248,245,0.18)",
                  fontStyle: "italic",
                }}
              >
                SS 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// Tiny helper: Icon Button
// ─────────────────────────────────────────────
function IconButton({
  children,
  label,
  color,
  hoverColor,
  style,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  color: string;
  hoverColor: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      aria-label={label}
      onMouseEnter={() => {
        if (ref.current) gsap.to(ref.current, { color: hoverColor, duration: 0.2 });
      }}
      onMouseLeave={() => {
        if (ref.current) gsap.to(ref.current, { color, duration: 0.25 });
      }}
      style={{
        background: "none",
        border: "none",
        padding: "6px",
        cursor: "pointer",
        color,
        transition: "color 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}