import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Check, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { ShopProduct } from "./ShopProductCard";
import { ExtendedProduct } from "../../data/products";

interface MobileQuickAddDrawerProps {
  product: ShopProduct;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mockColors: string[];
}

export function MobileQuickAddDrawer({
  product,
  isOpen,
  onOpenChange,
  mockColors,
}: MobileQuickAddDrawerProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product.colorHex || mockColors[0] || "#000000");

  const handleConfirmAdd = () => {
    if (!selectedSize) return;
    
    // Convert to extended product for cart
    const cartProduct = {
      ...product,
      colorHex: selectedColor,
      color: "Seleccionado",
    } as ExtendedProduct;

    addItem(cartProduct, selectedSize, 1);
    
    // Close drawer
    onOpenChange(false);
    
    // Reset selection after close delay
    setTimeout(() => {
      setSelectedSize(null);
    }, 300);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="w-full h-auto max-h-[90vh] p-0 rounded-t-2xl overflow-hidden flex flex-col items-center [&>button]:hidden"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
      >
        {/* Header - Drag Handle & Title */}
        <SheetHeader className="w-full relative px-6 pt-6 pb-4 flex justify-center items-center" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-black/10 rounded-full" />
          <button 
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              onOpenChange(false); 
            }}
            className="absolute top-4 right-4 p-2 text-black/40 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
          <SheetTitle 
            className="text-center w-full mt-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}
          >
            Añadir Pieza
          </SheetTitle>
        </SheetHeader>

        <div className="w-full px-6 flex flex-col gap-8 pb-32 overflow-y-auto" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          {/* Color Selection */}
          <div className="flex flex-col gap-3">
            <span className="text-black/60" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Selecciona Color
            </span>
            <div className="flex gap-4">
              {mockColors.map((c, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedColor(c); }}
                  className={`w-8 h-8 rounded-full border transition-all ${selectedColor === c ? "border-black scale-[1.15]" : "border-black/15"}`}
                  style={{
                    backgroundColor: c,
                    boxShadow: selectedColor === c ? "0 0 0 2px white inset" : "none"
                  }}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-3">
            <span className="text-black/60 flex justify-between w-full" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <span>Selecciona tu Talla</span>
              <span className="underline cursor-pointer">Guía de Tallas</span>
            </span>
            
            <div className="flex flex-col border-t border-black/10">
              {product.sizes.map(size => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSize(size); }}
                    className="flex justify-between items-center py-4 border-b border-black/10 transition-colors hover:bg-black/[0.02]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: isSelected ? 600 : 400 }}
                  >
                    <span>{size}</span>
                    {isSelected && <Check size={18} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky Confirm Button */}
        <div className="absolute bottom-0 w-full p-4 bg-white border-t border-black/5 pb-8" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleConfirmAdd(); }}
            disabled={!selectedSize}
            className={`w-full py-4 text-white uppercase transition-all flex justify-center items-center ${selectedSize ? 'bg-black hover:bg-black/80' : 'bg-black/30 cursor-not-allowed'}`}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", fontWeight: 500 }}
          >
            Añadir a la bolsa
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
