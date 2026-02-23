import * as React from "react";
import { useState, useMemo } from "react";
import { Link } from "react-router";
import { ShopSidebar, type FilterState } from "../components/shop/ShopSidebar";
import { ShopProductCard } from "../components/shop/ShopProductCard";
import { PRODUCTS } from "../data/products";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "../components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

// ─────────────────────────────────────────────
// Price parser helper
// ─────────────────────────────────────────────
function parsePrice(priceStr: string): number {
  return parseFloat(priceStr.replace("€ ", "").replace("€", "").replace(",", ".").trim());
}

function matchesPriceRange(price: number, range: string): boolean {
  if (range === "Menos de €200") return price < 200;
  if (range === "€200 – €400")   return price >= 200 && price <= 400;
  if (range === "Más de €400")   return price > 400;
  return false;
}

// ─────────────────────────────────────────────
// Active filter pill
// ─────────────────────────────────────────────
function FilterPill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1.5 px-3 h-7 border border-black/20 hover:border-black/60 transition-colors group"
      style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
    >
      {label}
      <X size={9} className="text-black/40 group-hover:text-black/80 transition-colors" />
    </button>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    Colección: [],
    Talla: [],
    Color: [],
    Precio: [],
  });

  const [sortOrder, setSortOrder] = useState("newest");

  // ── Count active filters ──────────────────
  const activeFilterCount = useMemo(
    () =>
      Object.values(filters).reduce((sum, arr) => sum + arr.length, 0),
    [filters]
  );

  // ── Build flat list of active pills ───────
  const activePills = useMemo(() => {
    const pills: { category: keyof FilterState; value: string }[] = [];
    (Object.entries(filters) as [keyof FilterState, string[]][]).forEach(
      ([cat, vals]) => vals.forEach((v) => pills.push({ category: cat, value: v }))
    );
    return pills;
  }, [filters]);

  const removeFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }));
  };

  const clearAllFilters = () => {
    setFilters({ Colección: [], Talla: [], Color: [], Precio: [] });
  };

  // ── Filter & sort products ─────────────────
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category
    if (filters.Colección.length > 0) {
      result = result.filter((p) => filters.Colección.includes(p.category));
    }

    // Size
    if (filters.Talla.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.Talla.includes(s))
      );
    }

    // Color
    if (filters.Color.length > 0) {
      result = result.filter((p) => filters.Color.includes(p.color));
    }

    // Price
    if (filters.Precio.length > 0) {
      result = result.filter((p) => {
        const price = parsePrice(p.price);
        return filters.Precio.some((range) => matchesPriceRange(price, range));
      });
    }

    // Sort
    if (sortOrder === "price_asc") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOrder === "price_desc") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else {
      // newest → higher id first
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [filters, sortOrder]);

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 px-6 sm:px-8 md:px-14 lg:px-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── DESKTOP SIDEBAR ─────────────────── */}
          <div className="hidden lg:block w-64 flex-shrink-0 sticky top-32 self-start">
            <ShopSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* ── MAIN CONTENT ────────────────────── */}
          <div className="flex-1 flex flex-col">

            {/* Header / Controls */}
            <div className="flex justify-between items-center mb-6">

              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-none border-black/20 uppercase tracking-widest text-xs h-11 px-6 font-medium relative"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <SlidersHorizontal className="mr-2 h-3 w-3" />
                      Filtros
                      {activeFilterCount > 0 && (
                        <span
                          className="ml-2 w-4 h-4 bg-[#117837] text-white flex items-center justify-center"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.46rem", fontWeight: 500 }}
                        >
                          {activeFilterCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6 pt-12 overflow-y-auto">
                    <SheetHeader className="mb-8 text-left">
                      <SheetTitle
                        className="text-2xl font-normal"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Filtros
                      </SheetTitle>
                    </SheetHeader>
                    <ShopSidebar filters={filters} setFilters={setFilters} className="w-full" />
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="mt-8 w-full h-10 border border-black/20 uppercase tracking-widest text-xs hover:border-black/60 transition-colors"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Limpiar filtros
                      </button>
                    )}
                  </SheetContent>
                </Sheet>
              </div>

              {/* Sorting */}
              <div className="ml-auto w-[200px]">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger
                    className="w-full rounded-none border-transparent hover:border-black/10 text-right justify-end gap-2 focus:ring-0 px-0 h-11"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="text-black/40 text-xs uppercase tracking-widest mr-1">Ordenar:</span>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end" className="rounded-none border-black/10">
                    <SelectItem value="newest" className="font-light text-sm">Más reciente</SelectItem>
                    <SelectItem value="price_asc" className="font-light text-sm">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price_desc" className="font-light text-sm">Precio: mayor a menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filter pills + count (desktop) */}
            <div className="flex flex-wrap items-center gap-2 mb-6 min-h-[28px]">
              {/* Results count */}
              <span
                className="text-black/35 mr-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {filteredProducts.length} {filteredProducts.length === 1 ? "pieza" : "piezas"}
              </span>

              {activePills.map((pill) => (
                <FilterPill
                  key={`${pill.category}-${pill.value}`}
                  label={pill.value}
                  onRemove={() => removeFilter(pill.category, pill.value)}
                />
              ))}

              {activeFilterCount > 1 && (
                <button
                  onClick={clearAllFilters}
                  className="text-black/35 hover:text-black/70 transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}
                >
                  Limpiar todo
                </button>
              )}
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/producto/${product.id}`} className="w-full">
                    <ShopProductCard product={product} />
                  </Link>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div
                className="flex flex-col items-center justify-center py-32 text-center"
                style={{ borderTop: "0.5px solid rgba(26,26,26,0.08)" }}
              >
                <p
                  className="mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 400, color: "#1A1A1A" }}
                >
                  Sin resultados
                </p>
                <p
                  className="mb-8"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", fontWeight: 300, letterSpacing: "0.08em", color: "rgba(26,26,26,0.45)", lineHeight: 1.7 }}
                >
                  No hay piezas que coincidan con tu selección.<br />Prueba a ajustar los filtros.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="h-11 px-8 border border-black/20 uppercase tracking-widest text-xs hover:border-black/60 transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Ver todas las piezas
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
