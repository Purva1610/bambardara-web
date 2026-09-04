import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaConciergeBell, FaSwimmingPool, FaWineGlass, FaHelicopter } from "react-icons/fa";
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

const GOLD = "#c9a24b";

// Image slugs for EstateImage component
const IMAGE_SLUGS = {
  hero: "resort-and-villas",
  gallery1: "luxury-hotel-rooms-and-suites-3",
  gallery2: "organic-farming-and-farm-stay-3",
  gallery3: "spa-and-wellness-2",
  woodland: "waterfalls-and-nature-trails-2",
  evergreen: "organic-farming-and-farm-stay-2",
  footer: "camping-2",
  amenities1: "infinity-pool-2",
  amenities2: "fine-dining-restaurant",
  amenities3: "animal-farm-and-dairy-farm",
};

function SectionButton({ children }) {
  return (
    <button
      className="mt-6 px-8 py-3 text-xs tracking-widest rounded-sm transition-all hover:opacity-80 bg-forest-green text-ivory-white"
    >
      {children}
    </button>
  );
}


export default function Stay() {
  const navigate = useNavigate();

  const handleRoomTypeClick = (categoryName) => {
    // Map category names to URL slugs
    const categoryMap = {
      'Mountain Retreat': 'suites',      // Luxury Suites
      'Forest Canopy': 'villas',         // Valley Villas
      'Heritage Farmhouse': 'farm-stay', // Farmhouse Rooms
      'Riverside Canvas': 'tent'         // Riverside Tents
    };
    
    const slug = categoryMap[categoryName] || 'suites';
    navigate(`/stays/${slug}`);
  };

  return (
    <div className="w-full bg-ivory-white text-forest-green font-sans">
      {/* Hero */}
      <div className="relative h-[500px] md:h-[700px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/villa.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-ivory-white max-w-4xl font-heading"
          >
            Unplug. Unwind.
            <br />
            <span className="text-luxury-gold">Reconnect with Nature.</span>
          </h1>
          <p className="mt-8 text-base md:text-lg text-ivory-white/85 max-w-3xl leading-relaxed font-light">
            Nestled in the heart of Maharashtra, Bambarddara offers an unparalleled escape from the ordinary. Our luxury retreats blend modern comfort with the timeless beauty of nature, creating experiences that rejuvenate both body and soul.
          </p>
          <SectionButton>EXPLORE NOW</SectionButton>
        </div>
      </div>

      {/* Signature Collections Section */}
      <div className="bg-ivory-white px-6 md:px-12 lg:px-16 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Reveal>
            <div className="flex items-start justify-between mb-12 md:mb-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-forest-green mb-4 font-heading tracking-[-0.02em]">
                  Signature Collections
                </h2>
                <p className="text-sm md:text-base text-light-charcoal/70 leading-relaxed font-light">
                  Each destination is meticulously crafted to harmonize with its natural surroundings while providing the zenith of comfort and unrivalled service.
                </p>
              </div>
              <div className="hidden md:block text-luxury-gold text-sm font-light">
                01 / 04
              </div>
            </div>
          </Reveal>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Large Featured Card - Left (7 columns) */}
            <div 
              className="lg:col-span-7 relative group overflow-hidden bg-ivory-white shadow-lg cursor-pointer hover-scale"
              onClick={() => handleRoomTypeClick('Mountain Retreat')}
            >
              <div className="relative h-[450px] md:h-[550px] lg:h-[600px]">
                <EstateImage
                  slug={IMAGE_SLUGS.gallery1}
                  alt="Mountain Retreat" 
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 lg:p-12">
                  {/* Label */}
                  <div className="inline-block mb-4">
                    <span 
                      className="px-4 py-1.5 text-[0.65rem] tracking-[0.2em] uppercase font-medium border"
                      style={{ 
                        color: GOLD,
                        borderColor: GOLD,
                        backgroundColor: 'rgba(201, 162, 75, 0.1)'
                      }}
                    >
                      LUXURY SUITES
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className="text-3xl md:text-4xl lg:text-5xl font-light text-ivory-white mb-4 leading-tight font-heading"
                  >
                    Mountain Retreat
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm md:text-base text-ivory-white/80 leading-relaxed max-w-xl mb-6 font-light">
                    Suspended above the clouds, these opulent suites offer dramatic panoramas of rugged peaks, featuring bespoke stone hearths and expansive private terraces.
                  </p>
                  
                  {/* CTA Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRoomTypeClick('Mountain Retreat');
                    }}
                    className="inline-flex items-center gap-3 px-8 py-3 text-[0.65rem] tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:gap-4"
                    style={{ 
                      backgroundColor: GOLD,
                      color: '#1a1816'
                    }}
                  >
                    RESERVE
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - 2 Rows (5 columns) */}
            <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-6">
              {/* Top Card - Forest Canopy */}
              <div 
                className="relative group overflow-hidden bg-ivory-white shadow-lg flex-1 cursor-pointer hover-scale"
                onClick={() => handleRoomTypeClick('Forest Canopy')}
              >
                <div className="relative h-[220px] md:h-[240px] lg:h-[290px]">
                  <EstateImage
                    slug={IMAGE_SLUGS.evergreen}
                    alt="Forest Canopy" 
                    className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                    <div className="inline-block mb-2">
                      <span 
                        className="px-3 py-1 text-[0.6rem] tracking-[0.2em] uppercase font-medium border"
                        style={{ 
                          color: GOLD,
                          borderColor: `${GOLD}99`,
                          backgroundColor: 'rgba(201, 162, 75, 0.08)'
                        }}
                      >
                        EXCLUSIVE
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <h4 
                        className="text-2xl md:text-3xl font-light text-ivory-white font-heading"
                      >
                        Forest Canopy
                      </h4>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRoomTypeClick('Forest Canopy');
                        }}
                        className="flex items-center justify-center w-9 h-9 text-ivory-white/70 hover:text-ivory-white transition-colors duration-300"
                      >
                        <FaArrowRight className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row - 2 Small Cards */}
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {/* Heritage Farmhouse */}
                <div 
                  className="relative group overflow-hidden bg-ivory-white shadow-lg cursor-pointer hover-scale"
                  onClick={() => handleRoomTypeClick('Heritage Farmhouse')}
                >
                  <div className="relative h-[180px] md:h-[200px] lg:h-[280px]">
                    <EstateImage
                      slug={IMAGE_SLUGS.woodland}
                      alt="Heritage Farmhouse" 
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <h4 
                        className="text-lg md:text-xl font-light text-ivory-white mb-1 font-heading"
                      >
                        Heritage
                        <br />
                        Farmhouse
                      </h4>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRoomTypeClick('Heritage Farmhouse');
                        }}
                        className="flex items-center justify-center w-7 h-7 text-ivory-white/60 hover:text-ivory-white transition-colors duration-300"
                      >
                        <FaArrowRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Riverside Canvas */}
                <div 
                  className="relative group overflow-hidden bg-ivory-white shadow-lg cursor-pointer hover-scale"
                  onClick={() => handleRoomTypeClick('Riverside Canvas')}
                >
                  <div className="relative h-[180px] md:h-[200px] lg:h-[280px]">
                    <EstateImage
                      slug={IMAGE_SLUGS.footer}
                      alt="Riverside Canvas" 
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <h4 
                        className="text-lg md:text-xl font-light text-ivory-white mb-1 font-heading"
                      >
                        Riverside
                        <br />
                        Canvas
                      </h4>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRoomTypeClick('Riverside Canvas');
                        }}
                        className="flex items-center justify-center w-7 h-7 text-ivory-white/60 hover:text-ivory-white transition-colors duration-300"
                      >
                        <FaArrowRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeless Experiences Section */}
      <div className="bg-ivory-white px-6 md:px-12 lg:px-16 py-20 md:py-32 border-t border-forest-green/10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-forest-green mb-6 font-heading tracking-[-0.02em]">
                Timeless Experiences
              </h2>
              <p className="text-base md:text-lg text-light-charcoal/80 leading-relaxed font-light max-w-3xl mx-auto">
                Curated moments designed to immerse you in local heritage and unparalleled luxury.
              </p>
            </div>
          </Reveal>

          {/* Three Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Card 1 - Heritage Dining */}
            <Reveal delay={100}>
              <div className="group cursor-pointer hover-scale">
                <div className="relative h-[400px] md:h-[450px] overflow-hidden mb-6">
                <EstateImage
                  slug={IMAGE_SLUGS.amenities2}
                  alt="Heritage Dining - Private dinner in historic courtyard" 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <h3 
                  className="text-3xl md:text-4xl font-light text-forest-green mb-3 group-hover:text-luxury-gold transition-colors duration-500 font-heading"
                >
                  Heritage Dining
                </h3>
                <p className="text-base text-light-charcoal/70 font-light leading-relaxed">
                  Private dinner in a historic courtyard.
                </p>
              </div>
            </Reveal>

            {/* Card 2 - Wellness Sanctuary */}
            <Reveal delay={200}>
              <div className="group cursor-pointer hover-scale">
                <div className="relative h-[400px] md:h-[450px] overflow-hidden mb-6">
                <EstateImage
                  slug={IMAGE_SLUGS.gallery3}
                  alt="Wellness Sanctuary - Ayurvedic spa treatments" 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <h3 
                  className="text-3xl md:text-4xl font-light text-forest-green mb-3 group-hover:text-luxury-gold transition-colors duration-500 font-heading"
                >
                  Wellness Sanctuary
                </h3>
                <p className="text-base text-light-charcoal/70 font-light leading-relaxed">
                  Ayurvedic spa treatments.
                </p>
              </div>
            </Reveal>

            {/* Card 3 - Royal Expeditions */}
            <Reveal delay={300}>
              <div className="group cursor-pointer hover-scale">
                <div className="relative h-[400px] md:h-[450px] overflow-hidden mb-6">
                <EstateImage
                  slug={IMAGE_SLUGS.woodland}
                  alt="Royal Expeditions - Curated local heritage tours" 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <h3 
                  className="text-3xl md:text-4xl font-light text-forest-green mb-3 group-hover:text-luxury-gold transition-colors duration-500 font-heading"
                >
                  Royal Expeditions
                </h3>
                <p className="text-base text-light-charcoal/70 font-light leading-relaxed">
                  Curated local heritage tours.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Amenities of Distinction Section */}
      <div className="bg-ivory-white px-6 md:px-12 lg:px-16 py-20 md:py-32 border-t border-forest-green/10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-forest-green mb-6 font-heading tracking-[-0.02em]">
                Amenities of Distinction
              </h2>
              <p className="text-base md:text-lg text-light-charcoal/80 leading-relaxed font-light">
                The pinnacle of luxury, curated for your comfort.
              </p>
            </div>
          </Reveal>

          {/* Four Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Amenity 1 - 24/7 Butler Service */}
            <div className="text-center group">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div 
                    className="w-20 h-20 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(212, 181, 96, 0.05) 100%)',
                      borderRadius: '50%'
                    }}
                  >
                    <FaConciergeBell className="text-4xl" style={{ color: GOLD }} />
                  </div>
                </div>
              </div>
              <h3 
                className="text-2xl md:text-3xl font-light text-forest-green mb-3 group-hover:text-luxury-gold transition-colors duration-500 font-heading"
              >
                24/7 Butler Service
              </h3>
            </div>

            {/* Amenity 2 - Infinity Pool */}
            <div className="text-center group">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div 
                    className="w-20 h-20 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(212, 181, 96, 0.05) 100%)',
                      borderRadius: '50%'
                    }}
                  >
                    <FaSwimmingPool className="text-4xl" style={{ color: GOLD }} />
                  </div>
                </div>
              </div>
              <h3 
                className="text-2xl md:text-3xl font-light text-forest-green mb-3 group-hover:text-luxury-gold transition-colors duration-500 font-heading"
              >
                Infinity Pool
              </h3>
            </div>

            {/* Amenity 3 - Private Wine Cellar */}
            <div className="text-center group">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div 
                    className="w-20 h-20 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(212, 181, 96, 0.05) 100%)',
                      borderRadius: '50%'
                    }}
                  >
                    <FaWineGlass className="text-4xl" style={{ color: GOLD }} />
                  </div>
                </div>
              </div>
              <h3 
                className="text-2xl md:text-3xl font-light text-forest-green mb-3 group-hover:text-luxury-gold transition-colors duration-500 font-heading"
              >
                Private Wine Cellar
              </h3>
            </div>

            {/* Amenity 4 - Heli-pad Access */}
            <div className="text-center group">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div 
                    className="w-20 h-20 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(212, 181, 96, 0.05) 100%)',
                      borderRadius: '50%'
                    }}
                  >
                    <FaHelicopter className="text-4xl" style={{ color: GOLD }} />
                  </div>
                </div>
              </div>
              <h3 
                className="text-2xl md:text-3xl font-light text-forest-green mb-3 group-hover:text-luxury-gold transition-colors duration-500 font-heading"
              >
                Heli-pad Access
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* The Inner Circle Section */}
      <div className="bg-ivory-white px-6 md:px-12 lg:px-16 py-24 md:py-36 border-t border-forest-green/10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-luxury-gold mb-8 font-heading tracking-[-0.02em]">
            The Inner Circle
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-lg text-light-charcoal/70 leading-relaxed font-light max-w-3xl mx-auto mb-12">
            Ascend to a realm of unparalleled privileges. Join our exclusive loyalty program for bespoke curations, priority reservations, and hidden gems.
          </p>
          
          {/* CTA Button */}
          <button 
            className="inline-flex items-center gap-3 px-12 py-5 text-xs tracking-[0.28em] uppercase font-medium transition-all duration-500"
            style={{ 
              backgroundColor: GOLD,
              color: '#1A1916'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D4B560';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(201, 169, 97, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = GOLD;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Request Invitation
          </button>
        </div>
      </div>
    </div>
  );
}