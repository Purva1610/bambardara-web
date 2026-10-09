import { Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const LANES = [
  {
    id: 'animal-care',
    to: '/agro-farming/animal-care',
    slug: 'farmhouse-villa-2',
    label: 'Goats · Sheep · Rabbits · Birds',
    title: 'Animal Care',
    body: 'A smaller corner of the estate kept for guests to spend an hour with — goats, sheep, horses, rabbits, bees, and a quiet stretch of aviary birds and pond fowl.',
  },
  {
    id: 'dairy-farm',
    to: '/agro-farming/dairy-farm',
    slug: 'dairy',
    label: 'Forty Head, Hand-Milked',
    title: 'Dairy Farm',
    body: 'Open, naturally ventilated sheds and a herd milked by hand at four in the morning and again at dusk — the same families have kept cattle on this land for three generations.',
  },
  {
    id: 'poultry-farm',
    to: '/agro-farming/poultry-farming',
    slug: 'farmhouse-villa-1',
    label: 'Free-Ranging, Gathered Fresh',
    title: 'Poultry Farm',
    body: 'Hens and chicks, free-ranging near the coop through the day, opened at first light and shut in safe at dusk. Eggs are gathered fresh every morning for the kitchen.',
  },
  {
    id: 'fish-farming',
    to: '/agro-farming/fish-farming',
    slug: 'boating',
    label: 'Seven Varieties, One Pond',
    title: 'Fish Farming',
    body: 'Seven varieties raised with the same care as the dairy or the nursery, checked on the same morning round as the herd — nothing raised here is sold off the estate.',
  },
];

const ANIMAL_CATEGORIES = [
  { label: 'Cow', slug: 'dairy', body: 'Provides milk, dung, urine & farm power' },
  { label: 'Buffalo', slug: 'animal-farm-and-dairy-farm', body: 'High milk production, strong & hardy' },
  { label: 'Goat', slug: 'organic-farming-landscape', body: 'Easy to rear, high milk & meat' },
  { label: 'Sheep', slug: 'farmhouse-villa-2', body: 'Provides wool, meat & fertiliser' },
  { label: 'Horse', slug: 'farmhouse-villa-3', body: 'Transport, farm work, riding & sports' },
  { label: 'Poultry (Chicken)', slug: 'farmhouse-villa-1', body: 'Eggs, meat & high protein' },
  { label: 'Rabbit', slug: 'farm-about', body: 'High breeding rate, meat & fur' },
  { label: 'Duck', slug: 'about-farm', body: 'Eggs, meat & pest control' },
  { label: 'Fish', slug: 'boating', body: 'High protein, fast growth' },
  { label: 'Bee', slug: 'organic-farming-and-farm-stay-3', body: 'Honey production & pollination' },
];

const FARM_FEATURES = [
  { label: 'Friendly Animals', body: 'Cows, goats, horses, rabbits, birds & more' },
  { label: 'Interactive Experience', body: 'Feed, pet & play with our animals' },
  { label: 'Educational Fun', body: 'Learn about animal care, habitats & farm life' },
  { label: 'Safe & Family Friendly', body: 'Hygienic, secure & perfect for all age groups' },
  { label: 'Photo Opportunities', body: 'Capture beautiful moments with the animals' },
];

const FARM_ACTIVITIES = ['Animal Feeding', 'Pony Ride', 'Bird Watching', 'Nature Walk', 'Kids Play Area'];

export default function AnimalFarm() {
  return (
    <main className="bg-ivory-white">
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-deep-forest text-center">
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="animal-farm"
            alt="The estate's animal farm at golden hour"
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24 md:px-10">
          <Reveal>
            <h1 className="max-w-2xl mx-auto font-heading text-[clamp(2.25rem,5.5vw,3.75rem)] font-light leading-[1.1] text-ivory-white">
              Four Corners
              <span className="block italic text-muted-gold">of the Working Farm</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-lg mx-auto font-body text-[0.9rem] font-light leading-[1.85] text-ivory-white/80">
              From the dairy shed to the fish pond, every animal on the
              estate is kept, not merely managed. Pick a corner to see what
              a visit there actually involves.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <Link
              to="/enquire"
              className="mt-8 inline-flex rounded-full bg-forest-green px-8 py-3 font-body text-[0.8rem] font-medium text-ivory-white transition-colors hover:bg-deep-forest"
            >
              <span>Enquire About a Visit</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-b border-stone bg-ivory-white px-6 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-editorial">
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-5">
            {FARM_FEATURES.map((f, i) => (
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

      {/* FIND YOUR PERFECT ACTIVITY */}
      <section className="bg-warm-sand px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-heading text-[clamp(2rem,4.5vw,2.75rem)] font-light leading-tight text-forest-green">
                Find Your Perfect
                <span className="block italic text-luxury-gold">Farm Activity</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 max-w-sm font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                Connect with nature, guided by the families who've kept this
                land for generations — a gentle, hands-on interaction with
                the estate's animal family.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <Link
                to="/enquire"
                className="mt-7 inline-flex rounded-full bg-forest-green px-7 py-3 font-body text-[0.75rem] font-medium text-ivory-white transition-colors hover:bg-deep-forest"
              >
                <span>Explore Services</span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <div className="lux-frame aspect-[4/3] w-full">
              <EstateImage
                slug="farmhouse-villa-2"
                alt="A guest with the estate's animals"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUR FARM'S PASSION AND PURPOSE */}
      <section className="bg-ivory-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <Reveal delay={100} className="lg:col-span-6">
            <div className="lux-frame aspect-[4/3] w-full">
              <EstateImage
                slug="farmhouse-villa-3"
                alt="A dairy cow on the estate"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="font-heading text-[clamp(2rem,4.5vw,2.75rem)] font-light leading-tight text-forest-green">
                Our Farm's Passion
                <span className="block italic text-luxury-gold">and Purpose</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 max-w-md font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                Three generations of the same families still keep this herd —
                not a display built for visitors, but a working farm that
                happens to welcome them in.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <Link
                to="/enquire"
                className="mt-7 inline-flex rounded-full bg-forest-green px-7 py-3 font-body text-[0.75rem] font-medium text-ivory-white transition-colors hover:bg-deep-forest"
              >
                <span>Get in Touch</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section className="bg-warm-sand px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-heading text-[clamp(2rem,4.5vw,2.75rem)] font-light leading-tight text-forest-green">
                Get in Touch for a
                <span className="block italic text-luxury-gold">Unique Farm Stay</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 max-w-sm font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                Reach out and we'll help you build a visit around the corners
                that interest you most — from the dairy shed at dawn to a
                quiet evening by the pond.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <Link
                to="/enquire"
                className="mt-7 inline-flex rounded-full bg-forest-green px-7 py-3 font-body text-[0.75rem] font-medium text-ivory-white transition-colors hover:bg-deep-forest"
              >
                <span>Contact Us</span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <div className="lux-frame aspect-[4/3] w-full">
              <EstateImage
                slug="interior"
                alt="A guest cottage interior on the estate"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE ESTATE'S WAY WITH ANIMALS */}
      <section className="bg-ivory-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <Reveal delay={100} className="lg:col-span-6">
            <div className="lux-frame aspect-[4/3] w-full">
              <EstateImage
                slug="about-farm"
                alt="A calf on the estate"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="font-heading text-[clamp(2rem,4.5vw,2.75rem)] font-light leading-tight text-forest-green">
                The Estate's Way
                <span className="block italic text-luxury-gold">with Animals</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 max-w-md font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                Fed, grazed, and tended on the same schedule the farm has
                always kept — guests are welcome to watch, help, or simply
                sit with the herd for an hour.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <Link
                to="/enquire"
                className="mt-7 inline-flex rounded-full bg-forest-green px-7 py-3 font-body text-[0.75rem] font-medium text-ivory-white transition-colors hover:bg-deep-forest"
              >
                <span>Contact Us</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ANIMAL CATEGORY NAVIGATION - TOP 10 ANIMALS */}
      <section className="bg-warm-sand px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Header Badge */}
          <Reveal>
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full border-2 border-forest-green px-8 py-2.5 font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-forest-green">
                Top 10 Animals
              </span>
            </div>
          </Reveal>

          {/* Grid of Animal Cards */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
            {ANIMAL_CATEGORIES.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 50}>
                <div className="group relative overflow-hidden">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-warm-sand">
                    <EstateImage
                      slug={cat.slug}
                      alt={cat.label}
                      sizes="(min-width: 1024px) 18vw, (min-width: 768px) 25vw, 45vw"
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90" />
                    
                    {/* Number Badge - Top Left */}
                    <div className="absolute left-3 top-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-sm">
                        <span className="font-heading text-lg font-bold text-white">
                          {i + 1}
                        </span>
                      </div>
                    </div>

                    {/* Content Overlay - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="mb-2 font-heading text-lg font-light uppercase tracking-wide text-white">
                        {cat.label}
                      </h3>
                      <p className="font-body text-[0.7rem] font-light leading-relaxed text-white/90">
                        {cat.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHOOSE A CORNER */}
      <section className="bg-warm-sand px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Where to Start"
            title={
              <>
                Four corners,
                <span className="block italic text-luxury-gold">each kept its own way</span>
              </>
            }
            lede="Most guests visit more than one across a stay. Pick a corner to see what a visit there actually involves."
            align="center"
            className="mb-16 md:mb-20"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {LANES.map((lane, i) => (
              <Reveal key={lane.id} delay={i * 130}>
                <Link to={lane.to} className="group block">
                  <div className="lux-frame zoom-hover aspect-[16/10] w-full">
                    <EstateImage
                      slug={lane.slug}
                      alt={lane.title}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="isolate"
                    />
                    <div className="lux-scrim-soft absolute inset-0" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <span className="lux-label text-muted-gold">{lane.label}</span>
                      <h3 className="mt-3 font-heading text-[1.75rem] font-light leading-tight text-ivory-white">
                        {lane.title}
                      </h3>
                      <p className="mt-4 font-body text-[0.85rem] font-light leading-[1.8] text-ivory-white/80">
                        {lane.body}
                      </p>
                      <span className="lux-link mt-6 text-ivory-white">Explore</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* UNLOCK VALUABLE INSIGHTS */}
      <section className="bg-warm-sand px-6 pb-24 md:px-10 md:pb-32">
        <div className="relative mx-auto max-w-editorial overflow-hidden rounded-[2rem]">
          <EstateImage
            slug="farmhouse-villa-2"
            alt="A horse on the estate at dusk"
            sizes="(min-width: 1200px) 1100px, 100vw"
            className="h-[380px] w-full object-cover md:h-[440px]"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="max-w-md px-8 md:px-14">
              <Reveal>
                <h2 className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-tight text-ivory-white">
                  Unlock Valuable
                  <span className="block">Farm Insights</span>
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-4 font-body text-[0.85rem] font-light leading-[1.8] text-ivory-white/85">
                  Discover the guided walks and seasonal notes we've put
                  together to help you get the most from a visit.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <Link
                  to="/enquire"
                  className="mt-7 inline-flex rounded-full bg-forest-green px-7 py-3 font-body text-[0.75rem] font-medium text-ivory-white transition-colors hover:bg-deep-forest"
                >
                  <span>Explore Resources</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone bg-ivory-white px-6 py-20 text-center md:px-10">
        <div className="mx-auto flex max-w-editorial flex-wrap justify-center gap-x-8 gap-y-3 border-b border-stone pb-10">
          {FARM_ACTIVITIES.map((a) => (
            <span key={a} className="font-body text-[0.8rem] font-light text-light-charcoal/70">
              {a}
            </span>
          ))}
        </div>
        <h2 className="mt-10 font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-tight text-forest-green">
          Where every visit
          <span className="italic text-luxury-gold"> creates beautiful memories.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-prose font-body text-[0.9rem] font-light leading-[1.85] text-light-charcoal">
          Right for families, school and college groups, a corporate outing,
          or a quiet weekend on your own.
        </p>
        <Link to="/enquire" className="lux-btn-dark mt-8 inline-flex">
          <span>Enquire About a Visit</span>
        </Link>
      </section>
    </main>
  );
}
