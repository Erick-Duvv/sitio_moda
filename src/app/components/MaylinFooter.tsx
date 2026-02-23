import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Instagram, Twitter, Youtube } from "lucide-react";

const FOOTER_LINKS = {
  Colecciones: ["Nueva Era SS25", "Otoño/Invierno 24", "Cápsulas", "Vestidos", "Abrigos", "Accesorios"],
  Información: ["Sobre Maylin", "Sostenibilidad", "Tiendas", "Prensa", "Colaboraciones"],
  Soporte: ["Envíos y devoluciones", "Guía de tallas", "Cuidado de prendas", "Contacto", "FAQ"],
};

export function MaylinFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      ref={ref}
      className="bg-[#0a0a0a] relative"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Top strip */}
      <div
        className="px-8 md:px-14 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Large logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-white/90"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 7vw, 7rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            Maylin
          </p>
          <p
            className="text-white/25 mt-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 300,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Alta Costura Contemporánea · Desde 2019
          </p>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className="w-full md:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-white/40 mb-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Newsletter exclusivo
          </p>
          <div
            className="flex"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
          >
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="bg-transparent text-white placeholder-white/25 outline-none py-2 pr-4 flex-1 min-w-[200px] md:min-w-[260px]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 300,
                letterSpacing: "0.05em",
              }}
            />
            <button
              className="text-white/60 hover:text-white transition-colors duration-300 py-2 pl-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Suscribir →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main links area */}
      <div className="px-8 md:px-14 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <p
            className="text-white/20 uppercase mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 400,
              letterSpacing: "0.28em",
            }}
          >
            Maylin
          </p>
          <p
            className="text-white/35 max-w-[180px]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: "0.01em",
            }}
          >
            Diseñado para quienes no piden permiso para existir.
          </p>
          {/* Social icons */}
          <div className="flex gap-4 mt-8">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <button
                key={i}
                className="text-white/30 hover:text-white/70 transition-colors duration-300"
              >
                <Icon size={14} strokeWidth={1.25} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([title, links], colIdx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, delay: 0.15 + colIdx * 0.08 }}
          >
            <p
              className="text-white/20 uppercase mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 400,
                letterSpacing: "0.28em",
              }}
            >
              {title}
            </p>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/40 hover:text-white/80 transition-colors duration-300"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 300,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="px-8 md:px-14 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p
          className="text-white/20"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 300,
            letterSpacing: "0.1em",
          }}
        >
          © 2025 Maylin. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          {["Privacidad", "Términos", "Cookies"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white/20 hover:text-white/50 transition-colors duration-300"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 300,
                letterSpacing: "0.1em",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
