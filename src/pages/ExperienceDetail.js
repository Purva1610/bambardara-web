import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import { EXPERIENCE_TYPES, getExperienceById } from '../data/experiences';

export default function ExperienceDetail() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const experience = getExperienceById(id);

  if (!experience) {
    return <Navigate to="/experiences" replace />;
  }

  const typeMeta = EXPERIENCE_TYPES[experience.type];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-ivory-white">
      {/* HERO */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-deep-forest">
        <div className="absolute inset-0">
          <EstateImage
            slug={experience.gallery[activeImage]}
            alt={experience.title}
            sizes="100vw"
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="lux-scrim absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-14 md:px-10 md:pb-20">
          <Reveal>
            <Link
              to={`/experiences/${experience.type}`}
              className="lux-label text-muted-gold transition-colors hover:text-ivory-white"
            >
              &larr; {typeMeta?.label}
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <span className="mt-6 block font-body text-[0.7rem] uppercase tracking-wider text-muted-gold">
              {experience.category}
            </span>
          </Reveal>
          <Reveal delay={180}>
            <h1 className="mt-2 text-section font-heading font-light text-ivory-white">
              {experience.title}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* DETAILS */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* LEFT — description, gallery, amenities */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-body text-[0.95rem] font-light leading-[1.9] text-light-charcoal">
                {experience.longDescription}
              </p>
            </Reveal>

            {experience.gallery.length > 1 && (
              <Reveal delay={120} className="mt-14">
                <span className="lux-label text-luxury-gold">Gallery</span>
                <div className="lux-frame mt-6 aspect-[16/10] w-full">
                  <EstateImage
                    slug={experience.gallery[activeImage]}
                    alt={`${experience.title} photo ${activeImage + 1}`}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </div>
                <div className="mt-4 flex gap-3">
                  {experience.gallery.map((slug, idx) => (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      aria-label={`Show photo ${idx + 1}`}
                      aria-current={activeImage === idx}
                      className={`h-20 w-20 flex-shrink-0 overflow-hidden border-2 transition-colors duration-300 ${
                        activeImage === idx
                          ? 'border-luxury-gold'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <EstateImage
                        slug={slug}
                        alt={`${experience.title} photo ${idx + 1}`}
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={200} className="mt-14">
              <span className="lux-label text-luxury-gold">What&apos;s Included</span>
              <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {experience.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-start gap-3 font-body text-sm font-light text-light-charcoal"
                  >
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-luxury-gold" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* RIGHT — booking card */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal delay={100}>
                <div className="border border-stone bg-warm-sand p-8 md:p-10">
                  <span className="lux-label text-luxury-gold">Reserve This Experience</span>

                  <dl className="mt-6 space-y-4 border-y border-stone py-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                        Duration
                      </dt>
                      <dd className="text-right font-body text-sm text-dark-charcoal">
                        {experience.duration}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                        Group Size
                      </dt>
                      <dd className="text-right font-body text-sm text-dark-charcoal">
                        {experience.groupSize}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                        Difficulty
                      </dt>
                      <dd className="text-right font-body text-sm text-dark-charcoal">
                        {experience.difficulty}
                      </dd>
                    </div>
                  </dl>

                  {submitted ? (
                    <div className="mt-8 border border-forest-green/30 bg-forest-green/5 p-6 text-center">
                      <p className="font-heading text-lg font-light text-forest-green">
                        Request received
                      </p>
                      <p className="mt-2 font-body text-sm font-light text-light-charcoal">
                        An experience specialist will confirm your slot by phone or
                        email shortly.
                      </p>
                    </div>
                  ) : (
                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                      <div>
                        <label className="mb-2 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full border border-stone bg-ivory-white px-4 py-3 font-body text-sm"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                          Party Size *
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          placeholder="2"
                          className="w-full border border-stone bg-ivory-white px-4 py-3 font-body text-sm"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          className="w-full border border-stone bg-ivory-white px-4 py-3 font-body text-sm"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full border border-stone bg-ivory-white px-4 py-3 font-body text-sm"
                        />
                      </div>
                      <button type="submit" className="lux-btn-dark mt-4 w-full">
                        <span>Request Reservation</span>
                      </button>
                    </form>
                  )}

                  <p className="mt-6 text-center font-body text-[0.75rem] font-light text-light-charcoal/70">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
