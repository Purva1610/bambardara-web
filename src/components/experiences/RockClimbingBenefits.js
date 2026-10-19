import React from 'react';
import {
  FaPlay,
  FaMountain,
  FaHeartbeat,
  FaUsers,
  FaAward,
} from 'react-icons/fa';

const BENEFITS_LIST = [
  {
    id: 'training',
    title: 'Training Sessions',
    desc: 'Dedicated technique coaching covering balance, footwork placement, and certified lead belaying mastery.',
    icon: <FaMountain className="text-xl sm:text-2xl text-white" />,
  },
  {
    id: 'lifestyle',
    title: 'Active Lifestyle',
    desc: 'Enhance whole-body functional endurance, core stability, and mental clarity in pristine mountain air.',
    icon: <FaHeartbeat className="text-xl sm:text-2xl text-white" />,
  },
  {
    id: 'community',
    title: 'Climb Community',
    desc: 'Connect with passionate climbers through weekend crag meets, campfire debriefs, and alpine summits.',
    icon: <FaUsers className="text-xl sm:text-2xl text-white" />,
  },
  {
    id: 'exclusive',
    title: 'Exclusive Access',
    desc: 'Priority booking for golden-hour slots, complimentary Petzl gear rental privileges, and private guides.',
    icon: <FaAward className="text-xl sm:text-2xl text-white" />,
  },
];

export default function RockClimbingBenefits({ onLearnMoreClick }) {
  const handleLearnMore = () => {
    if (onLearnMoreClick) {
      onLearnMoreClick();
    } else {
      const el = document.getElementById('climbing-routes');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="rock-climbing-benefits"
      className="relative w-full bg-forest-green text-white font-body py-16 sm:py-24 px-6 sm:px-12 lg:px-20 overflow-hidden select-none border-b border-black/10"
    >
      {/* ── Background Watermark: Pine Trees & Flying Birds ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Silhouette Pine Trees on the Left */}
        <svg
          className="absolute left-0 bottom-0 w-80 sm:w-96 h-80 opacity-20 text-[#301a0e]"
          viewBox="0 0 300 300"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tree 1 */}
          <polygon points="60,300 60,260 40,260 70,200 50,200 80,140 60,140 85,80 110,140 90,140 120,200 100,200 130,260 110,260 110,300" />
          {/* Tree 2 (Taller, in background) */}
          <polygon points="120,300 120,240 95,240 135,170 110,170 145,100 125,100 155,30 185,100 165,100 200,170 175,170 215,240 190,240 190,300" opacity="0.8" />
          {/* Tree 3 (Smaller) */}
          <polygon points="190,300 190,270 175,270 200,220 185,220 210,170 195,170 215,120 235,170 220,170 245,220 230,220 255,270 240,270 240,300" opacity="0.6" />
        </svg>

        {/* Soaring Birds Watermark on Top Left */}
        <svg
          className="absolute left-16 sm:left-32 top-8 w-60 h-32 opacity-25 text-white"
          viewBox="0 0 200 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 30 40 Q 40 32 50 40 Q 60 32 70 40 Q 60 35 50 43 Q 40 35 30 40 Z" />
          <path d="M 80 20 Q 88 14 96 20 Q 104 14 112 20 Q 104 16 96 23 Q 88 16 80 20 Z" />
          <path d="M 130 50 Q 136 45 142 50 Q 148 45 154 50 Q 148 47 142 53 Q 136 47 130 50 Z" />
        </svg>
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Heading, Copy, & Learn More CTA */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Eyebrow */}
          <span className="font-body font-bold uppercase tracking-[0.24em] text-luxury-gold text-sm sm:text-base mb-2">
            BENEFIT
          </span>

          {/* Section Headline */}
          <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl lg:text-[44px] text-white tracking-tight leading-[1.1] mb-5">
            Get Various Benefits
            <br />
            <span className="text-luxury-gold">If You Join Our Club</span>
          </h2>

          {/* Lede Paragraph */}
          <p className="font-body text-white/85 text-sm sm:text-base leading-relaxed mb-8 max-w-md font-light">
            Unlock tailored climbing coaching, reserved slot privileges, specialized multi-pitch equipment rentals, and unforgettable Sahyadri summit expeditions.
          </p>

          {/* White Learn More Button matching template */}
          <div>
            <button
              type="button"
              onClick={handleLearnMore}
              className="group inline-flex items-center gap-3 bg-ivory-white hover:bg-dark-charcoal text-dark-charcoal hover:text-white font-body font-bold uppercase tracking-wider text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full bg-dark-charcoal/10 group-hover:bg-white/20 flex items-center justify-center text-[9px] text-dark-charcoal group-hover:text-white shrink-0 transition-colors duration-200">
                <FaPlay className="ml-[1px]" />
              </span>
              <span>Learn More</span>
            </button>
          </div>
        </div>

        {/* Right Column: 2x2 Grid of Benefit Cards */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BENEFITS_LIST.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-xs p-6 flex items-start gap-4 transition-all duration-300 shadow-sm"
              >
                {/* Square Icon Container */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-deep-forest border border-luxury-gold/30 flex items-center justify-center shrink-0 shadow-md">
                  {benefit.icon}
                </div>

                {/* Card Text Content */}
                <div>
                  <h3 className="font-heading font-bold uppercase text-lg sm:text-xl text-white mb-1.5 tracking-wide leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="font-body text-white/80 text-xs sm:text-sm leading-relaxed font-light">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
