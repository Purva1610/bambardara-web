import React from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/EstateImage';
import Reveal from '../components/Reveal';

const DETAILS = [
  { label: 'The Estate', lines: ['Parale Ninai, Kolhapur', 'Maharashtra 416 003, India'] },
  { label: 'Reservations', lines: ['+91 12345 67890', 'Daily, 08:00 – 21:00 IST'] },
  { label: 'Correspondence', lines: ['stay@bambardara.com', 'events@bambardara.com'] },
  { label: 'Arrivals', lines: ['Kolhapur airport, 38 km', 'Helipad on the north field'] },
];

export default function Enquiry() {
  return (
    <section id="enquire" className="relative overflow-hidden bg-deep-forest">
      <EstateImage
        slug="waterfall"
        alt=""
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-deep-forest/70" />

      <div className="relative mx-auto max-w-editorial px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="lux-label text-muted-gold">Reservations</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-7 text-section font-heading font-light text-ivory-white">
              The gate opens
              <span className="block italic text-muted-gold">
                every morning at sunrise
              </span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 max-w-prose font-body text-[0.95rem] font-light leading-[1.9] text-ivory-white/75">
              Stays, farm days and occasions are booked directly with the estate.
              No agents, no allocation, and never more than one party on exclusive
              use at a time.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-4">
              <Link to="/enquire" className="lux-btn-light">
                <span>Begin an Enquiry</span>
              </Link>
              <a href="tel:+911234567890" className="lux-btn-light">
                <span>Call the Estate</span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-y-12 border-t border-ivory-white/15 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((d, i) => (
            <Reveal key={d.label} delay={i * 110} className="lg:px-4">
              <span className="lux-label text-muted-gold">{d.label}</span>
              <div className="mt-5 space-y-1">
                {d.lines.map((line) => (
                  <p
                    key={line}
                    className="font-body text-[0.875rem] font-light leading-relaxed text-ivory-white/70"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
