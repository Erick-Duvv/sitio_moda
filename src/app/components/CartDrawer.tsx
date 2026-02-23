import * as React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

// ─────────────────────────────────────────────
// Cart Drawer — slide-in from the right
// ─────────────────────────────────────────────
export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();

  const overlayRef  = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);

  // Animate open / close
  useGSAP(() => {
    if (isOpen) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.55, ease: "power4.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", delay: 0.22 }
      );
    } else {
      gsap.to(panelRef.current, {
        x: "100%",
        duration: 0.45,
        ease: "power3.inOut",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.38,
        ease: "power2.in",
        onComplete: () =>
          gsap.set(overlayRef.current, { display: "none" }),
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      style={{
        display: "none",
        position: "fixed",
        inset: 0,
        zIndex: 200,
        alignItems: "stretch",
        justifyContent: "flex-end",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={closeCart}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          position: "relative",
          width: "clamp(340px, 100%, 480px)",
          backgroundColor: "#FAFAF9",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transform: "translateX(100%)",
          zIndex: 1,
        }}
      >
        {/* ── HEADER ─────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 28px",
            borderBottom: "0.5px solid rgba(26,26,26,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "#1A1A1A",
                letterSpacing: "-0.01em",
              }}
            >
              Carrito
            </span>
            {totalItems > 0 && (
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: "#FAFAF9",
                  backgroundColor: "#117837",
                  borderRadius: 0,
                  padding: "3px 7px",
                  lineHeight: 1,
                }}
              >
                {totalItems}
              </span>
            )}
          </div>

          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              color: "rgba(26,26,26,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "rgba(26,26,26,0.5)")
            }
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── CONTENT ────────────────────────── */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: items.length === 0 ? "0" : "8px 0",
          }}
        >
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {items.map((item) => (
                <CartItemRow
                  key={`${item.product.id}-${item.size}`}
                  item={item}
                  onRemove={() => removeItem(item.product.id, item.size)}
                  onQuantityChange={(q) =>
                    updateQuantity(item.product.id, item.size, q)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER ─────────────────────────── */}
        {items.length > 0 && (
          <div
            style={{
              borderTop: "0.5px solid rgba(26,26,26,0.1)",
              padding: "24px 28px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* Subtotal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(26,26,26,0.5)",
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#1A1A1A",
                  letterSpacing: "0.02em",
                }}
              >
                € {totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Shipping note */}
            {totalPrice >= 300 ? (
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.64rem",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  color: "#117837",
                  textAlign: "center",
                }}
              >
                ✓ Envío gratuito incluido
              </p>
            ) : (
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.64rem",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  color: "rgba(26,26,26,0.45)",
                  textAlign: "center",
                }}
              >
                Envío gratuito a partir de €300 · Faltan €{(300 - totalPrice).toFixed(0)}
              </p>
            )}

            {/* CTA */}
            <button
              style={{
                width: "100%",
                height: 52,
                backgroundColor: "#117837",
                color: "#FAFAF9",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                transition: "background-color 0.25s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0e632d")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#117837")
              }
            >
              Finalizar Compra
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>

            {/* Continue shopping */}
            <button
              onClick={closeCart}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 400,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(26,26,26,0.45)",
                padding: "4px",
                textDecoration: "underline",
                textDecorationColor: "rgba(26,26,26,0.2)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(26,26,26,0.45)")
              }
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Single cart item row
// ─────────────────────────────────────────────
function CartItemRow({
  item,
  onRemove,
  onQuantityChange,
}: {
  item: import("../context/CartContext").CartItem;
  onRemove: () => void;
  onQuantityChange: (q: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "16px 28px",
        borderBottom: "0.5px solid rgba(26,26,26,0.06)",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 76,
          flexShrink: 0,
          aspectRatio: "3/4",
          backgroundColor: "#F0EDEA",
          overflow: "hidden",
        }}
      >
        <img
          src={item.product.image}
          alt={item.product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h4
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 400,
              color: "#1A1A1A",
              letterSpacing: "0.01em",
              lineHeight: 1.3,
              maxWidth: "75%",
            }}
          >
            {item.product.name}
          </h4>
          <button
            onClick={onRemove}
            aria-label="Eliminar"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(26,26,26,0.3)",
              padding: "2px",
              display: "flex",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "rgba(26,26,26,0.3)")
            }
          >
            <Trash2 size={13} strokeWidth={1.5} />
          </button>
        </div>

        {/* Size + Color */}
        <div style={{ display: "flex", gap: 12 }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(26,26,26,0.45)",
            }}
          >
            Talla {item.size}
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(26,26,26,0.45)",
            }}
          >
            {item.product.color}
          </span>
        </div>

        {/* Price + Quantity controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.88rem",
              fontWeight: 500,
              color: "#1A1A1A",
              letterSpacing: "0.02em",
            }}
          >
            {item.product.price}
          </span>

          {/* Quantity stepper */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "0.5px solid rgba(26,26,26,0.15)",
              height: 32,
            }}
          >
            <button
              onClick={() => onQuantityChange(item.quantity - 1)}
              style={{
                width: 32,
                height: 32,
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: item.quantity <= 1 ? "rgba(26,26,26,0.2)" : "rgba(26,26,26,0.6)",
              }}
              disabled={item.quantity <= 1}
            >
              <Minus size={11} strokeWidth={1.5} />
            </button>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 400,
                color: "#1A1A1A",
                minWidth: 24,
                textAlign: "center",
              }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => onQuantityChange(item.quantity + 1)}
              style={{
                width: 32,
                height: 32,
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(26,26,26,0.6)",
              }}
            >
              <Plus size={11} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Empty state
// ─────────────────────────────────────────────
function EmptyCart() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 20,
        padding: "60px 32px",
        textAlign: "center",
      }}
    >
      <ShoppingBag
        size={36}
        strokeWidth={0.8}
        style={{ color: "rgba(26,26,26,0.2)" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.15rem",
            fontWeight: 400,
            color: "#1A1A1A",
          }}
        >
          Tu carrito está vacío
        </p>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 300,
            letterSpacing: "0.08em",
            color: "rgba(26,26,26,0.45)",
            lineHeight: 1.6,
          }}
        >
          Descubre nuestra colección<br />y añade piezas que te inspiren.
        </p>
      </div>
    </div>
  );
}
