import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

/* Grouped into two families for the field guide below, the way a printed
   identification guide would organise them — grazing/small stock, and
   birds. The dairy herd, poultry and fish pond each have their own
   dedicated page, so they're kept out of this general animal-care guide. */
const FAMILIES = [
  {
    numeral: 'I',
    name: 'Grazing & Small Stock',
    entries: [
      { name: 'Goats', binomial: 'Capra hircus', slug: 'goat', body: 'Kept for milk and for the children who visit.' },
      { name: 'Sheep', binomial: 'Ovis aries', slug: 'sheep', body: 'Grazed along the pasture fence, kept for their wool.' },
      { name: 'Horses', binomial: 'Equus caballus', slug: 'horse', body: 'A short, led ride along the pasture fence line.' },
      { name: 'Rabbits', binomial: 'Oryctolagus cuniculus', slug: 'rabbit', body: 'A hutch by the feed store, always the first stop.' },
      { name: 'Bees', binomial: 'Apis mellifera', slug: 'bee', body: 'A working apiary at the orchard’s edge, for the kitchen’s own honey.' },
    ],
  },
  {
    numeral: 'II',
    name: 'Birds',
    entries: [
      { name: 'Aviary Birds', binomial: 'Psittaculidae', slug: 'aviary-birds', body: 'A quiet corner of parakeets and finches.' },
      { name: 'Ducks & Geese', binomial: 'Anatidae', slug: 'duck', body: 'Free-ranging along the pond’s edge.' },
    ],
  },
];

const FEATURES = [
  { label: 'Friendly animals', body: 'Goats, rabbits and more, used to people' },
  { label: 'Interactive', body: 'Feed, pet and spend real time with them' },
  { label: 'Educational', body: 'How each animal is kept, and why' },
  { label: 'Family friendly', body: 'Safe and easy for every age' },
  { label: 'Photo opportunities', body: 'Golden hour at the pasture fence' },
];

const CARE_GALLERY = [
  { slug: 'rabbit-friendly-corner', title: 'Rabbit Friendly Corner' },
  { slug: 'goat-feeding-time', title: 'Goat Feeding Time' },
  { slug: 'poultry-area', title: 'Poultry Area' },
  { slug: 'memories-that-last', title: 'Memories That Last' },
];

const CARE_BENEFITS = [
  'Teaches Compassion',
  'Promotes Responsibility',
  'Boosts Confidence',
  'Connects with Nature',
  'Healthy & Safe Experience',
];

const ACTIVITIES = [
  'Animal feeding',
  'Pony rides',
  'Bird watching',
  'Nature walk',
  'Kids’ play area',
];

const A_MORNING_HERE = [
  { label: 'Animal feeding', body: 'Goats, rabbits and more, fed by hand.' },
  { label: 'Gentle interaction', body: 'Time to sit with and bond with animals used to people.' },
  { label: 'Animal health care', body: 'How the corner is checked and treated.' },
  { label: 'Clean, safe housing', body: 'Hygienic shelters, clean water and a balanced feed.' },
  { label: 'A lesson for children', body: 'Framed for kids, students and first-time visitors alike.' },
];

export default function AnimalCare() {
  useEffect(() => {
    document.title = 'Animal Care & Petting Farm — Bambardara Estate';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-ivory-white">
      {/* ── HERO - THE CARE WE GIVE TO OUR ANIMALS ─────────────────── */}
      <section className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[700px] overflow-hidden bg-deep-forest">
        {/* Background Image */}
        <div className="absolute inset-0">
          <EstateImage
            slug="animalcare-hero"
            alt="Compassionate Animal Care at Bambardara Estate"
            sizes="100vw"
            priority
            className="h-full w-full object-cover object-[70%_center] md:object-center"
          />
          {/* Subtle gradient overlay to make white text pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[580px] sm:min-h-[640px] md:min-h-[700px] max-w-7xl flex-col justify-center px-6 pt-28 pb-32 sm:pt-36 sm:pb-36 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            {/* Care badge & underline accent */}
            <Reveal>
              <div className="mb-4 flex items-center gap-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold">
                  Ethical Husbandry &amp; Welfare
                </span>
                <div className="h-[2px] w-12 rounded-full bg-luxury-gold" />
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={80}>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-ivory-white leading-[1.08]">
                The Care We Give
                <span className="block font-normal italic text-luxury-gold">To Our Animals</span>
              </h1>
            </Reveal>

            {/* Subtext */}
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl font-body text-sm sm:text-base font-light leading-relaxed text-ivory-white/90 drop-shadow-sm">
                At Bambardara Estate, our animals are valued companions in our sustainable agro-tourism ecosystem. 
                From daily veterinary monitoring and wholesome organic farm fodder to spacious free-range pastures, 
                every creature is nurtured with dignity, patience, and love.
              </p>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#guide"
                  className="group inline-flex items-center gap-2 rounded-full bg-forest-green px-8 py-3.5 font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-ivory-white border border-luxury-gold/50 shadow-gold transition-all duration-300 hover:scale-105 hover:bg-luxury-gold hover:text-deep-forest cursor-pointer"
                >
                  <span>Our Care Practices</span>
                </a>
                <Link
                  to="/enquire"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory-white/40 bg-black/30 backdrop-blur-sm px-7 py-3.5 font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-ivory-white transition-all duration-300 hover:bg-ivory-white hover:text-dark-charcoal hover:border-ivory-white cursor-pointer"
                >
                  <span>Plan An Educational Visit</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Organic Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            className="relative block w-full h-14 sm:h-18 md:h-22"
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,45 C280,105 520,110 760,65 C1000,20 1220,80 1440,50 L1440,120 L0,120 Z"
              fill="#FBF9F5"
            />
          </svg>
        </div>
      </section>

      {/* ── 3 FLOATING CARE PILLAR CARDS ─────────────────────────── */}
      <section className="relative z-20 -mt-12 sm:-mt-16 md:-mt-20 px-6 md:px-10 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 - Holistic Veterinary Care */}
            <Reveal delay={100} className="h-full">
              <div className="group flex h-full flex-col items-center justify-between rounded-3xl bg-ivory-white p-7 sm:p-8 text-center shadow-xl shadow-black/8 border border-stone/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-luxury-gold hover:shadow-2xl">
                <div>
                  <div className="mb-5 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-green/10 text-forest-green transition-transform duration-300 group-hover:scale-110 group-hover:bg-forest-green group-hover:text-luxury-gold">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m-2-2h4" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-normal text-forest-green">
                    Holistic Health &amp; Vet Care
                  </h3>
                  <p className="mt-3 font-body text-xs sm:text-sm font-light leading-relaxed text-light-charcoal">
                    Routine veterinary check-ups, timely vaccinations, seasonal preventive wellness, and round-the-clock attentive supervision.
                  </p>
                </div>
                <span className="mt-5 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-luxury-gold font-semibold">
                  Preventive Health
                </span>
              </div>
            </Reveal>

            {/* Card 2 - Organic Farm Nutrition */}
            <Reveal delay={180} className="h-full">
              <div className="group flex h-full flex-col items-center justify-between rounded-3xl bg-ivory-white p-7 sm:p-8 text-center shadow-xl shadow-black/8 border border-stone/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-luxury-gold hover:shadow-2xl">
                <div>
                  <div className="mb-5 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-green/10 text-forest-green transition-transform duration-300 group-hover:scale-110 group-hover:bg-forest-green group-hover:text-luxury-gold">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-normal text-forest-green">
                    Organic Farm Nutrition
                  </h3>
                  <p className="mt-3 font-body text-xs sm:text-sm font-light leading-relaxed text-light-charcoal">
                    Freshly cut green fodder cultivated on estate soil, balanced natural seed blends, and fresh mountain spring drinking water.
                  </p>
                </div>
                <span className="mt-5 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-luxury-gold font-semibold">
                  Pure Organic Diet
                </span>
              </div>
            </Reveal>

            {/* Card 3 - Free-Range Living */}
            <Reveal delay={260} className="h-full">
              <div className="group flex h-full flex-col items-center justify-between rounded-3xl bg-ivory-white p-7 sm:p-8 text-center shadow-xl shadow-black/8 border border-stone/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-luxury-gold hover:shadow-2xl">
                <div>
                  <div className="mb-5 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-green/10 text-forest-green transition-transform duration-300 group-hover:scale-110 group-hover:bg-forest-green group-hover:text-luxury-gold">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-normal text-forest-green">
                    Free-Range Natural Living
                  </h3>
                  <p className="mt-3 font-body text-xs sm:text-sm font-light leading-relaxed text-light-charcoal">
                    Clean, airy shelters, open sunlight grazing paddocks, and calm environments that allow natural herd socialization.
                  </p>
                </div>
                <span className="mt-5 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-luxury-gold font-semibold">
                  Stress-Free Habitat
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="border-b border-stone px-6 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-editorial">
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.label} delay={i * 70}>
                <span className="block font-mono text-[0.58rem] uppercase tracking-[0.2em] text-luxury-gold">
                  {f.label}
                </span>
                <span className="mt-2 block font-body text-[0.82rem] font-light leading-snug text-light-charcoal">
                  {f.body}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE FIELD GUIDE ───────────────────────────────────────── */}
      <section id="guide" className="ruled-paper scroll-mt-24 bg-warm-sand px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <span className="field-stamp px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-forest-green">
              Sheet 01 · The field guide
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-[1.1] text-forest-green">
              Seven kinds, two families.
            </h2>
          </Reveal>

          <div className="mt-14 space-y-16">
            {FAMILIES.map((family, fi) => (
              <div key={family.numeral}>
                <Reveal delay={fi * 80}>
                  <div className="flex items-center gap-4">
                    <span
                      className="field-stamp h-9 w-9 flex-shrink-0 font-mono text-[0.7rem] text-forest-green"
                      style={{ transform: `rotate(${fi % 2 === 0 ? -3 : 3}deg)` }}
                    >
                      {family.numeral}
                    </span>
                    <h3 className="font-heading text-[0.7rem] uppercase tracking-[0.22em] text-forest-green">
                      {family.name}
                    </h3>
                  </div>
                  <span className="guide-rule mt-3 block text-luxury-gold" />
                </Reveal>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {family.entries.map((e, i) => (
                    <Reveal key={e.name} delay={fi * 80 + i * 50} className="h-full">
                      <div className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-stone/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-luxury-gold/50 hover:bg-ivory-white hover:shadow-xl">
                        <div>
                          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-warm-sand/50 shadow-inner">
                            <EstateImage
                              slug={e.slug}
                              alt={e.name}
                              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          </div>

                          <div className="mt-4">
                            <div className="flex items-baseline justify-between gap-2">
                              <h4 className="font-heading text-xl font-medium leading-tight text-forest-green">
                                {e.name}
                              </h4>
                              <span className="font-mono text-xs font-semibold text-luxury-gold">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <span className="mt-0.5 block font-mono text-[0.7rem] font-light italic text-light-charcoal/70">
                              {e.binomial}
                            </span>
                            <p className="mt-2.5 font-body text-[0.82rem] font-light leading-relaxed text-light-charcoal">
                              {e.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIELD NOTES FOR VISITORS ─────────────────────────────── */}
      <section className="ruled-paper px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <span className="field-stamp px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-forest-green">
              Sheet 02 · Field notes for visitors
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 max-w-2xl font-heading text-[clamp(1.9rem,4vw,3.25rem)] font-light leading-[1.05] text-forest-green">
              What a visit
              <span className="italic text-luxury-gold"> actually involves.</span>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-5 max-w-xl font-body text-[0.9rem] font-light leading-[1.9] text-light-charcoal">
              An hour with the corner — feeding, petting and a bit of
              company with animals that are entirely used to it.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {A_MORNING_HERE.map((item, i) => (
              <Reveal key={item.label} delay={i * 40}>
                <div className="flex gap-3 border-t border-stone py-4">
                  <span className="mt-[0.4rem] block h-1 w-1 flex-shrink-0 rounded-full bg-luxury-gold" />
                  <div>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-forest-green">
                      {item.label}
                    </span>
                    <p className="mt-1 font-body text-[0.76rem] font-light leading-[1.6] text-light-charcoal">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOMENTS AT THE ANIMAL CORNER ─────────────────────────── */}
      <section className="bg-warm-sand px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <span className="field-stamp px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-forest-green">
              Sheet 03 · Moments at the corner
            </span>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4">
            {CARE_GALLERY.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
                  <EstateImage
                    slug={item.slug}
                    alt={item.title}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="mt-3 block font-body text-[0.7rem] font-medium uppercase tracking-wide text-forest-green">
                  {item.title}
                </span>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4 border-t border-stone pt-10 md:mt-16">
            {CARE_BENEFITS.map((b, i) => (
              <Reveal key={b} delay={i * 60}>
                <span className="font-body text-[0.8rem] font-light text-light-charcoal">{b}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING ──────────────────────────────────────────────── */}
      <section className="bg-deep-forest px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-luxury-gold">
            For guests
          </span>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-b border-ivory-white/15 pb-10">
            {ACTIVITIES.map((a) => (
              <span
                key={a}
                className="font-body text-[0.85rem] font-light text-ivory-white/80"
              >
                {a}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[clamp(1.75rem,3.6vw,3rem)] font-light leading-tight text-ivory-white">
                Where every visit
                <span className="italic text-luxury-gold"> creates a memory.</span>
              </h2>
              <p className="mt-5 max-w-md font-body text-[0.85rem] font-light leading-[1.8] text-ivory-white/60">
                Right for families, school and college groups, a corporate
                outing, or a quiet weekend on your own — it teaches patience
                and a bit of responsibility as easily as it makes an
                afternoon.
              </p>
              <span className="mt-4 block font-hand text-xl text-luxury-gold">
                — recorded by the farm team, every season
              </span>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <Link
                to="/enquire"
                className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ivory-white underline decoration-luxury-gold/50 underline-offset-8 transition-colors duration-500 hover:text-luxury-gold"
              >
                Enquire about a visit →
              </Link>
              <Link
                to="/agro-farming"
                className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ivory-white/70 underline decoration-luxury-gold/30 underline-offset-8 transition-colors duration-500 hover:text-luxury-gold"
              >
                Back to Agro Farming →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
