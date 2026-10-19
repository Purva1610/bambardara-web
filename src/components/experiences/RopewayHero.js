import React from 'react';

/**
 * RopewayHero Component
 * 
 * Styled with authentic high-resolution imagery and Bambardara's luxury palette:
 * - Real scenic ropeway photograph (opt/ropeway-hero.jpg / .webp)
 * - Forest Green (#0B5D3A) & Deep Forest (#062018)
 * - Luxury Gold (#D4AF37) & Rich Gold (#E5C158)
 * - Ivory White (#FFFBF5) & Champagne (#F7E7CE)
 * 
 * Clean, full-bleed scenic layout:
 * - Full photographic backdrop with real steel tower & cable car cabins
 * - Brand contrast vignette overlays for crisp typography legibility
 * - Bold split title with luxury vertical gold separator line
 * - Editorial Sahyadri aerial description
 */
export default function RopewayHero() {
  return (
    <section
      id="ropeway-hero"
      className="relative w-full min-h-[640px] md:min-h-[720px] lg:h-[90vh] lg:min-h-[740px] max-h-[1000px] overflow-hidden select-none bg-[#062018] text-ivory-white flex flex-col justify-center pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. REAL ROPEWAY SCENIC BACKGROUND IMAGE (OPT/ROPEWAY-HERO.JPG)
          ───────────────────────────────────────────────────────────── */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source
          srcSet={`${process.env.PUBLIC_URL}/images/opt/ropeway-hero.webp`}
          type="image/webp"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/opt/ropeway-hero.jpg`}
          alt="Bambardara Scenic Aerial Ropeway Ride"
          className="w-full h-full object-cover object-[62%_25%] sm:object-[65%_30%] md:object-center select-none"
          fetchPriority="high"
          loading="eager"
        />
      </picture>

      {/* ─────────────────────────────────────────────────────────────
          2. ATMOSPHERIC LUXURY BRAND OVERLAYS (FOR OPTIMAL CONTRAST)
          ───────────────────────────────────────────────────────────── */}
      {/* Top Header Dark Gradient (ensures global navigation bar is crisp) */}
      <div
        className="absolute inset-x-0 top-0 h-44 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(6, 32, 24, 0.94) 0%, rgba(6, 32, 24, 0.65) 50%, transparent 100%)',
        }}
      />

      {/* Left Typography Vignette (ensures text pops with rich contrast) */}
      <div
        className="absolute inset-y-0 left-0 w-full sm:w-4/5 lg:w-[65%] xl:w-[58%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(6, 32, 24, 0.96) 0%, rgba(6, 32, 24, 0.88) 45%, rgba(10, 46, 36, 0.5) 75%, transparent 100%)',
        }}
      />

      {/* Bottom Fade Gradient for smooth transition to the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(6, 32, 24, 0.95) 0%, rgba(6, 32, 24, 0.4) 60%, transparent 100%)',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN HERO CONTENT BLOCK
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 sm:px-12 lg:px-16 flex flex-col justify-center my-auto">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left">
          
          {/* Main Title */}
          <div className="flex flex-col font-sans font-black tracking-tight leading-[0.9] text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-ivory-white drop-shadow-2xl">
            <span>ROPEWAY</span>
            <span>AERIAL</span>
            <span>RIDE</span>
            <span className="font-extrabold tracking-tighter text-luxury-gold drop-shadow-md">360°</span>
          </div>

          {/* Editorial Ropeway Description */}
          <p className="mt-6 sm:mt-8 font-body text-xs sm:text-sm md:text-base font-light leading-relaxed text-ivory-white/95 max-w-xl drop-shadow-md">
            Glide silently across a 1.2 KM aerial cableway soaring high above the mist-cloaked Sahyadri canopy,
            tranquil lake waters, and lush Western Ghats valleys. Engineered to European safety standards, our
            8-passenger observation cabins offer an unforgettable 360° panoramic voyage across Maharashtra&rsquo;s
            scenic nature reserve.
          </p>

        </div>
      </div>
    </section>
  );
}
