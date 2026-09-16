import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

const SERVICES = [
  { slug: 'cupping', title: 'Cupping Therapy', duration: '45 mins' },
  { slug: 'body', title: 'Body Massage', duration: '60 mins' },
  { slug: 'facial', title: 'Facial Treatment', duration: '50 mins' },
  { slug: 'hydrotherapy', title: 'Hydrotherapy & Body Wraps', duration: '75 mins' },
  { slug: 'energy', title: 'Holistic & Energy Healing', duration: '60 mins' },
  { slug: 'sauna', title: 'Infrared Sauna', duration: '30 mins' },
];

const TIME_SLOTS = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];

export default function SpaBooking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-ivory-white overflow-hidden">
      {/* HERO */}
      <section className="relative h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full isolate">
          <EstateImage
            slug="ritual"
            alt="Reserve Your Spa Ritual"
            sizes="100vw"
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-[5] bg-black/60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Reveal>
            <p className="text-muted-gold text-xs tracking-[0.3em] uppercase mb-6 font-light">
              Bambarddara Wellness Spa
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-ivory-white mb-6 leading-tight tracking-wide">
              Reserve Your Spa Ritual
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-base md:text-lg text-ivory-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              Choose your treatment, your time, and let our therapists take care of the rest.
            </p>
          </Reveal>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-ivory-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* LEFT — form */}
          <div className="lg:col-span-3">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light text-forest-green mb-4 uppercase tracking-wide">
                Book Your Treatment
              </h2>
              <p className="text-light-charcoal font-light text-base leading-relaxed mb-10">
                Tell us what you need and our wellness specialists will confirm your appointment by phone or email.
              </p>
            </Reveal>

            {submitted ? (
              <Reveal delay={150}>
                <div className="border border-forest-green/30 bg-forest-green/5 p-8 md:p-10">
                  <p className="font-light text-xl text-forest-green uppercase tracking-wide">
                    Request Received
                  </p>
                  <p className="mt-3 text-light-charcoal font-light text-base leading-relaxed">
                    Thank you for choosing Bambarddara Wellness Spa. A wellness specialist will
                    confirm your appointment by phone or email shortly.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={150}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-light-charcoal">
                      Treatment *
                    </label>
                    <select
                      required
                      defaultValue=""
                      className="w-full border border-stone bg-warm-sand px-4 py-3 font-light text-sm text-forest-green focus:outline-none focus:border-luxury-gold"
                    >
                      <option value="" disabled>
                        Select a treatment
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title} — {s.duration}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-light-charcoal">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full border border-stone bg-warm-sand px-4 py-3 font-light text-sm text-forest-green focus:outline-none focus:border-luxury-gold"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-light-charcoal">
                        Preferred Time *
                      </label>
                      <select
                        required
                        defaultValue=""
                        className="w-full border border-stone bg-warm-sand px-4 py-3 font-light text-sm text-forest-green focus:outline-none focus:border-luxury-gold"
                      >
                        <option value="" disabled>
                          Select a time
                        </option>
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-light-charcoal">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        className="w-full border border-stone bg-warm-sand px-4 py-3 font-light text-sm text-forest-green placeholder:text-light-charcoal/50 focus:outline-none focus:border-luxury-gold"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-light-charcoal">
                        Number of Guests *
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        placeholder="1"
                        className="w-full border border-stone bg-warm-sand px-4 py-3 font-light text-sm text-forest-green placeholder:text-light-charcoal/50 focus:outline-none focus:border-luxury-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-light-charcoal">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full border border-stone bg-warm-sand px-4 py-3 font-light text-sm text-forest-green placeholder:text-light-charcoal/50 focus:outline-none focus:border-luxury-gold"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-light-charcoal">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full border border-stone bg-warm-sand px-4 py-3 font-light text-sm text-forest-green placeholder:text-light-charcoal/50 focus:outline-none focus:border-luxury-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-light-charcoal">
                      Special Requests
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Allergies, pressure preference, anything we should know"
                      className="w-full border border-stone bg-warm-sand px-4 py-3 font-light text-sm text-forest-green placeholder:text-light-charcoal/50 focus:outline-none focus:border-luxury-gold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 bg-deep-forest text-ivory-white text-sm tracking-[0.15em] uppercase font-light hover:bg-forest-green transition-all duration-300"
                  >
                    Request Appointment
                  </button>
                </form>
              </Reveal>
            )}
          </div>

          {/* RIGHT — image + info */}
          <div className="lg:col-span-2">
            <Reveal delay={200}>
              <div className="relative h-80 md:h-96 overflow-hidden mb-8">
                <EstateImage
                  slug="book-spa"
                  alt="Luxury spa treatment suite"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="border border-stone bg-warm-sand p-8">
                <h3 className="text-lg font-light text-forest-green mb-6 uppercase tracking-wide">
                  What to Expect
                </h3>
                <ul className="space-y-4">
                  {[
                    'Arrive 15 minutes early for a brief wellness consultation',
                    'Complimentary herbal tea before and after your session',
                    'Private treatment suite with estate views',
                    'Licensed therapists trained in Ayurvedic and modern techniques',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm font-light text-light-charcoal leading-relaxed"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-luxury-gold" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-center text-sm font-light text-light-charcoal/70">
                  Prefer to talk it through?{' '}
                  <a
                    href="tel:+917588775757"
                    className="text-forest-green underline-offset-4 hover:underline"
                  >
                    Call the estate
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <Link
                to="/spa"
                className="mt-8 inline-block text-xs uppercase tracking-[0.15em] text-forest-green hover:text-luxury-gold transition-colors"
              >
                &larr; Back to Spa & Wellness
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
