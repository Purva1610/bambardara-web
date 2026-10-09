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

const HIGHLIGHTS = [
  { icon: GiJeep, label: 'Open Jeep Safari' },
  { icon: FaPaw, label: 'Wildlife Spotting' },
  { icon: FaCameraRetro, label: 'Nature Photography' },
  { icon: FaFeatherAlt, label: 'Bird Watching' },
  { icon: FaMountain, label: 'Scenic Views' },
];

const GALLERY = [
  { slug: 'jungle', caption: 'Forest Trails' },
  { slug: 'jungle-safari', caption: 'Open Jeep Drives' },
  { slug: 'waterfalls-and-nature-trails-2', caption: 'Wild Landscapes' },
  { slug: 'waterfall', caption: 'Cascading Waterfalls' },
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
      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-end overflow-hidden bg-deep-forest">
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="jungle"
            alt="An open jeep on a jungle safari at the estate"
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="lux-scrim absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-16 md:px-10 md:pb-24">
          <Reveal>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[0.7rem] uppercase tracking-[0.2em] text-muted-gold">
              <span>Explore the Wild</span>
              <span>&bull;</span>
              <span>Feel the Adventure</span>
              <span>&bull;</span>
              <span>Experience Nature</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-5 max-w-2xl text-section font-heading font-light leading-[1.06] text-ivory-white">
              Jungle
              <span className="italic text-luxury-gold"> Safari</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 font-heading text-lg italic font-light text-luxury-gold">
              An unforgettable adventure into the heart of nature.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-6">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="flex flex-col items-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-luxury-gold/40 bg-ivory-white/10 text-ivory-white backdrop-blur-sm">
                    <h.icon className="h-4 w-4" />
                  </span>
                  <span className="mt-2 max-w-[6rem] font-body text-[0.62rem] uppercase leading-tight tracking-wider text-ivory-white/80">
                    {h.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-10 max-w-prose font-body text-[0.9rem] font-light leading-[1.9] text-ivory-white/75">
              Drive through dense forests, scenic trails and breathtaking
              landscapes. Spot native wildlife, colourful birds and explore
              the beauty of nature like never before.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <Link to="/enquire" className="lux-btn-light mt-9 inline-flex">
              <span>Book Your Safari Today</span>
            </Link>
          </Reveal>
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
