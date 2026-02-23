import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Check } from "lucide-react";

export type FilterState = {
  Colección: string[];
  Talla: string[];
  Color: string[];
  Precio: string[];
};

interface ShopSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  className?: string;
}

const FILTER_OPTIONS = {
  Colección: ["Vestidos", "Abrigos", "Blazers", "Faldas", "Pantalones", "Chaquetas", "Tops"],
  Talla: ["XS", "S", "M", "L", "XL"],
  Color: ["Negro", "Crema", "Arena", "Verde", "Terracota"],
  Precio: ["Menos de €200", "€200 – €400", "Más de €400"],
};

export function ShopSidebar({ filters, setFilters, className = "" }: ShopSidebarProps) {
  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const current = prev[category];
      const isSelected = current.includes(value);
      if (isSelected) {
        return { ...prev, [category]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  return (
    <aside className={`w-64 flex-shrink-0 ${className}`}>
      <Accordion type="multiple" defaultValue={["Colección", "Talla", "Color", "Precio"]} className="w-full">
        {Object.entries(FILTER_OPTIONS).map(([category, options]) => (
          <AccordionItem key={category} value={category} className="border-b border-black/10">
            <AccordionTrigger 
              className="py-4 hover:no-underline hover:opacity-70 transition-opacity"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "#1A1A1A",
              }}
            >
              {category}
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="flex flex-col gap-2">
                {options.map((option) => {
                  const isSelected = filters[category as keyof FilterState].includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => toggleFilter(category as keyof FilterState, option)}
                      className="flex items-center gap-3 text-left group"
                    >
                      <div 
                        className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                          isSelected ? "border-[#1A1A1A] bg-[#1A1A1A]" : "border-black/20 group-hover:border-black/40"
                        }`}
                      >
                        {isSelected && <Check size={10} color="white" />}
                      </div>
                      <span 
                        className={`text-sm tracking-wide transition-colors ${
                          isSelected ? "text-[#1A1A1A] font-medium" : "text-black/60 group-hover:text-black/80"
                        }`}
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}
