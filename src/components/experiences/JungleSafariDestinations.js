import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiX, FiCheck } from 'react-icons/fi';

const DESTINATIONS = [
  {
    id: 'cheetah-plains',
    country: 'Cheetah Plains',
    title: 'Cheetah Plains',
    tagline: 'Open Grasslands & Savannah Track',
    desc: 'Witness magnificent cheetahs across open grassland plains, observing their incredible speed, grace, and playful cubs in a protected natural habitat.',
    image: `${process.env.PUBLIC_URL}/images/opt/safari-tanzania.webp`,
    fallback: `${process.env.PUBLIC_URL}/images/opt/safari-tanzania.jpg`,
    alt: 'Cheetah and cubs on the open grassland plains at Bambarddara Jungle Safari',
    wildlife: ['Cheetahs & Cubs', 'Grassland Predators', 'Spotted Deer', 'Rare Birds'],
    duration: '2 - 3 Hours',
    bestSeason: 'October – May',
  },
  {
    id: 'giraffe-valley',
    country: 'Giraffe Valley',
    title: 'Giraffe Valley',
    tagline: 'Canopy Woodlands & Acacia Trail',
    desc: 'Experience peaceful encounters with towering giraffes moving gracefully through lush tree canopies and scenic valley corridors.',
    image: `${process.env.PUBLIC_URL}/images/opt/safari-kenya.webp`,
    fallback: `${process.env.PUBLIC_URL}/images/opt/safari-kenya.jpg`,
    alt: 'Majestic giraffe peering amidst acacia branches at Bambarddara Jungle Safari',
    wildlife: ['Towering Giraffes', 'Canopy Grazers', 'Peacocks & Hornbills', 'Herbivore Herds'],
    duration: '2 - 3 Hours',
    bestSeason: 'Year Round',
  },
  {
    id: 'elephant-corridor',
    country: 'Elephant Corridor',
    title: 'Elephant Corridor',
    tagline: 'Waterhole Trail & Dense Forest',
    desc: 'Explore scenic sanctuary paths where majestic tusker elephants gather around natural waterholes, river crossings, and lush forest groves.',
    image: `${process.env.PUBLIC_URL}/images/opt/safari-uganda.webp`,
    fallback: `${process.env.PUBLIC_URL}/images/opt/safari-uganda.jpg`,
    alt: 'Colossal tusker elephant in lush greenery at Bambarddara Jungle Safari',
    wildlife: ['Tusker Elephants', 'Waterhole Grazers', 'Forest Wildlife', 'River Birds'],
    duration: '3 - 4 Hours',
    bestSeason: 'October – June',
  },
  {
    id: 'lion-kingdom',
    country: 'Lion Kingdom',
    title: 'Lion Kingdom',
    tagline: 'Ridge Lookout & Pride Territory',
    desc: 'Venture into the heart of the sanctuary where royal lion prides rest atop scenic rocky bluffs and river ravines during golden hour.',
    image: `${process.env.PUBLIC_URL}/images/opt/jungle-hero.webp`,
    fallback: `${process.env.PUBLIC_URL}/images/opt/jungle-hero.jpg`,
    alt: 'Majestic lion overlooking pristine wilderness at Bambarddara Jungle Safari',
    wildlife: ['Lion Prides', 'Pride Lookouts', 'Apex Trackers', 'Sunset Safari'],
    duration: '3 - 4 Hours',
    bestSeason: 'October – May',
  },
];

export default function JungleSafariDestinations() {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const total = DESTINATIONS.length;

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  // The 3 currently visible destinations (left, center/featured, right)
  const visibleDestinations = [
    DESTINATIONS[startIndex % total],
    DESTINATIONS[(startIndex + 1) % total],
    DESTINATIONS[(startIndex + 2) % total],
  ];

  return (
    <section
      id="safari-overview"
      className="relative w-full bg-[#082015] py-20 sm:py-28 md:py-32 px-6 sm:px-10 lg:px-14 overflow-hidden select-none"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 20%, rgba(16, 56, 38, 0.55) 0%, rgba(8, 32, 21, 0.98) 85%)',
      }}
    >
      {/* Subtle organic background glow accents */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── TOP HEADER SECTION (Exact Reference Design) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 pb-14 sm:pb-20">
          {/* Left Column: Serif Heading + Explore Now Link */}
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.1rem] font-normal text-white leading-[1.08] tracking-tight">
              Embark on a Journey<br />
              of a Lifetime
            </h2>

            <div className="mt-6 sm:mt-7">
              <a
                href="#safari-destinations-cards"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('safari-destinations-cards');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-3 text-white/90 hover:text-white font-body text-sm sm:text-base tracking-wide transition-colors"
              >
                <span className="font-medium tracking-wide">Explore Now</span>
                <span className="inline-flex items-center text-amber-300 transition-transform duration-300 group-hover:translate-x-2">
                  <span className="w-10 sm:w-14 h-[1.5px] bg-amber-300 inline-block" />
                  <span className="text-sm font-bold -ml-1">❯</span>
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="max-w-md md:pb-2">
            <p className="font-body text-xs sm:text-sm md:text-base text-white/80 font-light leading-relaxed">
              Explore the untamed beauty of Bambarddara with our guided wildlife tours.
              Whether you&apos;re seeking the thrill of a safari adventure or the
              tranquility of a nature retreat, we offer experiences that cater to
              every traveler&apos;s dream.
            </p>
          </div>
        </div>

        {/* ── CAROUSEL / DESTINATIONS SHOWCASE AREA ── */}
        <div id="safari-destinations-cards" className="relative flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous destination"
            className="absolute -left-2 sm:-left-5 lg:-left-7 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/25 bg-[#0b2b1d]/85 hover:bg-[#12422d] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-xs focus:outline-none"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* 3 Cards Container */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-end">
            {visibleDestinations.map((dest, idx) => {
              const isCenter = idx === 1; // Center card (Kenya) is taller / elevated!
              return (
                <div
                  key={`${dest.id}-${idx}`}
                  onClick={() => setSelectedDestination(dest)}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${
                    isCenter
                      ? 'aspect-[3/4.5] md:-translate-y-6 lg:-translate-y-8 ring-1 ring-white/30 hover:ring-white/60'
                      : 'aspect-[3/4.1] ring-1 ring-white/15 hover:ring-white/40'
                  }`}
                >
                  {/* Background Wildlife Photograph */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                    <picture className="block w-full h-full">
                      <source srcSet={dest.image} type="image/webp" />
                      <img
                        src={dest.fallback}
                        alt={dest.alt}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </picture>
                  </div>

                  {/* Contrast Gradient for Centered Typography & Button */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0.05) 80%, transparent 100%)',
                    }}
                  />

                  {/* Subtle Top Ambient Gradient */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />

                  {/* Centered Bottom Content: Title & Pill "Explore" Button */}
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-end p-6 sm:p-7 text-center text-white pb-7 sm:pb-9">
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide text-white group-hover:text-amber-100 transition-colors drop-shadow-md">
                      {dest.country}
                    </h3>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDestination(dest);
                      }}
                      className="mt-3.5 sm:mt-4 px-6 sm:px-7 py-1.5 sm:py-2 rounded-full border border-white/65 hover:border-white hover:bg-white/20 text-white font-body text-xs sm:text-sm font-light tracking-wide transition-all duration-300 backdrop-blur-xs"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next destination"
            className="absolute -right-2 sm:-right-5 lg:-right-7 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/25 bg-[#0b2b1d]/85 hover:bg-[#12422d] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-xs focus:outline-none"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* ── EXPANDED DESTINATION MODAL (Rich Interactive Details) ── */}
      {selectedDestination && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="relative w-full max-w-xl bg-[#092218] border border-white/20 rounded-2xl overflow-hidden shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={selectedDestination.fallback}
                alt={selectedDestination.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092218] via-black/40 to-black/20" />

              <button
                type="button"
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-ivory-white hover:text-black text-white flex items-center justify-center transition-all focus:outline-none"
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>

              <div className="absolute bottom-4 left-6">
                <span className="text-[0.68rem] font-body uppercase tracking-[0.25em] text-amber-300 font-semibold block">
                  {selectedDestination.tagline}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white mt-1">
                  {selectedDestination.country}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-5 font-body">
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
                {selectedDestination.desc}
              </p>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-amber-300/90 font-semibold mb-2.5">
                  Wildlife Spotting Highlights
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
                  {selectedDestination.wildlife.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <FiCheck className="text-amber-300 shrink-0" size={14} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10 text-xs text-white/70">
                <div>
                  <span className="block text-[0.68rem] uppercase tracking-wider text-white/50">
                    Recommended Duration
                  </span>
                  <span className="text-white font-medium text-sm mt-0.5 block">
                    {selectedDestination.duration}
                  </span>
                </div>
                <div>
                  <span className="block text-[0.68rem] uppercase tracking-wider text-white/50">
                    Best Travel Season
                  </span>
                  <span className="text-white font-medium text-sm mt-0.5 block">
                    {selectedDestination.bestSeason}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedDestination(null)}
                  className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white text-xs font-medium uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
                <Link
                  to={`/enquire?destination=${selectedDestination.id}`}
                  className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Book This Safari
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
