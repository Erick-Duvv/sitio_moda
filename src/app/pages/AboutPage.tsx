import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowDown } from "lucide-react";

export function AboutPage() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  
  // Simple parallax effect on scroll for the hero text
  useEffect(() => {
    const handleScroll = () => {
      if (heroTextRef.current) {
        const scrolled = window.scrollY;
        heroTextRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroTextRef.current.style.opacity = `${1 - scrolled / 500}`;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      
      {/* ── CINEMATIC HERO ────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20 z-10" /> {/* Slight overlay for text readability */}
        <img 
          src="https://images.unsplash.com/photo-1762605135012-56a59a059e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
          alt="Maylin Editorial" 
          className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
        />
        
        <div className="relative z-20 w-full px-6 md:px-14 lg:px-20 max-w-[1800px]">
          <h1 
            ref={heroTextRef}
            className="text-[15vw] leading-[0.8] font-normal text-white mix-blend-difference opacity-90 tracking-tighter"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            EL <br />
            MANIFIESTO
          </h1>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce">
           <ArrowDown size={32} strokeWidth={1} />
        </div>
      </section>

      {/* ── THE STORY (ASYMMETRIC) ───────────────────── */}
      <section className="py-32 md:py-48 px-6 md:px-14 lg:px-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
          
          {/* Left: Abstract Image */}
          <div className="w-full lg:w-1/3 relative group">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
               <img 
                 src="https://images.unsplash.com/photo-1631663027474-f965d42cbe9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                 alt="Texture Detail"
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
               />
            </div>
            <span className="absolute -bottom-10 left-0 text-xs tracking-[0.2em] font-light text-black/40 uppercase">
              Fig. 01 — La Esencia
            </span>
          </div>

          {/* Right: Text Block */}
          <div className="w-full lg:w-2/3">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl leading-tight font-normal text-[#1A1A1A] mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No diseñamos ropa. <br />
              <span className="italic text-[#117837]">Esculpimos actitud.</span>
            </h2>
            
            <div className="flex flex-col gap-8 max-w-xl ml-auto lg:ml-20">
              <p className="text-lg md:text-xl font-light leading-relaxed text-black/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Maylin nace de una obsesión por la forma y el vacío. En un mundo saturado de ruido, elegimos el silencio de las líneas puras. Nuestra estética, el "brutalismo elegante", no es solo un estilo visual, sino una declaración de intenciones.
              </p>
              <p className="text-lg md:text-xl font-light leading-relaxed text-black/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Rechazamos lo superfluo para elevar lo esencial. Cada costura tiene un propósito; cada tejido, una historia. Creamos para la mujer que no necesita gritar para ser escuchada.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── CRAFTSMANSHIP / VALUES ───────────────────── */}
      <section className="py-24 bg-[#F9F9F9]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1600px] mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
             
             {/* Value 1 */}
             <div className="flex flex-col gap-6 group">
               <div className="h-64 overflow-hidden mb-4">
                 <img 
                   src="https://images.unsplash.com/photo-1751337082415-b6fef23a80ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" 
                   alt="Diseño"
                   className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
                 />
               </div>
               <h3 className="text-2xl font-medium tracking-wide uppercase border-l-2 border-[#117837] pl-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                 Diseño
               </h3>
               <p className="text-black/60 font-light leading-relaxed pl-4.5">
                 Arquitectura aplicada al cuerpo. Estudiamos volúmenes y proporciones para crear siluetas que desafían lo convencional sin sacrificar la elegancia atemporal.
               </p>
             </div>

             {/* Value 2 */}
             <div className="flex flex-col gap-6 group">
               <div className="h-64 overflow-hidden mb-4">
                 <img 
                   src="https://images.unsplash.com/photo-1634626857321-deb416dcdb00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" 
                   alt="Calidad"
                   className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
                 />
               </div>
               <h3 className="text-2xl font-medium tracking-wide uppercase border-l-2 border-[#117837] pl-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                 Calidad
               </h3>
               <p className="text-black/60 font-light leading-relaxed pl-4.5">
                 Materiales nobles que envejecen con dignidad. Desde sedas italianas hasta lanas vírgenes, seleccionamos fibras que ofrecen una experiencia táctil superior.
               </p>
             </div>

             {/* Value 3 */}
             <div className="flex flex-col gap-6 group">
               <div className="h-64 overflow-hidden mb-4">
                 <img 
                   src="https://images.unsplash.com/photo-1737505599076-e6f35a78d1d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" 
                   alt="Vanguardia"
                   className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
                 />
               </div>
               <h3 className="text-2xl font-medium tracking-wide uppercase border-l-2 border-[#117837] pl-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                 Vanguardia
               </h3>
               <p className="text-black/60 font-light leading-relaxed pl-4.5">
                 Miramos al futuro respetando el pasado. Innovamos en técnicas de patronaje para reducir residuos y maximizar la funcionalidad de cada prenda.
               </p>
             </div>

           </div>
        </div>
      </section>

      {/* ── THE ATELIER ──────────────────────────────── */}
      <section className="relative py-32 md:py-48">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
            alt="Atelier" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </div>
        
        <div className="relative z-10 px-6 md:px-14 lg:px-20 max-w-[1600px] mx-auto flex items-center justify-center h-full text-center">
          <div className="max-w-4xl">
            <p className="text-sm md:text-base tracking-[0.3em] text-white/60 uppercase mb-8">
              Desde el Atelier
            </p>
            <blockquote 
              className="text-3xl md:text-5xl lg:text-6xl font-normal text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "La perfección no es cuando no hay nada más que añadir, sino cuando no hay nada más que quitar."
            </blockquote>
            <p className="mt-8 text-white/80 font-light italic text-lg">
              — Antoine de Saint-Exupéry
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER TEASER ────────────────────────────── */}
      <section className="py-24 px-6 text-center bg-white">
        <h2 
           className="text-4xl md:text-6xl mb-8 font-normal"
           style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Únete al movimiento.
        </h2>
        <Link 
          to="/colecciones" 
          className="inline-block border-b border-black pb-1 text-sm tracking-[0.2em] uppercase hover:text-[#117837] hover:border-[#117837] transition-colors"
        >
          Explorar Colección
        </Link>
      </section>

    </div>
  );
}
