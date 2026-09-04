import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export default function Adventures() {
  const [adventureSlide, setAdventureSlide] = useState(0);
  const [funSlide, setFunSlide] = useState(0);
  const [adventureFavorite, setAdventureFavorite] = useState(false);
  const [funFavorite, setFunFavorite] = useState(false);
  
  const adventureCarouselRef = useRef(null);
  const funCarouselRef = useRef(null);

  const adventures = [
    {
      id: 1,
      title: 'Ropeway Ride',
      slug: 'family-fun-and-adventure',
      description: 'Soar above the valley on our thrilling ropeway ride with panoramic mountain views.',
      category: 'Aerial Adventure',
    },
    {
      id: 2,
      title: 'Boating',
      slug: 'boating-2',
      description: 'Enjoy a peaceful boat ride on our pristine lake surrounded by nature.',
      category: 'Water Activity',
    },
    {
      id: 3,
      title: 'Jungle Safari',
      slug: 'waterfalls-and-nature-trails-2',
      description: 'Embark on an exciting jungle safari to spot wildlife in their natural habitat.',
      category: 'Wildlife Experience',
    },
    {
      id: 4,
      title: 'Trekking',
      slug: 'trekking',
      description: 'Explore pristine mountain trails with expert guides through untouched wilderness.',
      category: 'Mountain Trek',
    },
    {
      id: 5,
      title: 'Zipline',
      slug: 'family-fun-and-adventure-2',
      description: 'Feel the adrenaline rush as you zip across the valley with complete safety gear.',
      category: 'Aerial Thrill',
    },
    {
      id: 6,
      title: 'Rappelling',
      slug: 'trekking-2',
      description: 'Descend steep rock faces with professional equipment and expert instructors.',
      category: 'Rock Adventure',
    },
    {
      id: 7,
      title: 'Rope Course',
      slug: 'cycling-2',
      description: 'Navigate through challenging rope obstacles suspended between trees.',
      category: 'Obstacle Challenge',
    },
    {
      id: 8,
      title: 'Tree Climbing',
      slug: 'organic-farming-and-farm-stay-2',
      description: 'Learn professional tree climbing techniques with safety harnesses and expert guidance.',
      category: 'Climbing Activity',
    },
    {
      id: 9,
      title: 'Kayaking',
      slug: 'boating',
      description: 'Paddle through calm waters and explore hidden coves with guided tours.',
      category: 'Water Sport',
    },
    {
      id: 10,
      title: 'Mountain Trekking',
      slug: 'waterfalls-and-nature-trails-2',
      description: 'Challenge yourself with advanced mountain routes and witness stunning sunrise views.',
      category: 'Summit Expedition',
    },
  ];

  const funActivities = [
    {
      id: 1,
      title: 'Archery',
      slug: 'family-fun-and-adventure',
      description: 'Test your aim and focus with professional archery equipment and expert instructors.',
      category: 'Target Sport',
    },
    {
      id: 2,
      title: 'Paintball',
      slug: 'family-fun-and-adventure-2',
      description: 'Strategic team battles in custom paintball arenas with complete safety gear.',
      category: 'Team Combat',
    },
    {
      id: 3,
      title: 'Golf Course',
      slug: 'organic-farming-and-farm-stay-3',
      description: 'Pristine 9-hole golf course with panoramic mountain views and club rentals.',
      category: 'Premium Golf',
    },
    {
      id: 4,
      title: 'Cycling',
      slug: 'cycling',
      description: 'Explore scenic trails on premium bicycles with family-friendly routes.',
      category: 'Cycling Tour',
    },
    {
      id: 5,
      title: 'Burma Bridge',
      slug: 'trekking-2',
      description: 'Cross suspended rope bridges with safety harnesses and test your balance.',
      category: 'Bridge Challenge',
    },
    {
      id: 6,
      title: 'Camping',
      slug: 'camping',
      description: 'Overnight camping with bonfire, BBQ, and stargazing under the night sky.',
      category: 'Outdoor Stay',
    },
    {
      id: 7,
      title: 'Waterpark',
      slug: '5-star-hospitality',
      description: 'Water slides, splash pools, and aquatic activities for all ages with lifeguards.',
      category: 'Aquatic Fun',
    },
    {
      id: 8,
      title: 'Indoor Game Zones',
      slug: 'banquet-and-conference',
      description: 'Table tennis, carrom, chess, board games, and video gaming in climate-controlled spaces.',
      category: 'Indoor Games',
    },
  ];

  const cardsPerView = 2;
  const adventureMaxSlide = Math.ceil(adventures.length / cardsPerView) - 1;
  const funMaxSlide = Math.ceil(funActivities.length / cardsPerView) - 1;

  // Adventure Auto-play (moves automatically)
  useEffect(() => {
    const interval = setInterval(() => {
      setAdventureSlide((prev) => (prev >= adventureMaxSlide ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [adventureMaxSlide]);

  // Fun Auto-play (moves automatically)
  useEffect(() => {
    const interval = setInterval(() => {
      setFunSlide((prev) => (prev >= funMaxSlide ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [funMaxSlide]);

  const nextAdventureSlide = () => setAdventureSlide((prev) => (prev >= adventureMaxSlide ? 0 : prev + 1));
  const prevAdventureSlide = () => setAdventureSlide((prev) => (prev <= 0 ? adventureMaxSlide : prev - 1));

  const nextFunSlide = () => setFunSlide((prev) => (prev >= funMaxSlide ? 0 : prev + 1));
  const prevFunSlide = () => setFunSlide((prev) => (prev <= 0 ? funMaxSlide : prev - 1));

  return (
    <main className="bg-[#FAF8F5] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <EstateImage
            slug="family-fun-and-adventure"
            alt="Adventures at Bambarddara"
            sizes="100vw"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-[#C9A24B] text-xs tracking-[0.3em] uppercase mb-6 font-light">
            Curated Experiences
          </p>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-ivory-white mb-6 leading-[1.08] font-heading">
            Adventure & Fun
          </h1>
          <p className="text-lg md:text-xl text-ivory-white/90 font-light max-w-2xl mx-auto leading-relaxed font-body">
            Discover exceptional outdoor experiences and premium fun activities nestled in pristine mountain landscapes.
          </p>
        </div>
      </section>

      {/* ADVENTURE ACTIVITIES SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FAF8F5]">
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN - Adventure Controls & Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="inline-block px-6 py-2.5 rounded-full bg-[#1D1A16] text-white text-xs uppercase tracking-widest font-medium font-body">
                Adventures
              </div>

              <h2 className="text-[3.5rem] md:text-[3.85rem] font-light text-[#1D1A16] leading-[1.08] font-heading">
                Outdoor Adventure Experiences
              </h2>

              <p className="text-[#1D1A16]/70 text-base leading-relaxed font-light font-body">
                Immerse yourself in thrilling mountain expeditions, guided by certified professionals through pristine wilderness. Each adventure combines safety, expertise, and unforgettable natural beauty for an exceptional outdoor experience.
              </p>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => setAdventureFavorite(!adventureFavorite)}
                  className="w-12 h-12 rounded-full border-2 border-[#CEC3AF] flex items-center justify-center hover:border-[#C9A24B] hover:bg-[#C9A24B]/5 transition-all duration-300"
                  aria-label="Add to favorites"
                >
                  {adventureFavorite ? (
                    <FaHeart className="text-[#C9A24B]" size={18} />
                  ) : (
                    <FaRegHeart className="text-[#1D1A16]/60" size={18} />
                  )}
                </button>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-full border-2 border-[#CEC3AF] bg-white">
                  <button
                    onClick={prevAdventureSlide}
                    className="text-[#1D1A16]/60 hover:text-[#1D1A16] transition-colors"
                    aria-label="Previous slide"
                  >
                    <FaChevronLeft size={14} />
                  </button>
                  <span className="text-sm font-medium text-[#1D1A16] min-w-[50px] text-center font-body">
                    {adventureSlide + 1} / {adventureMaxSlide + 1}
                  </span>
                  <button
                    onClick={nextAdventureSlide}
                    className="text-[#1D1A16]/60 hover:text-[#1D1A16] transition-colors"
                    aria-label="Next slide"
                  >
                    <FaChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Adventure Carousel */}
            <div className="lg:col-span-8">
              <div className="overflow-hidden">
                <div
                  ref={adventureCarouselRef}
                  className="flex gap-6 transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ 
                    transform: `translateX(calc(-${adventureSlide * 102.5}%))`,
                  }}
                >
                  {adventures.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#E2D8CC] rounded-[32px] shadow-lg hover:shadow-xl transition-shadow duration-500 overflow-hidden flex-shrink-0"
                      style={{ width: 'calc((100% - 24px) / 2)' }}
                    >
                      <div className="relative h-[420px] overflow-hidden group">
                        <EstateImage
                          slug={item.slug}
                          alt={item.title}
                          sizes="50vw"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-[#1D1A16] text-xs uppercase tracking-wider font-medium font-body">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="text-2xl font-light text-[#1D1A16] leading-tight font-heading">
                          {item.title}
                        </h3>
                        <p className="text-[#1D1A16]/70 text-sm leading-relaxed font-light line-clamp-2 font-body">
                          {item.description}
                        </p>
                        <div className="flex justify-end pt-2">
                          <Link
                            to="/enquire"
                            className="px-5 py-2 rounded-full bg-[#1D1A16] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#C9A24B] transition-colors duration-300 font-body"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUN ACTIVITIES SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F6F3EC]">
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN - Fun Controls & Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="inline-block px-6 py-2.5 rounded-full bg-[#1D1A16] text-white text-xs uppercase tracking-widest font-medium font-body">
                Fun Activities
              </div>

              <h2 className="text-[3.5rem] md:text-[3.85rem] font-light text-[#1D1A16] leading-[1.08] font-heading">
                Premium Fun Activities
              </h2>

              <p className="text-[#1D1A16]/70 text-base leading-relaxed font-light font-body">
                Discover refined entertainment and recreation designed for families and fun seekers. Our curated activities blend relaxation with excitement, offering premium facilities and professional guidance in a stunning mountain setting.
              </p>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => setFunFavorite(!funFavorite)}
                  className="w-12 h-12 rounded-full border-2 border-[#CEC3AF] flex items-center justify-center hover:border-[#C9A24B] hover:bg-[#C9A24B]/5 transition-all duration-300"
                  aria-label="Add to favorites"
                >
                  {funFavorite ? (
                    <FaHeart className="text-[#C9A24B]" size={18} />
                  ) : (
                    <FaRegHeart className="text-[#1D1A16]/60" size={18} />
                  )}
                </button>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-full border-2 border-[#CEC3AF] bg-white">
                  <button
                    onClick={prevFunSlide}
                    className="text-[#1D1A16]/60 hover:text-[#1D1A16] transition-colors"
                    aria-label="Previous slide"
                  >
                    <FaChevronLeft size={14} />
                  </button>
                  <span className="text-sm font-medium text-[#1D1A16] min-w-[50px] text-center font-body">
                    {funSlide + 1} / {funMaxSlide + 1}
                  </span>
                  <button
                    onClick={nextFunSlide}
                    className="text-[#1D1A16]/60 hover:text-[#1D1A16] transition-colors"
                    aria-label="Next slide"
                  >
                    <FaChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Fun Carousel */}
            <div className="lg:col-span-8">
              <div className="overflow-hidden">
                <div
                  ref={funCarouselRef}
                  className="flex gap-6 transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ 
                    transform: `translateX(calc(-${funSlide * 102.5}%))`,
                  }}
                >
                  {funActivities.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#E2D8CC] rounded-[32px] shadow-lg hover:shadow-xl transition-shadow duration-500 overflow-hidden flex-shrink-0"
                      style={{ width: 'calc((100% - 24px) / 2)' }}
                    >
                      <div className="relative h-[420px] overflow-hidden group">
                        <EstateImage
                          slug={item.slug}
                          alt={item.title}
                          sizes="50vw"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-[#1D1A16] text-xs uppercase tracking-wider font-medium font-body">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="text-2xl font-light text-[#1D1A16] leading-tight font-heading">
                          {item.title}
                        </h3>
                        <p className="text-[#1D1A16]/70 text-sm leading-relaxed font-light line-clamp-2 font-body">
                          {item.description}
                        </p>
                        <div className="flex justify-end pt-2">
                          <Link
                            to="/enquire"
                            className="px-5 py-2 rounded-full bg-[#1D1A16] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#C9A24B] transition-colors duration-300 font-body"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY & EQUIPMENT SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FAF8F5]">
        <div className="max-w-[1720px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C9A24B] text-2xl">✦</span>
            <h2 className="text-4xl md:text-5xl font-light text-[#1D1A16] mt-4 mb-6 font-heading">
              Safety & Professional Equipment
            </h2>
            <p className="text-[#1D1A16]/70 text-base md:text-lg max-w-3xl mx-auto font-light font-body">
              Your safety is our paramount concern. Every experience includes premium equipment and certified guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-500">
              <div className="w-16 h-16 rounded-full bg-[#C9A24B]/10 flex items-center justify-center mb-6">
                <span className="text-3xl text-[#C9A24B]">🎯</span>
              </div>
              <h3 className="text-2xl font-light text-[#1D1A16] mb-3 font-heading">
                Certified Guides
              </h3>
              <p className="text-[#1D1A16]/70 text-sm leading-relaxed font-light font-body">
                All guides hold international certifications and have 10+ years of field experience with impeccable safety records.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-500">
              <div className="w-16 h-16 rounded-full bg-[#C9A24B]/10 flex items-center justify-center mb-6">
                <span className="text-3xl text-[#C9A24B]">🛡️</span>
              </div>
              <h3 className="text-2xl font-light text-[#1D1A16] mb-3 font-heading">
                Premium Gear
              </h3>
              <p className="text-[#1D1A16]/70 text-sm leading-relaxed font-light font-body">
                Industry-leading equipment from top brands, regularly inspected and replaced to meet highest safety standards.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-500">
              <div className="w-16 h-16 rounded-full bg-[#C9A24B]/10 flex items-center justify-center mb-6">
                <span className="text-3xl text-[#C9A24B]">🏥</span>
              </div>
              <h3 className="text-2xl font-light text-[#1D1A16] mb-3 font-heading">
                Medical Support
              </h3>
              <p className="text-[#1D1A16]/70 text-sm leading-relaxed font-light font-body">
                On-site medical professionals and emergency evacuation protocols ensure immediate response when needed.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-500">
              <div className="w-16 h-16 rounded-full bg-[#C9A24B]/10 flex items-center justify-center mb-6">
                <span className="text-3xl text-[#C9A24B]">☁️</span>
              </div>
              <h3 className="text-2xl font-light text-[#1D1A16] mb-3 font-heading">
                Weather Monitoring
              </h3>
              <p className="text-[#1D1A16]/70 text-sm leading-relaxed font-light font-body">
                Real-time weather tracking systems ensure activities proceed only in optimal and safe conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GUEST EXPERIENCES / TESTIMONIALS */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#1D1A16] text-white">
        <div className="max-w-[1720px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C9A24B] text-2xl">✦</span>
            <h2 className="text-4xl md:text-5xl font-light mt-4 mb-6 font-heading">
              Guest Experiences
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto font-light font-body">
              Hear from adventurers who have experienced the magic of Bambarddara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="text-[#C9A24B] text-4xl mb-4">"</div>
              <p className="text-white/90 text-base leading-relaxed font-light mb-6 font-body">
                The zipline experience was absolutely breathtaking! The guides were professional, the equipment top-notch, and the views unforgettable. A must-do for any adventure seeker.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A24B]/20 flex items-center justify-center">
                  <span className="text-[#C9A24B] font-medium">AM</span>
                </div>
                <div>
                  <div className="font-medium text-white">Arjun Mehta</div>
                  <div className="text-white/60 text-sm font-body">Mumbai, India</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="text-[#C9A24B] text-4xl mb-4">"</div>
              <p className="text-white/90 text-base leading-relaxed font-light mb-6 font-body">
                Perfect family getaway! The waterpark kept our kids entertained while my husband enjoyed the golf course. Something for everyone at Bambarddara.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A24B]/20 flex items-center justify-center">
                  <span className="text-[#C9A24B] font-medium">PS</span>
                </div>
                <div>
                  <div className="font-medium text-white">Priya Sharma</div>
                  <div className="text-white/60 text-sm font-body">Bangalore, India</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="text-[#C9A24B] text-4xl mb-4">"</div>
              <p className="text-white/90 text-base leading-relaxed font-light mb-6 font-body">
                The jungle safari exceeded all expectations. Our guide's knowledge of local wildlife was impressive, and we spotted species we never imagined seeing.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A24B]/20 flex items-center justify-center">
                  <span className="text-[#C9A24B] font-medium">RG</span>
                </div>
                <div>
                  <div className="font-medium text-white">Rajesh Gupta</div>
                  <div className="text-white/60 text-sm font-body">Delhi, India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING INFORMATION */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F6F3EC]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#C9A24B] text-2xl">✦</span>
              <h2 className="text-4xl md:text-5xl font-light text-[#1D1A16] mt-4 mb-6 leading-tight font-heading">
                Plan Your Adventure
              </h2>
              <p className="text-[#1D1A16]/70 text-base leading-relaxed font-light mb-8 font-body">
                Our experience specialists are available to help you design the perfect itinerary, whether you're seeking adrenaline-pumping adventures or relaxing family activities.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A24B]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl text-[#C9A24B]">📞</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#1D1A16] mb-1 font-body">
                      Call Us
                    </h3>
                    <p className="text-[#1D1A16]/70 text-sm font-body">
                      +91 7588775757 (Daily 9 AM - 8 PM)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A24B]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl text-[#C9A24B]">⏰</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#1D1A16] mb-1 font-body">
                      Advance Booking
                    </h3>
                    <p className="text-[#1D1A16]/70 text-sm font-body">
                      Book 48 hours in advance for guaranteed availability
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A24B]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl text-[#C9A24B]">👥</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#1D1A16] mb-1 font-body">
                      Group Packages
                    </h3>
                    <p className="text-[#1D1A16]/70 text-sm font-body">
                      Special rates for groups of 10+ participants
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A24B]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl text-[#C9A24B]">🎁</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#1D1A16] mb-1 font-body">
                      Custom Packages
                    </h3>
                    <p className="text-[#1D1A16]/70 text-sm font-body">
                      Combine multiple activities for exclusive deals
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <EstateImage
                slug="5-star-hospitality-2"
                alt="Adventure Planning"
                sizes="50vw"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATUS BAR / FOOTER */}
      <section className="py-8 px-6 md:px-12 bg-[#F6F3EC] border-t border-[#CEC3AF]/30">
        <div className="max-w-[1720px] mx-auto flex flex-wrap justify-between items-center gap-6 text-sm text-[#1D1A16]/60 font-body">
          <div>
            <span className="font-medium text-[#1D1A16]">18</span> Premium Activities
          </div>
          <div>
            <span className="font-medium text-[#1D1A16]">10</span> Adventure Experiences
          </div>
          <div>
            <span className="font-medium text-[#1D1A16]">8</span> Fun Activities
          </div>
          <div>
            <span className="font-medium text-[#1D1A16]">Certified</span> Professional Guides
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#1D1A16] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight font-heading">
            Begin Your Journey
          </h2>
          <p className="text-lg text-white/80 font-light mb-12 max-w-2xl mx-auto leading-relaxed font-body">
            Contact our experience specialists to design your personalized adventure and reserve your preferred dates.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/enquire"
              className="inline-flex items-center justify-center px-10 py-4 bg-[#C9A24B] text-[#1D1A16] text-sm tracking-widest uppercase font-medium hover:bg-[#D4AE5C] transition-all duration-300 rounded-full font-body"
            >
              Reserve Experience
            </Link>
            <a
              href="tel:+917588775757"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/30 text-white text-sm tracking-widest uppercase font-medium hover:border-white hover:bg-white/10 transition-all duration-300 rounded-full font-body"
            >
              Call Specialist
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
