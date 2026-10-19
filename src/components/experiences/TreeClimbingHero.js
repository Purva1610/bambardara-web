import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

export const TREE_SPECIES = [
  {
    id: 'heritage-teak',
    scientificName: 'BAMBARDDARA CANOPY ADVENTURE',
    commonName: 'Tree Top Climbing',
    description:
      'Scale our towering ancient teak giants using professional arborist harnesses, rope ascenders, and 100% redundant dual-line belays. Ascend into the upper canopy to reach scenic observation stations with panoramic 360° views across the Sahyadri mountains.',
    canopyHeight: '40 Meters',
    climbTier: 'All Skill Levels (Ages 8+)',
    barkType: 'High-Canopy Observation Deck',
    image: '/images/opt/tree-climb-hero-1280.jpg',
  },
  {
    id: 'silver-oak',
    scientificName: 'BEGINNER & FAMILY CANOPY ASCENT',
    commonName: 'Silver Oak Climb',
    description:
      'A gentle, structured tree climbing experience utilizing natural sturdy branch footholds and assisted ascension lines. Ideal for beginners, children, and families looking to experience the pure joy of climbing high into the forest canopy.',
    canopyHeight: '35 Meters',
    climbTier: 'Beginner & Family Friendly',
    barkType: 'Step-By-Step Assisted Lines',
    image: '/images/opt/tree-climb-hero-1280.jpg',
  },
  {
    id: 'sacred-banyan',
    scientificName: 'NATURAL CATHEDRAL IMMERSION',
    commonName: 'Ancient Banyan Labyrinth',
    description:
      'Climb through a sprawling natural labyrinth of massive aerial prop roots into a cathedral of horizontal boughs. Reach our elevated treetop hammocks for unforgettable resting and photography surrounded by nature.',
    canopyHeight: '28 Meters',
    climbTier: 'Exploratory & Leisure',
    barkType: 'Elevated Treetop Hammock Station',
    image: '/images/opt/tree-climb-hero-1280.jpg',
  },
  {
    id: 'pine-challenge',
    scientificName: 'ATHLETIC VERTICAL TECHNIQUE',
    commonName: 'Wild Pine Ascent',
    description:
      'A thrilling vertical ascension that tests your climbing rhythm and body positioning along dense bark ridges. Certified arborist instructors guide every pull and lock-off, rewarding you with an open-air valley summit lookout.',
    canopyHeight: '35 Meters',
    climbTier: 'Intermediate to Athletic',
    barkType: 'Valley-Facing Canopy Lookout',
    image: '/images/opt/tree-climb-hero-1280.jpg',
  },
];

export default function TreeClimbingHero({ onChooseTree }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentTree = TREE_SPECIES[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % TREE_SPECIES.length);
  };

  const handleSelect = () => {
    if (onChooseTree) {
      onChooseTree(currentTree);
      return;
    }
    const target = document.getElementById('tree-booking');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="tree-hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden select-none bg-deep-forest"
    >
      {/* Background Image: Deep lush forest with arborist climber scaling giant tree on right */}
      <div className="absolute inset-0 z-0">
        <picture className="h-full w-full">
          <source
            media="(max-width: 640px)"
            srcSet={`${process.env.PUBLIC_URL}/images/opt/tree-climb-hero-640.webp`}
            type="image/webp"
          />
          <source
            media="(max-width: 1280px)"
            srcSet={`${process.env.PUBLIC_URL}/images/opt/tree-climb-hero-1280.webp`}
            type="image/webp"
          />
          <source
            srcSet={`${process.env.PUBLIC_URL}/images/opt/tree-climb-hero-1920.webp`}
            type="image/webp"
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/opt/tree-climb-hero-1280.jpg`}
            alt={`${currentTree.commonName} - Tree Climbing at Bambarddara`}
            className="h-full w-full object-cover object-right sm:object-[78%_center] md:object-right transition-opacity duration-700 ease-out"
            fetchPriority="high"
            loading="eager"
          />
        </picture>

        {/* Ambient Dark Green Vignette & Gradient Overlays to preserve negative space for typography */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(6, 32, 24, 0.94) 0%, rgba(6, 32, 24, 0.8) 35%, rgba(6, 32, 24, 0.45) 55%, rgba(6, 32, 24, 0.15) 75%, transparent 100%)',
          }}
        />

        {/* Top Header Fade for seamless nav integration */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />

        {/* Bottom Ambient Transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-deep-forest to-transparent pointer-events-none" />
      </div>

      {/* Main Content Container matching reference screenshot */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 py-24 sm:py-32">
        <div className="max-w-xl">
          {/* Scientific Botanical Kicker */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="font-body text-[0.72rem] sm:text-xs font-semibold uppercase tracking-[0.26em] text-luxury-gold drop-shadow-sm transition-all duration-300">
              {currentTree.scientificName}
            </span>
          </div>

          {/* Large Hero Title */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tight leading-[1.05] drop-shadow-md transition-all duration-300">
            {currentTree.commonName}
          </h1>

          {/* Description Paragraph */}
          <p className="mt-4 sm:mt-6 font-body text-sm sm:text-base md:text-[1.05rem] font-light text-white/85 leading-relaxed max-w-lg drop-shadow-sm transition-all duration-300">
            {currentTree.description}
          </p>

          {/* Interactive Button Row: 'Book This Climb' and 'Next Route >' */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-7">
            {/* Primary Action Button: 'Book This Climb' */}
            <button
              type="button"
              onClick={handleSelect}
              className="inline-flex items-center justify-center rounded-lg bg-forest-green hover:bg-forest-green/90 active:bg-deep-forest text-white px-7 sm:px-8 py-3.5 sm:py-4 font-body text-sm sm:text-[0.95rem] font-medium tracking-wide shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Book This Climb
            </button>

            {/* Secondary Interactive Trigger: 'Next Route >' */}
            <button
              type="button"
              onClick={handleNext}
              className="group inline-flex items-center gap-3 text-white/90 hover:text-white font-body text-sm sm:text-[0.95rem] font-medium tracking-wide transition-colors cursor-pointer py-2"
            >
              <span className="underline-offset-4 group-hover:underline">Next Route</span>
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-green/80 text-white transition-all duration-300 group-hover:bg-forest-green group-hover:translate-x-1 shadow-md"
                aria-hidden="true"
              >
                <FiChevronRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </button>
          </div>

          {/* Quick Species Indicator Bar */}
          <div className="mt-12 pt-6 border-t border-white/15 flex items-center gap-4 text-xs text-white/60 font-body">
            <span>Canopy: <strong className="text-white/90 font-medium">{currentTree.canopyHeight}</strong></span>
            <span>•</span>
            <span>Skill Level: <strong className="text-white/90 font-medium">{currentTree.climbTier}</strong></span>
            <span>•</span>
            <div className="flex items-center gap-1.5 ml-auto">
              {TREE_SPECIES.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIdx(i)}
                  aria-label={`Select ${t.commonName}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIdx ? 'w-6 bg-luxury-gold' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
