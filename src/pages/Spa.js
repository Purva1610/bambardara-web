import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import { FaPlus, FaMinus } from 'react-icons/fa';

// FAQ Accordion Component
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'WHAT IS AYURVEDIC MASSAGE?',
      answer: 'Ayurvedic massage is an ancient healing practice rooted in the 5,000-year-old science of Ayurveda. It uses warm herbal oils and specific techniques to balance the body\'s energies (doshas), promote circulation, eliminate toxins, and restore harmony between body, mind, and spirit.'
    },
    {
      question: 'WHAT ARE THE BENEFITS OF SPA TREATMENTS?',
      answer: 'Our spa treatments offer numerous benefits including stress relief, improved circulation, detoxification, enhanced skin health, pain relief, better sleep quality, and overall rejuvenation. Each treatment is designed to address specific wellness goals while promoting deep relaxation.'
    },
    {
      question: 'HOW MANY SESSIONS WILL I NEED?',
      answer: 'The number of sessions depends on your individual wellness goals and current condition. Some guests experience significant benefits after a single session, while others prefer a series of treatments for lasting results. Our therapists will recommend a personalized treatment plan during your consultation.'
    },
    {
      question: 'DO YOU OFFER CUSTOM TREATMENT PACKAGES?',
      answer: 'Yes! We offer personalized treatment packages tailored to your specific needs and wellness objectives. Our expert therapists will work with you to create a customized plan combining various Ayurvedic and spa therapies for optimal results.'
    },
    {
      question: 'WHERE IS BAMBARDDARA WELLNESS SPA LOCATED?',
      answer: 'Our luxury wellness spa is nestled within the Bambarddara estate in the heart of Maharashtra, surrounded by pristine nature. The serene mountain setting provides the perfect backdrop for your healing and rejuvenation journey.'
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border-b border-stone pb-4">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between text-left group"
          >
            <h3 className="text-base md:text-lg font-light text-forest-green uppercase tracking-wide group-hover:text-luxury-gold transition-colors pr-4">
              {faq.question}
            </h3>
            <span className="flex-shrink-0 text-luxury-gold">
              {openIndex === idx ? <FaMinus className="text-sm" /> : <FaPlus className="text-sm" />}
            </span>
          </button>
          {openIndex === idx && (
            <div className="mt-4 text-light-charcoal font-light text-sm md:text-base leading-relaxed animate-fadeIn">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Spa() {
  return (
    <main className="bg-ivory-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <EstateImage
            slug="spa-and-wellness-2"
            alt="Luxurious Back Massage"
            sizes="100vw"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-ivory-white mb-6 leading-tight tracking-wide">
              The Deepest Breathe Your Body Ever Took
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base md:text-lg text-ivory-white/90 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the profound stillness of Ayurvedic rituals. From warm oil therapies to herbal smoothing scrubs, rediscover the art of feeling truly relaxed.
            </p>
          </Reveal>

          <Reveal delay={350}>
            <Link
              to="/enquire"
              className="inline-block px-8 py-3 border border-ivory-white text-ivory-white text-sm tracking-[0.15em] uppercase font-light hover:bg-ivory-white hover:text-deep-forest transition-all duration-300"
            >
              Explore Services
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-ivory-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light text-center text-forest-green mb-16 leading-tight tracking-wide">
              Harmony of Body and Mind
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <EstateImage
                  slug="organic-farming-and-farm-stay-2"
                  alt="Facial Massage"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <EstateImage
                  slug="spa-and-wellness-2"
                  alt="Fire Cupping Ritual"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <p className="text-center text-light-charcoal font-light text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
              We believe that well-being is the harmonious interaction between the physical and the mental. Our massages are intentional, quiet, and grounding, designed to support balance in a world that often demands too much of you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TREATMENT 1: COSMETIC ACUPUNCTURE */}
      <section className="py-20 md:py-24 px-6 md:px-16 bg-warm-sand">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left - Text */}
            <Reveal>
              <div>
                <h3 className="text-3xl md:text-4xl font-light text-forest-green mb-6 uppercase tracking-wide">
                  The Art of the Deep Unwind: Our Signature Spa Massages
                </h3>
                <p className="text-light-charcoal font-light text-base leading-relaxed mb-8">
                  Rediscover your natural radiance through time-honored Ayurvedic rituals that harmonize the body, mind, and spirit. Unlike modern surface-level treatments, our specialized massages and spa therapies utilize ancient Indian wisdom and pure botanical oils to stimulate vital energy centers and improve skin vitality from within. Each session is a personalized journey of restoration, precisely tailored to your unique skin type and wellness goals to leave you with a luminous, smooth, and naturally rejuvenated complexion.
                </p>
                <Link
                  to="/enquire"
                  className="inline-block px-8 py-3 bg-deep-forest text-ivory-white text-sm tracking-[0.15em] uppercase font-light hover:bg-forest-green transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </Reveal>

            {/* Right - Image */}
            <Reveal delay={200}>
              <div className="relative h-80 md:h-96 overflow-hidden">
                <EstateImage
                  slug="luxury-hotel-rooms-and-suites-3"
                  alt="Cosmetic Acupuncture"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TREATMENT 2: HOLISTIC MICRONEEDLING */}
      <section className="py-20 md:py-24 px-6 md:px-16 bg-ivory-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left - Image */}
            <Reveal>
              <div className="relative h-[500px] md:h-[600px] overflow-hidden md:order-1">
                <EstateImage
                  slug="organic-farming-and-farm-stay-3"
                  alt="Holistic Microneedling"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            {/* Right - Text */}
            <Reveal delay={200}>
              <div className="md:order-2">
                <h3 className="text-3xl md:text-4xl font-light text-forest-green mb-6 uppercase tracking-wide">
                  The Sacred Return: Authentic Ayurvedic Rituals
                </h3>
                <p className="text-light-charcoal font-light text-base leading-relaxed mb-8">
                  Ayurveda, the 5,000-year-old "Science of Life," teaches that true beauty is not a surface-level destination but a profound reflection of inner balance between the body, mind, and spirit. In this sanctuary, we view Ayurvedic massages as far more than a luxury; they are a quiet, grounding way to support your natural rhythm in an overstimulating world. Each ritual serves as a gentle reset—soothing the nervous system and restoring vital energy through timeless traditions like Abhyanga (warm oil therapy) and Shiro Abhyanga (herbal head massage). By harmonising the five basic elements within—Space, Air, Fire, Water, and Earth—these therapies encourage ageless beauty and spiritual growth, reminding you that your radiance is innate and eternally connected to nature.
                </p>
                <Link
                  to="/enquire"
                  className="inline-block px-8 py-3 bg-deep-forest text-ivory-white text-sm tracking-[0.15em] uppercase font-light hover:bg-forest-green transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ALL SERVICES SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-warm-sand">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light text-center text-forest-green mb-16 uppercase tracking-wide">
              All Services
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  image: 'spa-and-wellness-2',
                  title: 'Cupping Therapy',
                },
                {
                  image: 'organic-farming-and-farm-stay-2',
                  title: 'Body Massage',
                },
                {
                  image: 'luxury-hotel-rooms-and-suites-3',
                  title: 'Facial Treatment',
                },
              ].map((service, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="group cursor-pointer">
                    <div className="relative h-80 overflow-hidden mb-4">
                      <EstateImage
                        slug={service.image}
                        alt={service.title}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="text-lg font-light text-forest-green group-hover:text-luxury-gold transition-colors">{service.title}</h4>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT THE FOUNDER SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-ivory-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column - Text */}
            <Reveal>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-light text-forest-green mb-6 leading-tight">
                    Our Team of Expert Therapists
                  </h3>
                  <p className="text-light-charcoal font-light text-base leading-relaxed mb-4">
                    At Bambarddara, our team is comprised of highly qualified, licensed therapists and practitioners who bring a wealth of diverse experience in holistic wellness and advanced beauty treatments.
                  </p>
                  <p className="text-light-charcoal font-light text-base leading-relaxed mb-8">
                    Every member of our staff is dedicated to blending ancient healing wisdom with modern, evidence-based techniques to support your unique wellness and rejuvenation journey.
                  </p>
                </div>
                <Link
                  to="/enquire"
                  className="inline-block px-8 py-3 bg-deep-forest text-ivory-white text-sm tracking-[0.15em] uppercase font-light hover:bg-forest-green transition-all duration-300"
                >
                  Learn More About Us
                </Link>
              </div>
            </Reveal>

            {/* Middle Column - Large Photo */}
            <Reveal delay={150}>
              <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                <EstateImage
                  slug="organic-farming-and-farm-stay-2"
                  alt="Two women relaxing in white robes"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            {/* Right Column - Portrait Photo */}
            <Reveal delay={300}>
              <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                <EstateImage
                  slug="luxury-hotel-rooms-and-suites-3"
                  alt="Female practitioner portrait"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE PROCESS - THREE-STEP JOURNEY BANNER */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <EstateImage
            slug="spa-and-wellness-2"
            alt="Jade Gua Sha facial massage"
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-light text-white text-center mb-16 uppercase tracking-wide">
              The Process
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: 'YOUR INITIAL INTAKE CONSULTATION',
                  desc: 'Comprehensive assessment of your wellness goals and health history to create a personalized treatment approach.'
                },
                {
                  title: 'YOUR PERSONALIZED WELLNESS PLAN',
                  desc: 'Customized treatment protocol designed specifically for your unique needs and desired outcomes.'
                },
                {
                  title: 'YOUR CONTINUED CARE',
                  desc: 'Ongoing support and adjustments to your wellness journey as your body responds and transforms.'
                },
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-lg md:text-xl font-light text-white mb-4 uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-white/80 font-light text-sm md:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CALL-TO-ACTION SECTION */}
      <section className="py-20 md:py-24 px-6 md:px-16 bg-warm-sand">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left - Image */}
            <Reveal>
              <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                <EstateImage
                  slug="organic-farming-and-farm-stay-3"
                  alt="Woman receiving facial massage"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            {/* Right - Text */}
            <Reveal delay={200}>
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-forest-green mb-6 leading-tight">
                  BEGIN YOUR JOURNEY FROM BEAUTY INTO RITUAL.
                </h2>
                <p className="text-light-charcoal font-light text-base leading-relaxed mb-8">
                  Transform your approach to wellness with our holistic treatments that honor both ancient traditions and modern understanding. Each session is a sacred ritual designed to restore balance and enhance your natural radiance.
                </p>
                <Link
                  to="/enquire"
                  className="inline-block px-10 py-4 bg-deep-forest text-ivory-white text-sm tracking-[0.15em] uppercase font-light hover:bg-forest-green transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ & TREATMENT SPLIT SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-ivory-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left - FAQ */}
            <Reveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-forest-green mb-12 uppercase tracking-wide">
                  FAQ
                </h2>
                <FAQAccordion />
              </div>
            </Reveal>

            {/* Right - Photo */}
            <Reveal delay={200}>
              <div className="relative h-[400px] md:h-[500px] overflow-hidden mt-12 md:mt-0">
                <EstateImage
                  slug="luxury-hotel-rooms-and-suites-3"
                  alt="Practitioner setting up treatment table"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INSTAGRAM / SOCIAL FEED FOOTER GALLERY */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-warm-sand">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light text-center text-forest-green mb-12 uppercase tracking-wide">
              Follow The Story
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                'spa-and-wellness-2',
                'organic-farming-and-farm-stay-2',
                'luxury-hotel-rooms-and-suites-3',
                'organic-farming-and-farm-stay-3',
                'spa-and-wellness-2',
              ].map((image, idx) => (
                <Reveal key={idx} delay={idx * 50}>
                  <div className="relative aspect-square overflow-hidden">
                    <EstateImage
                      slug={image}
                      alt={`Spa treatment ${idx + 1}`}
                      sizes="(min-width: 768px) 20vw, 50vw"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-deep-forest text-ivory-white">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-muted-gold text-xs tracking-[0.3em] uppercase mb-6 font-light">
              BEGIN YOUR WELLNESS JOURNEY
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              Schedule Your Perfect Treatment
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-base md:text-lg text-ivory-white/90 font-light mb-12 max-w-2xl mx-auto">
              Contact our wellness specialists to book your personalized spa experience
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/enquire"
                className="px-10 py-4 bg-luxury-gold text-deep-forest text-sm tracking-[0.15em] uppercase font-light hover:bg-muted-gold transition-all duration-300"
              >
                Book Now
              </Link>
              <a
                href="tel:+917588775757"
                className="px-10 py-4 border border-ivory-white/30 text-ivory-white text-sm tracking-[0.15em] uppercase font-light hover:border-ivory-white hover:bg-ivory-white/5 transition-all duration-300"
              >
                Call Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
