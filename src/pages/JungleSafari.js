import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPaw,
  FaCameraRetro,
  FaFeatherAlt,
  FaMountain,
  FaUsers,
  FaChild,
  FaHiking,
  FaFirstAid,
  FaLeaf,
  FaUserShield,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { GiJeep } from 'react-icons/gi';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

import JungleSafariHero from '../components/experiences/JungleSafariHero';
import JungleSafariDestinations from '../components/experiences/JungleSafariDestinations';
import JungleSafariWhyUs from '../components/experiences/JungleSafariWhyUs';

const HIGHLIGHTS = [
  { icon: GiJeep, label: 'Open Jeep Safari' },
  { icon: FaPaw, label: 'Wildlife Spotting' },
  { icon: FaCameraRetro, label: 'Nature Photography' },
  { icon: FaFeatherAlt, label: 'Bird Watching' },
  { icon: FaMountain, label: 'Scenic Views' },
];

const GALLERY = [
  { slug: 'forest-trails', caption: 'Forest Trails' },
  { slug: 'open-drives', caption: 'Open Jeep Drives' },
  { slug: 'wild-landscapes', caption: 'Wild Landscapes' },
  { slug: 'cascading-waterfalls', caption: 'Cascading Waterfalls' },
];

const PERFECT_FOR = [
  { icon: FaChild, label: 'Families' },
  { icon: FaUsers, label: 'Groups' },
  { icon: FaCameraRetro, label: 'Photographers' },
  { icon: FaHiking, label: 'Adventure Lovers' },
];

const SAFETY = [
  { icon: FaUserShield, label: 'Experienced Guides' },
  { icon: GiJeep, label: 'Safe & Comfortable Ride' },
  { icon: FaFirstAid, label: 'First Aid Support' },
  { icon: FaLeaf, label: 'Eco-Friendly Tourism' },
];

export default function JungleSafari() {
  return (
    <main className="bg-ivory-white">
      {/* ── HERO SECTION: EXACT REFERENCE DESIGN ── */}
      <JungleSafariHero />

      {/* ── NEXT SECTION: EMBARK ON A JOURNEY OF A LIFETIME (EXACT REFERENCE) ── */}
      <JungleSafariDestinations />

      {/* ── NEXT SECTION: WHY SIDAI AFRICA SAFARIS? (EXACT REFERENCE) ── */}
      <JungleSafariWhyUs />

      {/* ── SAFARI OVERVIEW & HIGHLIGHTS ── */}
      <section
        id="safari-sanctuary-highlights"
        className="bg-[#120f0c] text-ivory-white py-16 md:py-24 border-b border-white/10"
      >
        <div className="mx-auto max-w-editorial px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-10">
            <div>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                Reserve Intelligence
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
                Into the Heart of the Sanctuary
              </h2>
            </div>
            <Link to="/enquire" className="lux-btn-light self-start md:self-auto shrink-0">
              <span>Book Your Safari Today</span>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                className="flex flex-col items-center text-center p-5 rounded-sm bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all duration-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] mb-3">
                  <h.icon className="h-5 w-5" />
                </span>
                <span className="font-body text-xs uppercase font-medium tracking-wider text-white/90">
                  {h.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl font-body text-sm sm:text-base font-light leading-relaxed text-white/75">
            Drive through dense forests, scenic trails, and breathtaking landscapes of Bambardara Reserve.
            Spot native wildlife, vibrant birds, and experience the raw majesty of nature in open-top 4x4 safari vehicles.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="From the Reserve"
            title={
              <>
                Moments From
                <span className="block italic text-luxury-gold">the Trail</span>
              </>
            }
            align="center"
            className="mb-16 md:mb-20"
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {GALLERY.map((item, idx) => (
              <Reveal key={item.slug} delay={idx * 100}>
                <div className="lux-frame aspect-[4/5] w-full">
                  <EstateImage
                    slug={item.slug}
                    alt={item.caption}
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="isolate"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="font-heading text-base font-light text-ivory-white md:text-lg">
                      {item.caption}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PERFECT FOR + SAFETY */}
      <div className="bg-deep-forest">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <span className="lux-label text-muted-gold">Perfect For</span>
              <div className="mt-8 grid grid-cols-2 gap-8">
                {PERFECT_FOR.map((p) => (
                  <div key={p.label} className="flex flex-col items-center text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-luxury-gold/30 text-luxury-gold">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <span className="mt-3 font-body text-[0.7rem] uppercase tracking-wider text-ivory-white/80">
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="lux-label text-muted-gold">Safety & Comfort</span>
              <ul className="mt-8 space-y-5">
                {SAFETY.map((s) => (
                  <li key={s.label} className="flex items-center gap-4">
                    <s.icon className="h-5 w-5 flex-shrink-0 text-luxury-gold" />
                    <span className="font-body text-sm font-light text-ivory-white/85">
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-warm-sand px-6 py-20 text-center md:px-10 md:py-28">
        <p className="mx-auto max-w-md font-heading text-xl italic font-light leading-relaxed text-forest-green">
          Leave only footprints,
          <span className="block">take only memories.</span>
        </p>
        <Link to="/enquire" className="lux-btn-dark mt-8 inline-flex">
          <span>Book Your Safari Today</span>
        </Link>
        <p className="mx-auto mt-8 flex items-center justify-center gap-2 font-body text-[0.8rem] font-light text-light-charcoal">
          <FaMapMarkerAlt className="h-3.5 w-3.5 flex-shrink-0 text-luxury-gold" />
          Parale, Ninai, Shahuwadi, Kolhapur, Maharashtra &ndash; 415101
        </p>
      </section>
    </main>
  );
}
