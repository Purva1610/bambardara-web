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
      { name: 'Goats', binomial: 'Capra hircus', body: 'Kept for milk and for the children who visit.' },
      { name: 'Sheep', binomial: 'Ovis aries', body: 'Grazed along the pasture fence, kept for their wool.' },
      { name: 'Horses', binomial: 'Equus caballus', body: 'A short, led ride along the pasture fence line.' },
      { name: 'Rabbits', binomial: 'Oryctolagus cuniculus', body: 'A hutch by the feed store, always the first stop.' },
      { name: 'Bees', binomial: 'Apis mellifera', body: 'A working apiary at the orchard’s edge, for the kitchen’s own honey.' },
    ],
  },
  {
    numeral: 'II',
    name: 'Birds',
    entries: [
      { name: 'Aviary Birds', binomial: 'Psittaculidae', body: 'A quiet corner of parakeets and finches.' },
      { name: 'Ducks & Geese', binomial: 'Anatidae', body: 'Free-ranging along the pond’s edge.' },
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
  { slug: 'farmhouse-villa-2', title: 'Rabbit Friendly Corner' },
  { slug: 'organic-farming-landscape', title: 'Goat Feeding Time' },
  { slug: 'farmhouse-villa-1', title: 'Poultry Area' },
  { slug: 'farm-about', title: 'Memories That Last' },
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
  return (
    <main className="bg-ivory-white">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-ivory-white px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <h1 className="font-heading text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.1] text-deep-forest">
                Where Care Meets
                <span className="block">the Animal Corner</span>
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 max-w-md font-body text-[0.9rem] font-light leading-[1.85] text-light-charcoal">
                A smaller corner of the estate, kept for guests to spend an
                hour with — goats, sheep, horses, rabbits, bees, and a quiet
                stretch of aviary birds and pond fowl.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <a
                href="#guide"
                className="mt-8 inline-flex items-center rounded-full bg-luxury-gold px-7 py-3 font-body text-[0.8rem] font-semibold text-deep-forest transition-colors duration-400 hover:bg-forest-green hover:text-ivory-white"
              >
                Explore More
              </a>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative lg:col-span-6">
            <div className="absolute -left-6 top-6 h-28 w-28 rounded-full bg-warm-sand md:h-36 md:w-36" aria-hidden="true" />
            <div className="absolute -right-4 -top-6 h-14 w-14 rounded-full bg-luxury-gold md:h-20 md:w-20" aria-hidden="true" />
            <div className="absolute -right-6 bottom-8 h-20 w-20 rounded-full bg-luxury-gold/40 md:h-28 md:w-28" aria-hidden="true" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] shadow-xl">
              <EstateImage
                slug="farmhouse-villa-2"
                alt="Goats and rabbits at the estate's animal corner"
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
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
                    <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-forest-green">
                      {family.name}
                    </h3>
                  </div>
                  <span className="guide-rule mt-3 block text-luxury-gold" />
                </Reveal>

                <div className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                  {family.entries.map((e, i) => (
                    <Reveal key={e.name} delay={fi * 80 + i * 50}>
                      <div className="flex gap-4 border-t border-stone/70 py-5">
                        <span className="specimen-mark mt-2 text-luxury-gold" />
                        <div>
                          <h4 className="font-heading text-lg font-light leading-tight text-forest-green">
                            {e.name}
                          </h4>
                          <span className="mt-0.5 block font-body text-[0.7rem] font-light italic text-light-charcoal/60">
                            {e.binomial}
                          </span>
                          <p className="mt-2 max-w-sm font-body text-[0.78rem] font-light leading-[1.7] text-light-charcoal">
                            {e.body}
                          </p>
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
                <div className="aspect-[4/5] w-full overflow-hidden rounded-sm">
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
