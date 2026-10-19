import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TreeClimbingHero, { TREE_SPECIES } from '../components/experiences/TreeClimbingHero';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';
import {
  FaShieldAlt,
  FaCheck,
  FaAward,
  FaTree,
  FaRulerVertical,
  FaUserShield,
  FaPhoneAlt,
} from 'react-icons/fa';

const STATS = [
  { label: 'Max Canopy Elevation', value: '40 Meters', icon: FaRulerVertical },
  { label: 'Safety Redundancy', value: '100% Dual Line', icon: FaShieldAlt },
  { label: 'Certified Arborists', value: '1 : 3 Ratio', icon: FaUserShield },
  { label: 'Tree Species Available', value: '4 Heritage Trees', icon: FaTree },
];

const CLIMBING_CIRCUITS = [
  {
    title: 'Heritage Teak High Ascent',
    species: 'Grand Teak (40m)',
    difficulty: 'Intermediate to Advanced',
    duration: '90 Minutes',
    price: '₹950 / Climber',
    badge: 'Flagship Ascent',
    desc: 'Scale our signature ancient teak tree using single-rope mechanical ascenders and safety harnesses to reach a lofty high-bough panoramic viewing station over the Western Ghats.',
    features: [
      'Ascent to upper canopy observation station',
      'Full Petzl Sequoia arborist harness',
      'Certified climbing instructor alongside you',
      'Panoramic 360° Western Ghats forest view',
    ],
  },
  {
    title: 'Silver Oak Introductory Climb',
    species: 'Silver Oak (35m)',
    difficulty: 'Beginner & Family',
    duration: '60 Minutes',
    price: '₹650 / Climber',
    badge: 'Popular for Beginners',
    desc: 'Gentle, structured introduction to tree climbing techniques using natural limb footholds and a continuous top-rope auto-belay system for total comfort.',
    features: [
      'Accessible for ages 8 and above',
      'Ground-school knot and technique briefing',
      'Step-by-step assisted ascension lines',
      'Safe, peaceful mid-canopy rest bough',
    ],
  },
  {
    title: 'Heritage Teak Vertical Challenge',
    species: 'Grand Teak (40m)',
    difficulty: 'Athletic & Intermediate',
    duration: '75 Minutes',
    price: '₹800 / Climber',
    badge: 'Strength & Technique',
    desc: 'A pure vertical trunk ascension that tests your rhythm and technique along dense teak bark, leading to an open-air valley lookout.',
    features: [
      'Footloop ascenders & friction-hitch learning',
      'Guided foot-jamming & body positioning tips',
      'Valley-facing canopy belay station',
      'Action photos included by estate guide',
    ],
  },
  {
    title: 'Ancient Banyan Hammock Labyrinth',
    species: 'Sacred Banyan (28m)',
    difficulty: 'Explorer & Leisure',
    duration: '60 Minutes',
    price: '₹700 / Climber',
    badge: 'Nature Immersion',
    desc: 'Climb through natural aerial prop roots into a sprawling horizontal canopy cathedral where elevated resting hammocks await climbers.',
    features: [
      'Climb into natural sprawling branch nets',
      'Elevated treetop hammock relaxation time',
      'Fascinating ecological arborist commentary',
      'Suitable for couples, kids, and photographers',
    ],
  },
];

const SAFETY_PILLARS = [
  {
    title: 'ISA Certified Arborist Standards',
    desc: 'Designed strictly according to International Society of Arboriculture (ISA) canopy access protocols and tree preservation ethics.',
    icon: FaAward,
  },
  {
    title: 'Petzl Professional Arborist Gear',
    desc: 'Every guest is fitted with ergonomic Petzl Sequoia harnesses, ventilated climbing helmets, and dual redundant mechanical ascenders.',
    icon: FaShieldAlt,
  },
  {
    title: 'Zero-Harm Cambium Savers',
    desc: 'We never drive spikes or hardware into living wood. Low-friction branch webbing and cambium savers protect the trees at all times.',
    icon: FaTree,
  },
  {
    title: 'Continuous Ground & Aerial Supervision',
    desc: 'Strict 1:3 instructor-to-climber ratio ensures an experienced arborist guides every movement, lock-off, and descent.',
    icon: FaUserShield,
  },
];

const FAQS = [
  {
    q: 'Do I need previous rock climbing or rope experience?',
    a: 'Not at all! Over 80% of our climbers are first-timers. Our arborist instructors conduct a comprehensive ground briefing and fit you into mechanical ascenders that make upward movement smooth, stable, and completely secure.',
  },
  {
    q: 'What is the minimum age and weight limit?',
    a: 'The minimum age is 8 years old for the Silver Oak and Banyan circuits, and 12 years old for the Heritage Teak High Ascent. Climber weight limits are 25 kg minimum up to 120 kg maximum.',
  },
  {
    q: 'How safe is tree climbing compared to rock climbing?',
    a: 'Tree climbing with arborist-grade ropes and harnesses is exceptionally safe. You are connected to a redundant multi-rated anchor rope at all times. If you let go of the rope, your friction ascender locks automatically in place without slipping.',
  },
  {
    q: 'What should I wear for tree climbing?',
    a: 'Wear comfortable, athletic outdoor clothing (long pants are recommended to protect knees against bark) and sturdy closed-toe shoes or trail sneakers. Avoid loose jewelry.',
  },
];

export default function TreeClimbing() {
  const [selectedTree, setSelectedTree] = useState(TREE_SPECIES[0]);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    document.title = 'Bambarddara Tree Climbing — Canopy Ascent & Heritage Tree Adventures';
  }, []);

  const handleChooseTree = (tree) => {
    setSelectedTree(tree);
    const target = document.getElementById('tree-booking');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-ivory-white text-dark-charcoal">
      {/* HERO SECTION MATCHING REFERENCE EXACTLY */}
      <TreeClimbingHero onChooseTree={handleChooseTree} />

      {/* QUICK STATS TRUST BAR */}
      <section className="relative z-20 -mt-10 mx-auto max-w-editorial px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 rounded-2xl bg-ivory-white border border-stone/30 p-6 md:p-8 shadow-luxury">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-green/10 text-forest-green">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-heading text-xl md:text-2xl font-bold text-dark-charcoal">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-dark-charcoal/60 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT THE TREE CLIMBING EXPERIENCE */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <span className="lux-label text-forest-green">Heritage Tree Climbing</span>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-dark-charcoal leading-[1.2]">
                Scale Towering Giants With
                <span className="block font-medium text-forest-green">Professional Tree Climbing</span>
              </h2>
              <p className="mt-6 font-body text-base text-dark-charcoal/80 leading-relaxed">
                Experience the exhilarating art of recreational tree climbing at Bambardara Estate. Guided by certified professional arborists, you will master technical climbing saddles, rope ascenders, and footloops to ascend towering 40-meter teak and banyan trees. Move smoothly along vertical lifeline ropes high into the Sahyadri canopy, discovering an untouched realm where cool mountain breezes and panoramic valley views await.
              </p>
              <p className="mt-4 font-body text-sm text-dark-charcoal/70 leading-relaxed">
                From first-time climbers and adventurous families to seasoned outdoor enthusiasts, every ascent utilizes 100% redundant dual-line belays and non-invasive cambium savers that protect both climber and living tree canopy.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#circuits"
                  className="rounded-full bg-deep-forest px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-widest text-ivory-white transition-all duration-300 hover:bg-forest-green shadow-luxury"
                >
                  View Climbing Routes
                </a>
                <a
                  href="#safety"
                  className="rounded-full border border-dark-charcoal/30 bg-transparent px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-widest text-dark-charcoal transition-all duration-300 hover:bg-dark-charcoal/5"
                >
                  Safety Standards
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-2xl shadow-luxury-lg aspect-[4/3] group">
                <picture className="h-full w-full">
                  <source
                    srcSet={`${process.env.PUBLIC_URL}/images/opt/tree-climb-hero-1280.webp`}
                    type="image/webp"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/images/opt/tree-climb-hero-1280.jpg`}
                    alt="Adventurer scaling giant heritage tree at Bambarddara"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 text-white">
                  <div>
                    <span className="font-body text-xs font-semibold uppercase tracking-widest text-luxury-gold">
                      Certified Arborist Instruction
                    </span>
                    <h3 className="font-heading text-2xl font-light mt-1 text-white">
                      Guided Tree Climbing Ascent
                    </h3>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLIMBING CIRCUITS */}
      <section id="circuits" className="bg-warm-sand/30 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Curated Tree Routes"
            title={
              <>
                Choose Your
                <span className="block font-medium text-forest-green">Canopy Ascension</span>
              </>
            }
            lede="From gentle introductory rope climbs to high 65-foot canopy ascents, choose the tree and experience tailored to your adventure level."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLIMBING_CIRCUITS.map((circuit, idx) => (
              <Reveal key={circuit.title} delay={idx * 80}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-stone/40 bg-ivory-white p-8 md:p-10 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="rounded-full bg-forest-green/10 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-forest-green">
                        {circuit.badge}
                      </span>
                      <span className="font-heading text-xl font-bold text-luxury-gold">
                        {circuit.price}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-medium text-dark-charcoal">
                      {circuit.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-dark-charcoal/60 font-body">
                      <span>{circuit.species}</span>
                      <span>•</span>
                      <span>{circuit.duration}</span>
                      <span>•</span>
                      <span>{circuit.difficulty}</span>
                    </div>

                    <p className="mt-4 font-body text-sm text-dark-charcoal/80 leading-relaxed">
                      {circuit.desc}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-stone/30 pt-6">
                      {circuit.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-3 text-xs text-dark-charcoal/80">
                          <FaCheck className="h-3.5 w-3.5 text-forest-green shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      to={`/enquire?experience=tree-climbing&route=${encodeURIComponent(circuit.title)}`}
                      className="inline-flex w-full items-center justify-center rounded-lg bg-deep-forest py-3.5 text-xs font-semibold uppercase tracking-wider text-ivory-white transition-all duration-300 hover:bg-forest-green shadow-md"
                    >
                      <span>Book This Route</span>
                      <span className="ml-2" aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY & ARBORIST STANDARDS */}
      <section id="safety" className="bg-deep-forest px-6 py-20 text-ivory-white md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Safety Commitment"
            title={
              <>
                Arborist Engineering &
                <span className="block font-medium text-luxury-gold">Uncompromising Safety</span>
              </>
            }
            lede="Every anchor branch, rope, and saddle is inspected daily by certified professionals to guarantee total peace of mind 60 feet in the air."
            tone="light"
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAFETY_PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="flex h-full flex-col justify-between rounded-xl border border-white/15 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:border-luxury-gold/50 hover:bg-white/[0.08]">
                  <div>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-luxury-gold/15 text-luxury-gold">
                      <p.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-medium text-white">
                      {p.title}
                    </h3>
                    <p className="mt-3 font-body text-xs text-white/75 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING RESERVATION CTA */}
      <section id="tree-booking" className="px-6 py-20 md:px-10 md:py-28 bg-warm-sand/30">
        <div className="mx-auto max-w-editorial rounded-3xl bg-gradient-to-br from-deep-forest to-midnight-green p-8 md:p-16 text-white shadow-luxury-xl">
          <div className="max-w-2xl">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold block mb-2">
              Ready for the Canopy?
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
              Reserve Your Climb in the
              <span className="block font-medium text-luxury-gold">
                {selectedTree.commonName} Canopy
              </span>
            </h2>
            <p className="mt-4 font-body text-sm sm:text-base text-white/80 leading-relaxed">
              Sessions run daily in morning and late afternoon golden hour. Group sizes are strictly limited to 6 climbers per session to guarantee personalized arborist instruction.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to={`/enquire?experience=tree-climbing&tree=${encodeURIComponent(selectedTree.commonName)}`}
                className="inline-flex items-center justify-center rounded-lg bg-forest-green hover:bg-forest-green/90 text-white px-8 py-4 font-body text-sm font-semibold tracking-wide shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
              >
                Book Tree Climbing
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-4 font-body text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                <FaPhoneAlt className="h-3.5 w-3.5" />
                <span>Call Estate Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="px-6 py-20 md:px-10 md:py-24 bg-ivory-white">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Climber FAQ"
            title="Frequently Asked Questions"
            lede="Everything you need to know before putting on your harness and ascending into the canopy."
            align="center"
            className="mb-14"
          />

          <div className="mx-auto max-w-3xl space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-stone/30 bg-warm-sand/30 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-heading text-lg font-medium text-dark-charcoal pr-4">
                      {faq.q}
                    </span>
                    <span className="text-forest-green font-bold text-xl shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 font-body text-sm text-dark-charcoal/80 leading-relaxed border-t border-stone/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
