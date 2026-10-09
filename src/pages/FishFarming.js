import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiActivity,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiCheck,
  FiDroplet,
  FiGlobe,
  FiHeart,
  FiHome,
  FiMap,
  FiMapPin,
  FiPhone,
  FiSettings,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { PiFish, PiLeaf } from 'react-icons/pi';
import { GiFarmer, GiFishEggs, GiMeal } from 'react-icons/gi';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

/* Structure follows the aqua-farm reference the client supplied (hero with a
   floating quote card, overlapping photo pair, icon service cards) and all
   copy comes from the estate's own fish-farming poster. Colours stay on the
   estate palette so the page sits with the rest of the site. */

const HERO_STEPS = [
  { letter: 'A', title: 'Train & set up', body: 'Pond construction guidance and hands-on technical training.' },
  { letter: 'B', title: 'Stock & support', body: 'Fingerlings, feed and regular monitoring through every season.' },
  { letter: 'C', title: 'Buy back', body: 'Assured buyback support, and fresh fish to market.' },
];

const ACTIVITIES = [
  { icon: GiFishEggs, title: 'Quality Fingerlings', body: 'High quality, disease-free fingerlings to start every pond right.' },
  { icon: GiMeal, title: 'Nutritious Feed', body: 'Balanced, natural feed for steady and healthy growth.' },
  { icon: FiDroplet, title: 'Pond Management', body: 'Regular monitoring of water quality and fish health.' },
  { icon: FiHeart, title: 'Health Care', body: 'Disease prevention and timely treatment.' },
  { icon: PiFish, title: 'Harvesting', body: 'Timely harvesting for the best quality and profit.' },
  { icon: FiTrendingUp, title: 'Marketing Support', body: 'We connect you to local markets and buyers.' },
];

/* slug is null where no photograph has been supplied yet — those cards show
   an honest "photo coming soon" tile instead of a stand-in image of a
   different fish. */
/* Descriptions are general species information, not farm-specific figures. */
const VARIETIES = [
  {
    name: 'Rohu',
    slug: 'fish-rohu',
    scientific: 'Labeo rohita',
    group: 'Indian major carp',
    feeds: 'Mid-water, taking food from the middle of the pond',
    known: 'An everyday favourite across eastern India',
    about:
      'One of the three Indian major carps and the most widely eaten freshwater fish in the country. A steady, hardy grower with a deep silvery-bronze body and reddish fins, it does well in ponds stocked alongside catla and mrigal.',
  },
  {
    name: 'Catla',
    slug: 'fish-catla',
    scientific: 'Labeo catla',
    group: 'Indian major carp',
    feeds: 'Surface, on floating plankton',
    known: 'Fast growth and a broad, deep body',
    about:
      'The quickest-growing of the Indian major carps, easy to recognise by its wide head and upturned mouth. It feeds near the surface, which is why it sits so well in a mixed pond without competing with the other carps.',
  },
  {
    name: 'Mrigal',
    slug: null,
    scientific: 'Cirrhinus mrigala',
    group: 'Indian major carp',
    feeds: 'Bottom, on settled organic matter',
    known: 'Sharing a pond well with catla and rohu',
    about:
      'The third Indian major carp, with a slender silver body. It feeds along the pond floor, so it uses a part of the pond the other two carps leave alone, which is exactly why the three are raised together.',
  },
  {
    name: 'Tilapia',
    slug: null,
    scientific: 'Oreochromis niloticus',
    group: 'Cichlid',
    feeds: 'Omnivore, mostly plant-based',
    known: 'Hardy in a wide range of water conditions',
    about:
      'A tough, fast-growing fish that tolerates changes in water quality better than most. It has a mild, white, firm flesh that suits many kinds of cooking, and it adapts readily to pond life.',
  },
  {
    name: 'Pangasius',
    slug: 'fish-pangasius',
    scientific: 'Pangasianodon hypophthalmus',
    group: 'Catfish',
    feeds: 'Omnivore',
    known: 'Fast growth and mild white flesh',
    about:
      'A large freshwater catfish, silvery-grey and smooth-skinned, that grows quickly in ponds. Its mild, boneless-style white fillets make it popular with buyers who want a fish that is easy to prepare.',
  },
  {
    name: 'Singhi',
    slug: null,
    scientific: 'Heteropneustes fossilis',
    group: 'Air-breathing catfish',
    feeds: 'Omnivore, feeding near the bottom',
    known: 'Valued as a nutritious fish',
    about:
      'A small, hardy catfish with sharp pectoral spines. It can breathe air, so it copes with shallow, warm or low-oxygen water, and it is prized in Indian kitchens as a strengthening food for its nutritional value.',
  },
  {
    name: 'Magur',
    slug: 'fish-magur',
    scientific: 'Clarias magur',
    group: 'Air-breathing catfish',
    feeds: 'Omnivore, feeding near the bottom',
    known: 'Hardy even in low-oxygen water',
    about:
      'The Indian walking catfish, dark-bodied with long whiskers. Like the singhi it breathes air, which makes it exceptionally hardy, and it is in steady demand at markets.',
  },
];

function FishCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const last = VARIETIES.length - 1;

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const n = Math.max(0, Math.min(last, i));
    el.scrollTo({ left: el.children[n].offsetLeft, behavior: 'smooth' });
    setActive(n);
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const slideWidth = el.children[0].getBoundingClientRect().width;
    const i = Math.round(el.scrollLeft / slideWidth);
    if (i !== active) setActive(Math.max(0, Math.min(last, i)));
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Fish varieties we farm" className="mt-12">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {VARIETIES.map((v, i) => (
          <button
            key={v.name}
            type="button"
            onClick={() => goTo(i)}
            aria-current={active === i}
            className={`rounded-full border px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] transition-colors duration-400 ${
              active === i
                ? 'border-forest-green bg-forest-green text-ivory-white'
                : 'border-stone text-forest-green hover:border-luxury-gold'
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="relative flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {VARIETIES.map((v, i) => (
          <article
            key={v.name}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${VARIETIES.length}: ${v.name}`}
            aria-hidden={active !== i}
            className="w-full flex-shrink-0 snap-start px-1 py-1 text-left"
          >
            <div className="grid items-center gap-8 rounded-3xl border border-stone bg-ivory-white p-6 shadow-sm md:p-10 lg:grid-cols-2 lg:gap-14">
              <div className="mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-stone bg-[#ffffff] p-4">
                {v.slug ? (
                  <EstateImage
                    slug={v.slug}
                    alt={`${v.name} fish`}
                    fit="contain"
                    sizes="(min-width: 1024px) 34vw, 90vw"
                    className="h-full w-full !bg-[#ffffff]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl bg-warm-sand text-center">
                    <PiFish className="h-14 w-14 text-luxury-gold" />
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-light-charcoal">
                      Photo coming soon
                    </span>
                  </div>
                )}
              </div>

              <div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-luxury-gold">
                  {String(i + 1).padStart(2, '0')} / {String(VARIETIES.length).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-heading text-[clamp(2.2rem,4.4vw,3.5rem)] font-light leading-none text-forest-green">
                  {v.name}
                </h3>
                <p className="mt-2 font-heading text-lg italic text-luxury-gold">{v.scientific}</p>
                <p className="mt-6 max-w-lg font-body text-[0.92rem] font-light leading-[1.9] text-light-charcoal">
                  {v.about}
                </p>
                <dl className="mt-8 divide-y divide-stone border-y border-stone">
                  {[
                    ['Group', v.group],
                    ['Feeds', v.feeds],
                    ['Known for', v.known],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[6rem_1fr] gap-4 py-3.5">
                      <dt className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-luxury-gold">{label}</dt>
                      <dd className="font-body text-[0.85rem] font-light text-forest-green">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous fish"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-forest-green text-forest-green transition-colors duration-400 hover:bg-forest-green hover:text-ivory-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forest-green"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <span className="min-w-[4.5rem] text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-light-charcoal">
          {String(active + 1).padStart(2, '0')} / {String(VARIETIES.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === last}
          aria-label="Next fish"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-forest-green text-forest-green transition-colors duration-400 hover:bg-forest-green hover:text-ivory-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forest-green"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

const BENEFITS = [
  { icon: FiAward, text: 'High protein & nutritious food' },
  { icon: FiTrendingUp, text: 'Fast growth & good returns' },
  { icon: FiCalendar, text: 'Year-round income' },
  { icon: FiMap, text: 'Low land requirement' },
  { icon: PiLeaf, text: 'Eco-friendly & sustainable' },
  { icon: FiUsers, text: 'Employment generation' },
  { icon: FiDroplet, text: 'Improves water quality' },
];

const PROCESS = [
  { icon: GiFishEggs, title: 'Quality Fingerlings' },
  { icon: GiMeal, title: 'Nutritious Feed' },
  { icon: FiDroplet, title: 'Pond Management' },
  { icon: FiActivity, title: 'Water Quality Testing' },
  { icon: FiHeart, title: 'Health Check' },
  { icon: PiFish, title: 'Harvesting' },
  { icon: FiShoppingCart, title: 'Fresh Fish to Market' },
];

const WHY_US = [
  { icon: FiUsers, label: 'Expert Team' },
  { icon: FiSettings, label: 'Modern Techniques' },
  { icon: FiDroplet, label: 'Pure & Clean Water' },
  { icon: FiAward, label: 'Quality Assured' },
  { icon: FiBookOpen, label: 'Training & Support' },
];

const PERFECT_FOR = [
  { icon: GiFarmer, label: 'Farmers' },
  { icon: FiTrendingUp, label: 'Investors' },
  { icon: FiUsers, label: 'Rural Youth' },
  { icon: FiBriefcase, label: 'Entrepreneurs' },
  { icon: FiHome, label: 'Self-Employment' },
];

const WE_PROVIDE = [
  'Pond construction guidance',
  'Fingerlings & feed supply',
  'Technical training',
  'Regular monitoring & support',
  'Assured buyback support',
];

const TAGLINES = ['Eat Healthy', 'Live Natural', 'Support Local', 'Save Water', 'Save Future'];

export default function FishFarming() {
  return (
    <main className="overflow-x-clip bg-ivory-white">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-deep-forest">
        {/* Photo is mirrored so the fisherman and net sit on the right and the
            left half stays open for the headline. Scrims carry explicit
            z-index because EstateImage promotes its own layer. */}
        <div className="absolute inset-0 isolate -scale-x-100">
          <EstateImage
            slug="fish-farming"
            alt="A fisherman casting a net from a bamboo raft on a still river"
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-[5] bg-deep-forest/30" />
        <div className="absolute inset-0 z-[5] bg-gradient-to-r from-deep-forest/70 via-deep-forest/25 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-[5] h-44 bg-gradient-to-b from-deep-forest/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[5] h-2/5 bg-gradient-to-t from-deep-forest/90 to-transparent" />

        {/* Headline block */}
        <div className="relative z-10 flex flex-1 items-center px-6 pb-10 pt-32 md:px-10 lg:px-[8vw]">
          <div className="relative mx-auto w-full max-w-xl text-center lg:mx-0">
            {/* Fishing line looping through the headline */}
            <svg
              viewBox="0 0 760 260"
              aria-hidden="true"
              className="pointer-events-none absolute -left-[22%] -top-[16%] z-0 hidden w-[152%] sm:block"
              fill="none"
            >
              <path
                d="M0,64 C150,8 460,-6 552,54 C596,88 470,116 300,140 C170,160 70,166 44,184 C26,200 92,214 210,204 C400,188 600,160 760,132"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>

            <Reveal>
              <h1 className="relative z-10">
                <span className="block font-body text-[clamp(2.4rem,6.2vw,4.75rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ivory-white">
                  Fish Farming
                </span>
                <span className="-mt-1 block font-hand text-[clamp(3.6rem,10.5vw,8rem)] font-semibold leading-[0.85] text-luxury-gold md:-mt-3">
                  for Tomorrow
                </span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="relative z-10 mx-auto mt-6 max-w-md font-body text-[0.95rem] font-normal leading-[1.7] text-ivory-white/90">
                We help farmers, investors and young entrepreneurs build
                sustainable fish farms — from pond construction to fresh fish
                reaching the market.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <Link
                to="/enquire"
                className="relative z-10 mt-9 inline-block border border-ivory-white/80 bg-deep-forest/30 px-9 py-3.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ivory-white transition-colors duration-500 hover:bg-ivory-white hover:text-deep-forest"
              >
                Get a Quote
              </Link>
            </Reveal>
          </div>
        </div>

        {/* The partnership, in three steps */}
        <div className="relative z-10 px-6 pb-8 md:px-10 lg:px-16">
          <div className="flex items-center gap-5">
            <span className="h-px flex-1 bg-ivory-white/25" />
            <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-ivory-white">
              The Partnership
            </span>
            <span className="h-px flex-1 bg-ivory-white/25" />
          </div>

          <div className="mx-auto mt-7 flex max-w-editorial flex-col gap-6 md:flex-row md:items-start md:gap-4">
            {HERO_STEPS.map((s, i) => (
              <div key={s.title} className="flex flex-1 items-start gap-4">
                {i > 0 && (
                  <FiArrowRight className="mt-3 hidden h-4 w-4 flex-shrink-0 text-ivory-white/70 md:block" aria-hidden="true" />
                )}
                <div className={`flex items-start gap-4 ${i === 0 ? '' : 'md:opacity-70'}`}>
                  <span
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 font-body text-[0.72rem] font-semibold ${
                      i === 0 ? 'border-luxury-gold text-ivory-white' : 'border-ivory-white/50 text-ivory-white/80'
                    }`}
                  >
                    {s.letter}
                  </span>
                  <div>
                    <span className="block font-body text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ivory-white">
                      {s.title}
                    </span>
                    <p className="mt-1.5 max-w-[16rem] font-body text-[0.78rem] font-light leading-[1.6] text-ivory-white/80">
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT: overlapping photos ────────────────────────────── */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial items-center gap-20 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative pb-12 pr-10 sm:pr-16">
            <div className="lux-frame aspect-[4/5] w-4/5 overflow-hidden rounded-2xl">
              <EstateImage
                slug="fisherman"
                alt="A fisherman sorting his net in a boat on the harbour"
                sizes="(min-width: 1024px) 34vw, 80vw"
                position="center 30%"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="lux-frame absolute bottom-0 right-0 aspect-[3/4] w-1/2 overflow-hidden rounded-2xl border-[6px] border-ivory-white shadow-2xl">
              <EstateImage slug="fish" alt="Freshly harvested rohu laid out in steel trays" sizes="(min-width: 1024px) 20vw, 45vw" className="h-full w-full object-cover" />
            </div>
          </Reveal>

          <div>
            <Reveal><span className="lux-label text-luxury-gold">About Us</span></Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-heading text-[clamp(1.9rem,4vw,3.25rem)] font-light leading-[1.08] text-forest-green">
                We provide the best
                <span className="italic text-luxury-gold"> aqua farming services.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-lg font-body text-[0.92rem] font-light leading-[1.9] text-light-charcoal">
                Bambardara Agrotourism runs a working fish farm and helps
                farmers, investors and young entrepreneurs start their own —
                from pond construction to fresh fish reaching the market.
              </p>
            </Reveal>
            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              {[
                { icon: PiFish, t: 'Fish & Shrimp', d: 'Seven varieties raised side by side.' },
                { icon: FiDroplet, t: 'Water Quality', d: 'Pure, clean water, tested regularly.' },
              ].map((p, i) => (
                <Reveal key={p.t} delay={220 + i * 80}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-forest-green text-luxury-gold">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-light text-forest-green">{p.t}</h3>
                      <p className="mt-1 font-body text-[0.78rem] font-light leading-[1.7] text-light-charcoal">{p.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <section id="services" className="scroll-mt-24 bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><span className="lux-label text-luxury-gold">What We Do</span></Reveal>
              <Reveal delay={100}>
                <h2 className="mt-5 font-heading text-[clamp(1.9rem,4vw,3.25rem)] font-light leading-[1.05] text-forest-green">
                  Our aqua farm
                  <span className="italic text-luxury-gold"> services.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className="max-w-sm font-body text-[0.88rem] font-light leading-[1.9] text-light-charcoal">
                Six activities, managed end to end so a pond stays healthy and profitable.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.map((a, i) => (
              <Reveal key={a.title} delay={i * 70}>
                <article className="group h-full rounded-2xl bg-ivory-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-warm-sand text-forest-green transition-colors duration-500 group-hover:bg-forest-green group-hover:text-luxury-gold">
                    <a.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-heading text-xl font-light text-forest-green">{a.title}</h3>
                  <p className="mt-3 font-body text-[0.82rem] font-light leading-[1.75] text-light-charcoal">{a.body}</p>
                  <span className="lux-link mt-6 text-forest-green">View More</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VARIETIES ────────────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial text-center">
          <Reveal><span className="lux-label text-luxury-gold">Fish Varieties We Farm</span></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-heading text-[clamp(1.9rem,4vw,3.25rem)] font-light leading-[1.05] text-forest-green">
              Seven kinds,
              <span className="italic text-luxury-gold"> one pond system.</span>
            </h2>
          </Reveal>
          <FishCarousel />
        </div>
      </section>

      {/* ── BENEFITS (dark) ──────────────────────────────────────── */}
      <section className="bg-deep-forest px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><span className="lux-label text-luxury-gold">Benefits of Fish Farming</span></Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-heading text-[clamp(1.9rem,4vw,3.25rem)] font-light leading-[1.08] text-ivory-white">
                A dependable income,
                <span className="italic text-luxury-gold"> on very little land.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <Link to="/enquire" className="lux-link mt-9 text-ivory-white">Start your fish farm</Link>
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.text} delay={i * 60}>
                <div className="flex items-center gap-4 rounded-xl border border-ivory-white/10 bg-ivory-white/5 p-5">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-luxury-gold/15 text-luxury-gold">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <span className="font-body text-[0.88rem] font-light text-ivory-white/90">{b.text}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <div className="text-center">
            <Reveal><span className="lux-label text-luxury-gold">From Pond to Market</span></Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-heading text-[clamp(1.9rem,4vw,3.25rem)] font-light leading-[1.05] text-forest-green">
                Seven steps,
                <span className="italic text-luxury-gold"> start to finish.</span>
              </h2>
            </Reveal>
          </div>
          <ol className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 60} className="relative flex list-none flex-col items-center text-center">
                {i < PROCESS.length - 1 && (
                  <span className="absolute left-[calc(50%+2.25rem)] top-8 hidden h-px w-[calc(100%-3.5rem)] bg-luxury-gold/40 lg:block" />
                )}
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-luxury-gold/40 bg-warm-sand text-forest-green">
                  <p.icon className="h-6 w-6" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-forest-green font-mono text-[0.5rem] text-luxury-gold">
                    {i + 1}
                  </span>
                </span>
                <span className="mt-4 font-mono text-[0.55rem] uppercase leading-snug tracking-[0.1em] text-forest-green">{p.title}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── WHY US / PERFECT FOR / WE PROVIDE ────────────────────── */}
      <section className="bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial gap-6 md:grid-cols-3">
          {[
            { title: 'Why Choose Us', items: WHY_US },
            { title: 'Perfect For', items: PERFECT_FOR },
          ].map((col, ci) => (
            <Reveal key={col.title} delay={ci * 100}>
              <div className="h-full rounded-2xl bg-ivory-white p-8 shadow-sm">
                <span className="lux-label text-luxury-gold">{col.title}</span>
                <ul className="mt-6 space-y-4">
                  {col.items.map((it) => (
                    <li key={it.label} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-warm-sand text-forest-green">
                        <it.icon className="h-4 w-4" />
                      </span>
                      <span className="font-body text-[0.88rem] font-light text-forest-green">{it.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal delay={200}>
            <div className="h-full rounded-2xl bg-forest-green p-8 shadow-sm">
              <span className="lux-label text-luxury-gold">We Provide</span>
              <ul className="mt-6 space-y-4">
                {WE_PROVIDE.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-luxury-gold text-deep-forest">
                      <FiCheck className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="font-body text-[0.88rem] font-light text-ivory-white/90">{w}</span>
                  </li>
                ))}
              </ul>
              <Link to="/enquire" className="lux-link mt-8 text-luxury-gold">Enquire now</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <div className="grid gap-12 overflow-hidden rounded-[2rem] bg-deep-forest p-8 md:p-14 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal><span className="lux-label text-luxury-gold">Let&rsquo;s Grow Together</span></Reveal>
              <Reveal delay={100}>
                <h2 className="mt-5 font-heading text-[clamp(1.9rem,4vw,3.25rem)] font-light leading-[1.08] text-ivory-white">
                  Bring your land,
                  <span className="block italic text-luxury-gold">we&rsquo;ll bring the pond.</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <Link
                  to="/enquire"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-luxury-gold px-7 py-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-deep-forest transition-transform duration-500 ease-luxe hover:scale-105"
                >
                  Enquire About Partnering <FiArrowRight />
                </Link>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="space-y-5 rounded-2xl border border-ivory-white/10 bg-ivory-white/5 p-7">
                <span className="font-heading text-lg font-light text-ivory-white">Bambardara Agrotourism Pvt. Ltd.</span>
                <div className="flex items-start gap-3 font-body text-[0.85rem] font-light text-ivory-white/75">
                  <FiMapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-luxury-gold" />
                  Parale Ninai, Shahuwadi, Kolhapur – 415101, Maharashtra
                </div>
                <a href="tel:+917588775757" className="flex items-center gap-3 font-body text-[0.85rem] font-light text-ivory-white/75 hover:text-luxury-gold">
                  <FiPhone className="h-4 w-4 flex-shrink-0 text-luxury-gold" />
                  +91 75887 75757 · +91 93222 75757
                </a>
                <div className="flex items-center gap-3 font-body text-[0.85rem] font-light text-ivory-white/75">
                  <FiGlobe className="h-4 w-4 flex-shrink-0 text-luxury-gold" />
                  www.bambardaraagrotourism.com
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TAGLINE BAND ─────────────────────────────────────────── */}
      <section className="bg-forest-green px-6 py-6 md:px-10">
        <div className="mx-auto flex max-w-editorial flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TAGLINES.map((t) => (
            <span key={t} className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ivory-white/85">
              <FiCheck className="h-3 w-3 text-luxury-gold" strokeWidth={3} />
              {t}
            </span>
          ))}
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-luxury-gold">Let&rsquo;s Grow Together!</span>
        </div>
      </section>
    </main>
  );
}
