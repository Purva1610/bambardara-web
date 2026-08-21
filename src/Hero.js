import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import EstateImage from './components/EstateImage';

/* Landscape plates from the estate library, slowly cross-faded. */
const PLATES = [
  {
    slug: 'hero',
    alt: 'The Bambardara valley at first light',
    caption: 'The Valley',
  },
  {
    slug: 'resort-and-villas-3',
    alt: 'Villas set along the estate ridge',
    caption: 'The Villas',
  },
  {
    slug: 'waterfalls-and-nature-trails-2',
    alt: 'Waterfalls along the estate nature trails',
    caption: 'The Falls',
  },
];

const PLATE_DURATION = 7000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const schedule = useCallback(() => {
    window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(
      () => setActive((i) => (i + 1) % PLATES.length),
      PLATE_DURATION
    );
  }, []);

  useEffect(() => {
    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    schedule();
    return () => window.clearInterval(timerRef.current);
  }, [schedule]);

  const select = (index) => {
    setActive(index);
    schedule();
  };

  return (
    <section
      id="hero"
      className="min-h-viewport relative flex flex-col items-center justify-center overflow-hidden bg-deep-forest px-6 text-center"
    >
      {/* Cross-fading plates */}
      {PLATES.map((plate, i) => (
        <div
          key={plate.slug}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-luxe ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <EstateImage
            slug={plate.slug}
            alt={plate.alt}
            priority={i === 0}
            sizes="100vw"
            className={`h-full w-full object-cover ${
              i === active ? 'animate-ken-burns' : ''
            }`}
          />
        </div>
      ))}

      <div className="lux-scrim absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center pb-24 pt-28">
        <span className="lux-label animate-fade-up text-muted-gold opacity-0 [animation-delay:300ms]">
          Western Ghats &middot; Kolhapur, Maharashtra
        </span>

        <h1 className="mt-8 animate-fade-up text-display font-heading font-light text-ivory-white opacity-0 [animation-delay:520ms]">
          An estate where the land
          <span className="block italic text-muted-gold">still sets the hours</span>
        </h1>

        <span className="mt-10 h-px w-16 animate-fade-up bg-muted-gold/70 opacity-0 [animation-delay:760ms]" />

        <p className="mt-10 max-w-prose animate-fade-up font-body text-[0.95rem] font-light leading-[1.95] text-ivory-white/80 opacity-0 [animation-delay:900ms]">
          Bambardara is a working agro-tourism estate of forty-two acres — orchards
          and dairy, safari and waterfall trails, a meditation centre and an
          infinity pool above the valley. Farmed by day, and kept to the standards
          of a fine hotel by night.
        </p>

        <div className="mt-14 flex animate-fade-up flex-col items-center gap-5 opacity-0 [animation-delay:1080ms] sm:flex-row sm:gap-4">
          <a href="#stays" className="lux-btn-light">
            <span>Discover the Stays</span>
          </a>
          <Link to="/signup" className="lux-btn-light">
            <span>Reserve an Arrival</span>
          </Link>
        </div>
      </div>

      {/* Plate selector — thin rules, one per plate */}
      <div className="absolute bottom-12 left-0 right-0 z-10 flex items-center justify-center gap-4 px-6">
        {PLATES.map((plate, i) => (
          <button
            key={plate.slug}
            type="button"
            onClick={() => select(i)}
            aria-label={`View ${plate.caption}`}
            aria-current={i === active}
            className="group flex items-center gap-3 py-2"
          >
            <span
              className={`h-px transition-all duration-700 ease-luxe ${
                i === active
                  ? 'w-14 bg-muted-gold'
                  : 'w-7 bg-ivory-white/40 group-hover:bg-ivory-white/80'
              }`}
            />
            <span
              className={`font-body text-[0.625rem] uppercase tracking-label transition-colors duration-500 ${
                i === active ? 'text-muted-gold' : 'text-ivory-white/50'
              }`}
            >
              {plate.caption}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <span className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-16 w-px origin-bottom -translate-x-1/2 animate-scroll-hint bg-ivory-white/60" />
    </section>
  );
}
