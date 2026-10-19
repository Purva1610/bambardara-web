import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import EstateImage from '../shared/EstateImage';
import Reveal from '../shared/Reveal';

export default function BoatingAbout() {
  return (
    <section id="about-boating" className="relative bg-ivory-white px-6 py-20 sm:py-28 md:py-32 md:px-10">
      <div className="mx-auto max-w-editorial">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT: THREE-IMAGE MOSAIC WITH FLOATING STAT BADGES
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="grid grid-cols-12 gap-4 sm:gap-6 items-stretch">
                {/* Left Stack (Top square + Bottom rectangle) */}
                <div className="col-span-6 flex flex-col justify-between gap-4 sm:gap-6">
                  {/* Top Photo with Floating Badge */}
                  <div className="relative group overflow-hidden border border-stone/50 bg-stone/20 shadow-soft">
                    {/* Floating Stat Badge 1 (Top Left) */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 border border-stone/40 bg-white/95 px-4 py-2.5 sm:px-5 sm:py-3 shadow-luxury backdrop-blur-sm">
                      <div className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-dark-charcoal leading-none">
                        100+
                      </div>
                      <div className="mt-1 font-body text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-wider text-light-charcoal">
                        Motor &amp; Pedal Boats
                      </div>
                    </div>

                    <div className="aspect-square w-full overflow-hidden">
                      <EstateImage
                        slug="boat"
                        alt="High speed motorboat cutting through crystal waters"
                        className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Bottom Photo */}
                  <div className="relative group overflow-hidden border border-stone/50 bg-stone/20 shadow-soft">
                    <div className="aspect-[16/11] w-full overflow-hidden">
                      <EstateImage
                        slug="boating-3"
                        alt="Speedboat ride across open lake waters"
                        className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Stack (Tall portrait photo with overlapping Badge) */}
                <div className="col-span-6 relative flex flex-col">
                  <div className="relative group h-full w-full overflow-hidden border border-stone/50 bg-stone/20 shadow-soft">
                    <EstateImage
                      slug="boating-2"
                      alt="Scenic sailboat and cruise across Sahyadri Lake"
                      className="h-full w-full object-cover min-h-[340px] sm:min-h-[460px] transition-transform duration-700 ease-luxe group-hover:scale-105"
                    />

                    {/* Floating Stat Badge 2 (Bottom Left overlapping) */}
                    <div className="absolute bottom-4 left-3 sm:bottom-6 sm:-left-4 z-20 border border-stone/40 bg-white/95 px-4 py-2.5 sm:px-5 sm:py-3 shadow-luxury backdrop-blur-sm">
                      <div className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-dark-charcoal leading-none">
                        300+
                      </div>
                      <div className="mt-1 font-body text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-wider text-light-charcoal">
                        Safe Voyages Daily
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT: EDITORIAL CONTENT & CHECKLIST (MATCHING REFERENCE)
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 lg:pl-6 flex flex-col justify-center">
            <Reveal delay={150}>
              {/* Rounded Kicker Pill */}
              <div className="inline-block">
                <span className="inline-flex items-center rounded-full border border-dark-charcoal/30 bg-ivory-white px-4 py-1.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-dark-charcoal shadow-soft">
                  About Us
                </span>
              </div>

              {/* Bold Uppercase Luxury Headline */}
              <h2 className="mt-5 font-heading text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wide text-dark-charcoal leading-[1.15]">
                WE CURATE &amp; RESERVE
                <span className="block font-medium text-dark-charcoal mt-1">
                  THE BOAT OF YOUR DREAMS
                </span>
              </h2>

              {/* Editorial Description */}
              <p className="mt-5 font-body text-sm sm:text-base font-light leading-relaxed text-light-charcoal">
                We offer an exclusive selection of lake boat rides for leisure, romance, and thrill —
                guaranteeing unforgettable aquatic adventures, pristine mountain scenery, and certified
                European safety standards across Bambardara Lake.
              </p>

              {/* 3 Checkmark Features */}
              <ul className="mt-7 space-y-3.5 font-body text-xs sm:text-sm font-light text-dark-charcoal">
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-green/10 text-forest-green flex-shrink-0">
                    <FaCheck className="h-2.5 w-2.5" />
                  </span>
                  <span>Breathtaking lake cruises &amp; panoramic mountain vistas</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-green/10 text-forest-green flex-shrink-0">
                    <FaCheck className="h-2.5 w-2.5" />
                  </span>
                  <span>Premium pedal, speed &amp; safari watercraft fleet</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-green/10 text-forest-green flex-shrink-0">
                    <FaCheck className="h-2.5 w-2.5" />
                  </span>
                  <span>Certified safety gear with trained rescue captains</span>
                </li>
              </ul>

              {/* Dark Rounded Pill CTA Button (Exact Reference Match) */}
              <div className="mt-9 flex items-center gap-4">
                <Link
                  to="/enquire"
                  className="group inline-flex items-center gap-3 rounded-full bg-deep-forest px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-ivory-white shadow-luxury transition-all duration-300 hover:bg-forest-green hover:shadow-luxury-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Reserve A Ride</span>
                  <span
                    className="text-base transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
