import React from 'react';
import { FaPlay } from 'react-icons/fa';

export default function RockClimbingAbout({ onLearnMoreClick }) {
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
      id="rock-climbing-about"
      className="relative w-full bg-ivory-white text-dark-charcoal font-body overflow-hidden py-14 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 select-none border-b border-stone/40"
    >
      {/* ── Background Geometric Mountain Watermark & Flying Birds ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle geometric origami mountain silhouettes on the right */}
        <svg
          className="absolute right-0 bottom-0 w-3/4 max-w-4xl h-full opacity-60 text-[#ede7df]"
          viewBox="0 0 800 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMaxYMax meet"
        >
          {/* Distant mountain facet 1 */}
          <polygon
            points="250,500 480,260 620,500"
            fill="#f5f0e8"
            opacity="0.8"
          />
          {/* Main peak facet light */}
          <polygon
            points="480,260 620,500 520,500"
            fill="#eae3d7"
            opacity="0.85"
          />
          {/* Sharp high ridge */}
          <polygon
            points="380,500 580,180 780,500"
            fill="#f7f3ed"
            opacity="0.9"
          />
          {/* Peak facet shadow */}
          <polygon
            points="580,180 670,500 780,500"
            fill="#e4dcce"
            opacity="0.75"
          />
          {/* Front jagged crag peak */}
          <polygon
            points="510,500 660,220 800,480"
            fill="#ede6dc"
            opacity="0.7"
          />
          <polygon
            points="660,220 740,500 800,480"
            fill="#ded5c5"
            opacity="0.8"
          />
          {/* Additional lower foothill polygon */}
          <polygon
            points="220,500 360,370 500,500"
            fill="#f4efe8"
            opacity="0.6"
          />

          {/* Graceful silhouette birds soaring in the sky */}
          <g fill="#b5ab9e" opacity="0.55">
            {/* Bird 1 */}
            <path d="M 330 180 Q 340 172 350 180 Q 360 172 370 180 Q 360 175 350 183 Q 340 175 330 180 Z" />
            {/* Bird 2 */}
            <path d="M 380 150 Q 388 144 396 150 Q 404 144 412 150 Q 404 146 396 153 Q 388 146 380 150 Z" />
            {/* Bird 3 */}
            <path d="M 430 195 Q 436 190 442 195 Q 448 190 454 195 Q 448 192 442 198 Q 436 192 430 195 Z" />
          </g>
        </svg>
      </div>

      {/* ── Main Two-Column Content Container ── */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Climbers Scaling Rock Outcrop */}
        <div className="lg:col-span-6 flex justify-center lg:justify-start items-center">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-xl border border-stone/30 group">
            <img
              src={`${process.env.PUBLIC_URL}/images/opt/rock-climb.jpg`}
              alt="Rock climbers scaling natural basalt cliffs at Bambarddara Agro Tourism Pvt. Ltd."
              className="w-full h-auto object-cover transition-transform duration-700 ease-luxe group-hover:scale-105 select-none"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: About Us Copy & Learn More CTA */}
        <div className="lg:col-span-6 lg:pl-4 flex flex-col justify-center">
          {/* Eyebrow / Tagline */}
          <span className="font-body font-bold uppercase tracking-[0.22em] text-luxury-gold text-sm sm:text-base mb-2">
            ABOUT US
          </span>

          {/* Primary Section Heading */}
          <h2 className="font-heading font-extrabold uppercase text-3xl sm:text-4xl lg:text-[46px] text-dark-charcoal tracking-tight leading-[1.08] mb-5">
            Nothing Feels Better Than
            <br />
            <span className="text-forest-green">A Successful Climb</span>
          </h2>

          {/* Description Paragraph */}
          <p className="font-body text-light-charcoal text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-light">
            Ascend ancient volcanic basalt cliffs suspended high above the Sahyadri rainforest. Whether mastering your first natural rock footholds or scaling challenging vertical routes, our certified instructors guide every pitch with world-class safety standards and unmatched panoramic views.
          </p>

          {/* Learn More Action Button */}
          <div>
            <button
              type="button"
              onClick={handleLearnMore}
              className="inline-flex items-center gap-3 bg-forest-green hover:bg-dark-charcoal text-white font-body font-bold uppercase tracking-wider text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[9px] text-white shrink-0">
                <FaPlay className="ml-[1px]" />
              </span>
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
