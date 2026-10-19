import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const FEATURES = [
  {
    id: 'what-is-club',
    title: 'What is Paintball Club?',
    shortDesc:
      'It began long ago but officially became a recognized club in 2012. It was formed with the aim to bring paintballers within our area of all age',
    fullDesc:
      'It began long ago but officially became a recognized club in 2012. It was formed with the aim to bring paintballers within our area of all ages and skill levels together. Today, Bambardara Tactical Club hosts weekly woodland skirmishes, regional team championships, and beginner-friendly drills across our natural 79-acre estate.',
    icon: (
      /* Paintball Full-Face Mask & Goggles Vector */
      <svg
        viewBox="0 0 80 80"
        className="w-16 h-16 sm:w-20 sm:h-20 text-forest-green transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Helmet / Forehead Visor Peak */}
        <path
          d="M26 30 C26 18 54 18 54 30"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M23 26 C28 21 52 21 57 26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Dual Lens Goggle System */}
        <path
          d="M22 34 C22 28 38 28 40 33 C42 28 58 28 58 34 C58 41 42 43 40 37 C38 43 22 41 22 34 Z"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="#f8fafc"
        />
        {/* Head Strap Bands */}
        <path d="M22 33 L14 36 M58 33 L66 36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        {/* Lower Face Mask Guard */}
        <path
          d="M24 37 C23 48 30 62 40 65 C50 62 57 48 56 37"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="#ffffff"
        />
        {/* Mouth Ventilation Grill Slots */}
        <line x1="33" y1="46" x2="47" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="51" x2="46" y2="51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="36" y1="56" x2="44" y2="56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Cheek Air Slits */}
        <line x1="28" y1="43" x2="31" y2="46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="52" y1="43" x2="49" y2="46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'play-with-us',
    title: 'Play Paintball With Us',
    shortDesc:
      "You don't need to become a member to play with us, but if its your first game with us, there's a few things you need to know.",
    fullDesc:
      "You don't need to become a member to play with us, but if its your first game with us, there's a few things you need to know. We provide complete tournament-grade safety equipment, Tippmann Cronus markers, anti-fog masks, and camo boiler suits. Certified safety marshals give a comprehensive brief before every match.",
    icon: (
      /* Paint Splatter with 3 Paintballs Vector */
      <svg
        viewBox="0 0 80 80"
        className="w-16 h-16 sm:w-20 sm:h-20 text-forest-green transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Splatter Backdrop */}
        <path
          d="M32 18 C30 22 24 22 23 26 C22 30 27 34 25 38 C23 42 32 44 34 47 C36 50 42 48 46 51 C50 54 53 48 57 47 C61 46 63 39 59 36 C55 33 60 27 56 24 C52 21 48 25 43 21 C38 17 34 14 32 18 Z"
          fill="#cbd5e1"
          opacity="0.85"
        />
        {/* Splash Droplets */}
        <circle cx="20" cy="22" r="2.2" fill="#94a3b8" />
        <circle cx="61" cy="22" r="2.5" fill="#94a3b8" />
        <circle cx="56" cy="15" r="1.8" fill="#94a3b8" />
        <circle cx="27" cy="14" r="1.5" fill="#94a3b8" />
        {/* Paintball 1 (Top) */}
        <circle cx="41" cy="36" r="9" fill="#ffffff" stroke="currentColor" strokeWidth="2.5" />
        <path d="M37 32 A 4 4 0 0 1 42 30" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        {/* Paintball 2 (Bottom Left) */}
        <circle cx="34" cy="50" r="9" fill="#ffffff" stroke="currentColor" strokeWidth="2.5" />
        <path d="M30 46 A 4 4 0 0 1 35 44" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        {/* Paintball 3 (Bottom Right) */}
        <circle cx="50" cy="49" r="9" fill="#ffffff" stroke="currentColor" strokeWidth="2.5" />
        <path d="M46 45 A 4 4 0 0 1 51 43" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'game-calendar',
    title: 'Our Game Calendar',
    shortDesc:
      'Our members meet up regularly to play the game of paintball. Our gameday is on Sunday and is usually twice a week just for',
    fullDesc:
      'Our members meet up regularly to play the game of paintball. Our gameday is on Sunday and is usually twice a week just for friendly squad warfare, tournament qualifiers, and night battle events with illuminated flare targets and tactical smoke.',
    icon: (
      /* Crossed Battle Flags Vector */
      <svg
        viewBox="0 0 80 80"
        className="w-16 h-16 sm:w-20 sm:h-20 text-forest-green transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crossed Flag Poles */}
        <line x1="22" y1="62" x2="58" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="58" y1="62" x2="22" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* Pole Spear Finials */}
        <polygon points="22,22 19,25 25,25" fill="currentColor" />
        <polygon points="58,22 55,25 61,25" fill="currentColor" />
        {/* Left Flag Pennant */}
        <path
          d="M24 25 C34 26 36 33 46 31 L41 42 C32 44 30 37 28 37 Z"
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Right Flag Pennant */}
        <path
          d="M56 25 C46 26 44 33 34 31 L39 42 C48 44 50 37 52 37 Z"
          fill="#f1f5f9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'become-member',
    title: 'Become a Member',
    shortDesc:
      "Becoming an official paid member of us really helps the club grow and without new members, the club wouldn't survive! You do not",
    fullDesc:
      "Becoming an official paid member of us really helps the club grow and without new members, the club wouldn't survive! You do not need to be a pro—membership gives you 25% discounted ammo reloads, free access to weekly league games, exclusive gear storage lockers, and priority booking on newly added battlefields.",
    icon: (
      /* Tactical Armor Vest Plate Carrier Vector */
      <svg
        viewBox="0 0 80 80"
        className="w-16 h-16 sm:w-20 sm:h-20 text-forest-green transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Neck Opening */}
        <path d="M34 22 C34 28 46 28 46 22" stroke="currentColor" strokeWidth="2.5" fill="none" />
        {/* Shoulder Straps & Main Outer Body Armor */}
        <path
          d="M28 22 L34 22 C34 28 46 28 46 22 L52 22 C56 22 58 26 55 33 L57 42 C57 58 55 62 52 64 L28 64 C25 62 23 58 23 42 L25 33 C22 26 24 22 28 22 Z"
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Center MOLLE Plate Recess */}
        <rect x="30" y="34" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="1.8" fill="#f8fafc" />
        {/* Center Webbing Attachment Eyelets */}
        <circle cx="34" cy="40" r="1.5" fill="currentColor" />
        <circle cx="46" cy="40" r="1.5" fill="currentColor" />
        <circle cx="34" cy="46" r="1.5" fill="currentColor" />
        <circle cx="46" cy="46" r="1.5" fill="currentColor" />
        <circle cx="34" cy="52" r="1.5" fill="currentColor" />
        <circle cx="46" cy="52" r="1.5" fill="currentColor" />
        {/* Bottom Waist Cummerbund Straps */}
        <line x1="24" y1="58" x2="56" y2="58" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'photos-videos',
    title: 'Photos & Videos',
    shortDesc:
      'We rotate through around 10 different fields, both private and commercial. These photos show the club in action and should give you',
    fullDesc:
      'We rotate through around 10 different fields, both private and commercial. These photos show the club in action and should give you a taste of the natural woodland topography, bunker layouts, tactical towers, and squad battles we host every week.',
    icon: (
      /* Pine Woods / Forest with Flag Vector */
      <svg
        viewBox="0 0 80 80"
        className="w-16 h-16 sm:w-20 sm:h-20 text-forest-green transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Center Territory Flag on Ridge */}
        <line x1="48" y1="20" x2="48" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M48 20 C54 21 56 25 61 24 L61 31 C56 32 54 28 48 27 Z"
          fill="#cbd5e1"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        {/* Ground Line */}
        <line x1="22" y1="62" x2="58" y2="62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Pine Tree 1 (Left) */}
        <path
          d="M28 36 L24 43 H27 L23 50 H27 L22 57 H34 L29 50 H33 L29 43 H32 Z"
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="27" y="57" width="2" height="5" fill="currentColor" />
        {/* Pine Tree 2 (Center Big) */}
        <path
          d="M40 30 L35 38 H38 L33 46 H38 L32 55 H48 L42 46 H47 L42 38 H45 Z"
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="39" y="55" width="2" height="7" fill="currentColor" />
        {/* Pine Tree 3 (Right) */}
        <path
          d="M52 38 L48 45 H51 L47 52 H51 L46 58 H58 L53 52 H57 L53 45 H56 Z"
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="51" y="58" width="2" height="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'tshirt-shop',
    title: 'Our T-Shirt Shop',
    shortDesc:
      'Support your club and buy Paintball Club apparel! You can order via email if you prefer! Important Info: Please make payment before',
    fullDesc:
      'Support your club and buy Paintball Club apparel! You can order via email if you prefer! Important Info: Please make payment before match day to guarantee your size. We offer moisture-wicking combat jerseys, custom team name tags, hoodies, and high-traction tactical gloves.',
    icon: (
      /* Action Cam on Handheld Gimbal Stabilizer Vector */
      <svg
        viewBox="0 0 80 80"
        className="w-16 h-16 sm:w-20 sm:h-20 text-forest-green transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Action Camera Body */}
        <rect x="36" y="24" width="16" height="13" rx="2" fill="#ffffff" stroke="currentColor" strokeWidth="2.2" />
        {/* Camera Lens */}
        <circle cx="42" cy="30" r="3.2" stroke="currentColor" strokeWidth="1.8" fill="#e2e8f0" />
        {/* Top Recording Mic / Antenna */}
        <line x1="49" y1="24" x2="49" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* 3-Axis Gimbal Arm Bracket */}
        <path
          d="M32 29 C28 32 28 42 32 46 L37 46"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Gimbal Motor Roll Knobs */}
        <circle cx="37" cy="46" r="2.5" fill="currentColor" />
        {/* Gimbal Handle / Grip */}
        <rect x="35" y="48" width="5" height="16" rx="1.5" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
        {/* Grip Ridges */}
        <line x1="36" y1="52" x2="39" y2="52" stroke="currentColor" strokeWidth="1.2" />
        <line x1="36" y1="56" x2="39" y2="56" stroke="currentColor" strokeWidth="1.2" />
        <line x1="36" y1="60" x2="39" y2="60" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function PaintballFeatures() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section
      id="paintball-club-info"
      className="w-full bg-ivory-white border-b border-stone/40 py-20 sm:py-24 md:py-28 px-6 sm:px-10 select-none"
    >
      <div className="w-full max-w-6xl mx-auto">
        
        {/* ── SECTION HEADER (Matching reference title and subtitle exactly) ── */}
        <div className="text-center mb-14 sm:mb-16 md:mb-20">
          <h2 className="font-heading font-medium uppercase tracking-[0.04em] text-3xl sm:text-4xl md:text-[2.5rem] text-dark-charcoal leading-tight">
            LARGEST RECREATIONAL PAINTBALL CLUB
          </h2>
          <p className="font-body text-xs sm:text-sm text-light-charcoal mt-2 font-normal">
            Come and have some fun with us!
          </p>
        </div>

        {/* ── 6-FEATURE GRID (3 Columns × 2 Rows) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-12 sm:gap-y-16">
          {FEATURES.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col items-center text-center px-3 transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Centered Illustrated Icon */}
              <div className="flex items-center justify-center mb-4 sm:mb-5">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-heading font-normal text-xl sm:text-[1.35rem] text-dark-charcoal leading-snug">
                {item.title}
              </h3>

              {/* Description + Read More */}
              <p className="font-body text-[0.78rem] sm:text-xs md:text-[0.82rem] leading-relaxed text-light-charcoal mt-2.5 max-w-[290px]">
                {item.shortDesc}{' '}
                <button
                  type="button"
                  onClick={() => setSelectedFeature(item)}
                  className="font-bold text-dark-charcoal hover:text-forest-green transition-colors focus:outline-none underline decoration-transparent hover:decoration-current"
                >
                  ... Read More
                </button>
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ── INTERACTIVE MODAL FOR READ MORE ── */}
      {selectedFeature && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="relative w-full max-w-lg bg-ivory-white rounded-xl shadow-2xl p-6 sm:p-8 border border-stone/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-stone/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  {selectedFeature.icon}
                </div>
                <h4 className="font-heading font-medium text-2xl text-dark-charcoal">
                  {selectedFeature.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="text-light-charcoal hover:text-dark-charcoal p-1 rounded focus:outline-none"
                aria-label="Close details"
              >
                <FiX size={22} />
              </button>
            </div>

            <p className="font-body text-sm text-light-charcoal leading-relaxed mt-5">
              {selectedFeature.fullDesc}
            </p>

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="bg-forest-green hover:bg-dark-charcoal text-white font-body font-semibold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
