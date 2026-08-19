import React, { useEffect, useState } from 'react';
import { FaSeedling, FaLandmark, FaCrown, FaBinoculars, FaSwimmingPool, FaLeaf, FaArrowRight, FaBullseye, FaEye } from 'react-icons/fa';

const Hero = () => {
  const highlights = [
    { icon: FaSeedling, text: '150 Acres Pristine Estate' },
    { icon: FaLandmark, text: '100+ Luxury Rooms' },
    { icon: FaCrown, text: '5-Star Facilities' },
    { icon: FaBinoculars, text: 'Jungle Safari' },
    { icon: FaSwimmingPool, text: 'Water Park' },
    { icon: FaLeaf, text: 'Organic Farm' },
  ];

  const experiences = [
    { title: 'Stay and Hospitality', desc: 'Relax in luxury rooms and cottages surrounded by lush greenery, where comfort meets nature for a truly restful escape.', img: '/images/stay.jpg', tag: 'Resorts & Villas', tagStyle: 'bg-luxury-gold text-dark-charcoal' },
    { title: 'Adventure and Fun', desc: 'From tractor rides to water park thrills, enjoy a mix of exciting activities designed for all ages and energy levels.', img: '/images/adve.jpg', tag: 'Adventure & Thrills', tagStyle: 'bg-luxury-gold text-dark-charcoal' },
    { title: 'Events and Celebrations', desc: 'Host weddings, birthdays, and corporate retreats in a picturesque estate setting with full event support.', img: '/images/event.jpg', tag: 'Events & Celebrations', tagStyle: 'bg-luxury-gold text-dark-charcoal' },
    { title: 'Integrated Farming', desc: 'Learn sustainable agriculture practices through hands-on organic farming, vermicomposting, and crop tours.', img: '/images/integrated.jpg', tag: 'Farming & Sustainability', tagStyle: 'bg-luxury-gold text-dark-charcoal' },
    { title: 'Culture Experience', desc: 'Immerse yourself in local traditions with folk performances, rural crafts, and authentic regional cuisine.', img: '/images/temple.jpg', tag: 'Culture & Heritage', tagStyle: 'bg-luxury-gold text-dark-charcoal' },
    { title: 'Nature Trails', desc: 'Explore scenic walking paths through forests, plantations, and streams while spotting native flora and fauna.', img: '/images/waterfall.jpg', tag: 'Nature & Eco', tagStyle: 'bg-luxury-gold text-dark-charcoal' },
  ];

  const [current, setCurrent] = useState(0);
  const [activeDirector, setActiveDirector] = useState(null);

  const directors = [
    {
      name: 'Prakash Pawar',
      title: 'Chief Operating Officer',
      imgSrc: '/images/pawar.jpeg',
      bio: 'Mr. Prakash Pawar is a Director of Bambardara Agrotourism Pvt. Ltd. A graduate with over 15 years of experience in marketing, he specializes in farming development, animal farms, and high-tech nursery development. Committed to promoting sustainable farming and innovative animal care, Mr. Pawar leverages his agricultural expertise to build a greener future and drive value for the community and environment.'
    },
    {
      name: 'Prakash Patil',
      title: 'Managing Director & CEO',
      imgSrc: '/images/patil.jpeg',
      bio: 'Mr. Prakash Patil is the Director of Bambardara Agrotourism Pvt. Ltd. As a qualified Chartered Accountant (CA) with over 20 years of corporate experience, he brings extensive financial and strategic leadership to the company. Guided by values of sustainability, integrity, and innovation, Mr. Patil is dedicated to establishing Bambardara as India’s leading agrotourism destination, blending rural development with nature-based luxury experiences.'
    }
  ];

  useEffect(() => {
    const elements = document.querySelectorAll('[data-scroll-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        data-scroll-reveal
        className="scroll-reveal relative bg-cover bg-center bg-no-repeat flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          height: '120vh',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4 font-heading text-white">
            Bambardara AgroTourism
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-normal mb-6 font-heading text-white">
            Where Nature Meets Luxury
          </h2>
          <button
            type="button"
            className="bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-full font-body text-lg hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2"
          >
            Discover Now
            <FaArrowRight />
          </button>
        </div>
      </section>

      <section data-scroll-reveal className="scroll-reveal py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {highlights.map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                {React.createElement(item.icon, { className: 'text-luxury-gold text-2xl' })}
                <span className="text-sm font-medium text-forest-green font-body">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-scroll-reveal className="scroll-reveal py-12 px-4 bg-white">
         <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-normal text-luxury-gold font-heading mb-2 text-left">
            The Sanctuary
          </h3>
          <div className="flex flex-col md:flex-row items-start gap-10">
            <div className="md:w-3/5 flex flex-col items-start">
              <h2 className="text-3xl md:text-4xl font-normal mb-6 font-heading text-forest-green">
                A Retreat Rooted in the Earth.
              </h2>
              <p className="text-dark-charcoal font-body text-sm leading-relaxed mb-6 text-justify">
                Awaken where the earth breathes in emerald, and sustainable living ascends into an art of pure, conscious indulgence. Hidden within the timeless folds of the Western Ghats, our estate stands as a sanctuary of alignment a breathtaking marriage of fertile heritage and unparalleled opulence. Here, dawn greets you not to escape the world, but to return to yourself amidst the silent majesty of panoramic peaks. Afternoon hours dissolve within architectural masterpieces designed to center your spirit, while rare, hyper-local culinary symphonies born from our sacred soil nourish the epicurean soul. This is agro-tourism reborn as an elite space of arrival. Unapologetically grand, deeply grounding, and entirely without peer.
              </p>
              <a
                href="#learn-more"
                className="inline-flex items-center gap-2 bg-luxury-gold text-white font-body font-medium text-lg px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Read More
                <FaArrowRight />
              </a>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <img
                  src="/images/about.jpg"
                  alt="About Bambardara"
                  className="w-full aspect-square object-cover rounded shadow-xl border-2 border-luxury-gold"
                />
                <img
                  src="/images/wakeup.jpg"
                  alt="Wakeup View"
                  className="absolute -bottom-6 -right-6 w-2/5 aspect-square object-cover rounded shadow-xl border-2 border-luxury-gold bg-white p-1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-scroll-reveal className="scroll-reveal py-12 px-4 bg-white">
         <div className="max-w-7xl mx-auto text-center">
           <h2 className="text-3xl md:text-4xl font-normal mb-6 font-heading text-forest-green">
             Discover Our Estate Experiences
           </h2>
           <p className="text-light-charcoal font-body text-sm leading-relaxed mb-8">
             From heart-pounding adventures to serene moments of reflection, every corner of Bambardara offers a unique way to connect with the world around you.
           </p>
            <div className="relative w-full">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${current * 25}%)` }}
                >
                  {experiences.map((item) => (
                    <div key={item.title} className="w-1/4 flex-shrink-0 px-1">
                      <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-lg group">
                        <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 p-5 flex flex-col justify-end text-left text-white">
                          {item.tag && (
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-body mb-3 w-fit ${item.tagStyle}`}>
                              {item.tag}
                            </span>
                          )}
                          <h3 className="text-xl font-semibold mb-2 font-heading text-white">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-white opacity-90">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full mt-6">
                <div className="flex w-full h-2 rounded-full bg-gray-200 overflow-hidden gap-0">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrent(index)}
                      className="flex-1 h-full transition-all duration-500 ease-in-out relative"
                      aria-label={`Go to slide ${index + 1}`}
                      style={{
                        background: index <= current
                          ? 'linear-gradient(to right, #0B5D3A, #D4AF37)'
                          : 'transparent',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-scroll-reveal className="scroll-reveal py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img
                src="/images/legacy.jpg"
                alt="A Legacy of the Land"
                className="w-full aspect-[3/4] object-cover rounded-t-full shadow-xl"
              />
            </div>
            <div className="md:w-1/2 text-left">
              <h2 className="text-3xl md:text-4xl font-normal mb-2 font-heading text-forest-green">
                A Legacy of the Land
              </h2>
              <p className="text-natural-brown font-body text-sm mb-6">
                Parale Ninai, Kolhapur
              </p>
              <p className="text-dark-charcoal font-body text-sm leading-relaxed mb-4">
                For generations, this land has nourished life, culture, and community. Rooted in the rich soil of the Western Ghats, Bambardara carries forward a legacy of sustainable farming, heritage hospitality, and deep respect for nature. Every corner of our estate tells a story of tradition meeting innovation, where the earth's abundance is celebrated and preserved for future generations.
              </p>
              <p className="text-dark-charcoal font-body text-sm leading-relaxed mb-4">
                Nestled in the pristine landscapes of Taluka Shahuwadi, our estate is a testament to the enduring beauty of Maharashtra. We envision a space where the rapid pace of modern life slows to the rhythm of nature.
              </p>
              <p className="text-dark-charcoal font-body text-sm leading-relaxed">
                Here, luxury isn't just about comfort; it's about the privilege of experiencing the raw, untamed elegance of the natural world, preserved and presented with profound respect.
              </p>
            </div>
          </div>
        </section>

        <section data-scroll-reveal className="scroll-reveal py-16 px-4 bg-ivory-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-normal mb-6 font-heading text-forest-green">
              A promise of purity and peace.
            </h2>
            <p className="text-dark-charcoal font-body text-sm leading-relaxed max-w-3xl mx-auto mb-16">
              Our journey is guided by a deep commitment to sustainability, heritage, and holistic well-being. Every step we take reflects our mission to harmonize luxury with nature and our vision to create a sanctuary that inspires generations.
            </p>

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-luxury-gold"></div>

              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-end">
                    <FaBullseye className="text-luxury-gold text-4xl" />
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-luxury-gold border-4 border-white shadow relative z-10"></div>
                  <div className="md:w-1/2 text-left">
                    <h3 className="text-2xl font-semibold mb-1 font-heading text-forest-green">Our Mission</h3>
                    <p className="text-luxury-gold font-body text-xs font-semibold uppercase tracking-wide mb-2">Our Purpose</p>
                    <p className="text-dark-charcoal font-body text-sm leading-relaxed">
                      To redefine luxury travel by blending world-class hospitality with authentic agrotourism, preserving the heritage of the Western Ghats while empowering local communities.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 text-right">
                    <h3 className="text-2xl font-semibold mb-1 font-heading text-forest-green">Our Vision</h3>
                    <p className="text-luxury-gold font-body text-xs font-semibold uppercase tracking-wide mb-2">Our Aspiration</p>
                    <p className="text-dark-charcoal font-body text-sm leading-relaxed">
                      To become India's premier destination for sustainable luxury, where guests reconnect with nature, culture, and themselves through immersive experiences.
                    </p>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-luxury-gold border-4 border-white shadow relative z-10"></div>
                  <div className="md:w-1/2 flex justify-start">
                    <FaEye className="text-luxury-gold text-4xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-scroll-reveal className="scroll-reveal py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-normal mb-10 font-heading text-forest-green">
              Board of Directors
            </h2>
            <div className="flex justify-center items-start gap-8 md:gap-16" style={{ minHeight: '500px' }}>
              {directors.map((director, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ease-in-out ${
                    activeDirector === null ? 'w-auto' : activeDirector === index ? 'w-full md:w-4/5' : 'w-0 opacity-0'
                  }`}
                >
                  <div
                    className={`flex items-start gap-8 transition-all duration-500 ${
                      activeDirector === index ? 'flex-col md:flex-row' : 'flex-col items-center'
                    }`}
                  >
                    <img
                      src={director.imgSrc}
                      alt={director.name}
                      onClick={() => setActiveDirector(activeDirector === index ? null : index)}
                      className={`cursor-pointer rounded-lg object-cover shadow-lg transition-all duration-500 flex-shrink-0 ${
                        activeDirector === index ? 'w-full md:w-56 h-auto' : 'w-48 h-56'
                      }`}
                    />
                    <div
                      className={`text-center transition-all duration-500 ${
                        activeDirector === index ? 'md:text-left' : ''
                      } ${
                        activeDirector !== null && activeDirector !== index ? 'hidden' : ''
                      }`}
                    >
                      <h3 className={`mt-4 font-heading text-forest-green font-semibold transition-all duration-500 ${activeDirector === index ? 'text-2xl' : 'text-xl'}`}>
                        {director.name}
                      </h3>
                      <p className={`text-dark-charcoal font-body transition-all duration-500 ${activeDirector === index ? 'text-lg' : 'text-md'}`}>
                        {director.title}
                      </p>
                      <div
                        className={`overflow-hidden text-left transition-all duration-700 ease-in-out ${
                          activeDirector === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-sm text-gray-600">{director.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
  );
};

export default Hero;
