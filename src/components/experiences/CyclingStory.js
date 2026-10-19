import React from 'react';
import Reveal from '../shared/Reveal';

export default function CyclingStory() {
  return (
    <section
      id="why-we-ride"
      className="relative w-full bg-ivory-white text-dark-charcoal py-16 sm:py-20 md:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden select-none border-b border-stone/40"
    >
      {/* ── TOPOGRAPHIC CONTOUR LINES BACKGROUND TEXTURE ── */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06] text-forest-green"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M-100,80 Q200,20 600,140 T1400,60 T2000,180"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M-100,140 Q250,90 650,210 T1450,130 T2000,240"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M-100,200 Q300,160 700,280 T1500,200 T2000,310"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M-100,260 Q350,230 750,350 T1550,270 T2000,380"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M-100,340 Q400,310 800,430 T1600,350 T2000,460"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M-100,420 Q450,390 850,510 T1650,430 T2000,540"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── LEFT COLUMN (6 cols): Editorial Story + Landscape Overlook Photo ── */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8 sm:space-y-10">
            {/* Editorial Story */}
            <Reveal>
              <div className="max-w-xl">
                <h2 className="font-heading font-medium tracking-[0.02em] text-forest-green text-3xl sm:text-4xl md:text-[3.1rem] uppercase leading-none">
                  WHY WE RIDE
                </h2>

                <div className="mt-5 sm:mt-6 space-y-4 font-body text-xs sm:text-[0.84rem] md:text-[0.9rem] text-light-charcoal font-light leading-relaxed">
                  <p>
                    We are a technology and performance-driven company but advancing
                    technology is not why we're here. We never want to lose sight of what we do
                    and why we do it. Our goal is simply to build the best-performing cycling
                    products in the world.
                  </p>
                  <p>
                    It's our vision, our calling and our ultimate goal to design and build
                    cutting edge bikes that take your cycling experience to a whole new level
                    and do it in a way that provides you with the best possible riding
                    experience.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Bottom-Left Overlook Landscape Photo */}
            <Reveal delay={120}>
              <div className="relative rounded-sm overflow-hidden border border-stone/40 shadow-md group aspect-[16/7] sm:aspect-[16/6.5]">
                <picture className="w-full h-full block">
                  <source
                    srcSet={`${process.env.PUBLIC_URL}/images/opt/cyclee.webp`}
                    type="image/webp"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/images/opt/cyclee.jpg`}
                    alt="Road cycling race peloton at Bambardara Estate scenic course"
                    className="w-full h-full object-cover object-[center_40%] transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-[0.68rem] font-body uppercase tracking-wider">
                  <span>Bambardara High Ridge Course</span>
                  <span className="text-luxury-gold">Elev. +840m</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT COLUMN (6 cols): Downhill Action Photo + Switchblade Showcase ── */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8 sm:space-y-10">
            {/* Top-Right Action Photo */}
            <Reveal delay={80}>
              <div className="relative rounded-sm overflow-hidden border border-stone/40 shadow-md group aspect-[16/10] sm:aspect-[16/9.5]">
                <picture className="w-full h-full block">
                  <source
                    srcSet={`${process.env.PUBLIC_URL}/images/opt/cycle.webp`}
                    type="image/webp"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/images/opt/cycle.jpg`}
                    alt="Cyclists in high performance endurance road race circuit"
                    className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[0.65rem] font-body uppercase tracking-widest text-luxury-gold block font-semibold">
                      Active Field Testing
                    </span>
                    <span className="font-heading font-medium text-base sm:text-lg tracking-wide uppercase text-white">
                      High-Performance Road Circuit
                    </span>
                  </div>
                  <span className="text-xs font-body font-medium bg-white/20 backdrop-blur-md px-2.5 py-1 rounded text-white">
                    Pro Fleet &amp; Speed
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Bottom-Right Showcase Card: SWITCHBLADE */}
            <Reveal delay={160}>
              <div className="bg-warm-sand/40 border border-stone/40 rounded-sm p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-medium tracking-wide text-xl sm:text-2xl text-dark-charcoal uppercase">
                        SWITCHBLADE
                      </h3>
                      <span className="text-[0.62rem] font-bold font-body tracking-widest uppercase text-forest-green border border-forest-green/40 bg-forest-green/10 px-1.5 py-0.5 rounded">
                        29" / PRO
                      </span>
                    </div>
                    <p className="font-body text-xs text-light-charcoal mt-1 max-w-sm">
                      Purpose-built to meet the demands of aggressive all-mountain terrain with seamless pedal efficiency.
                    </p>
                  </div>

                  <a
                    href="#reserve"
                    className="self-start sm:self-center shrink-0 bg-forest-green hover:bg-dark-charcoal text-white font-body font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-all transform hover:scale-105 active:scale-95 shadow"
                  >
                    EXPLORE SPECS &rarr;
                  </a>
                </div>

                {/* Bike Profile Visual */}
                <div className="mt-4 pt-4 border-t border-stone/30 flex items-center justify-between text-[0.7rem] font-body text-light-charcoal uppercase tracking-wider">
                  <span>Carbon Frame</span>
                  <span className="text-stone">•</span>
                  <span>Fox 36 Factory</span>
                  <span className="text-stone">•</span>
                  <span>SRAM X01 Eagle</span>
                  <span className="text-stone">•</span>
                  <span>Maxxis Minion DHF</span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
