import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
} from 'react-icons/fi';
import { PiBowlFood, PiJarLabel } from 'react-icons/pi';
import { GiButter, GiMilkCarton, GiCow } from 'react-icons/gi';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

/* No prices or ratings: none have been supplied, so none are shown. Tiles use
   icons until product photographs are added. */
const PRODUCTS = [
  { icon: GiMilkCarton, name: 'Pure Milk', body: '100% pure, natural and unadulterated milk from our well-cared-for dairy animals.' },
  { icon: PiBowlFood, name: 'Fresh Curd', body: 'Set from the same day’s milk, with nothing added and nothing cut.' },
  { icon: GiButter, name: 'Butter', body: 'Farm-fresh butter crafted with care from our pure milk.' },
  { icon: PiJarLabel, name: 'Ghee', body: 'Pure ghee clarified from farm butter, with nothing added.' },
];

function DairyProductsCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const last = PRODUCTS.length - 1;

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
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < el.children.length; i += 1) {
      const d = Math.abs(el.children[i].offsetLeft - el.scrollLeft);
      if (d < best) {
        best = d;
        nearest = i;
      }
    }
    if (nearest !== active) setActive(nearest);
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Craft dairy products" className="mt-12">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="relative -mx-3 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PRODUCTS.map((p) => (
          <article
            key={p.name}
            aria-roledescription="slide"
            className="w-[82%] flex-shrink-0 snap-start px-3 text-center sm:w-1/2 lg:w-1/3"
          >
            <div className="flex aspect-[4/3] items-center justify-center rounded-sm bg-[#f3ece0]">
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-ivory-white text-forest-green shadow-sm">
                <p.icon className="h-11 w-11" />
              </span>
            </div>
            <h3 className="mt-5 font-heading text-xl font-normal text-deep-forest">{p.name}</h3>
            <p className="mx-auto mt-2 max-w-[16rem] font-body text-[0.76rem] font-light leading-[1.7] text-light-charcoal">
              {p.body}
            </p>
            <Link
              to="/enquire"
              className="mt-3 inline-block font-mono text-[0.58rem] uppercase tracking-[0.2em] text-forest-green underline decoration-luxury-gold/50 underline-offset-4 transition-colors duration-400 hover:text-luxury-gold"
            >
              Enquire
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous product"
          className="flex h-8 w-8 items-center justify-center rounded-full text-forest-green transition-opacity duration-300 hover:opacity-70 disabled:opacity-25"
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${p.name}`}
              aria-current={active === i}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                active === i ? 'w-5 bg-forest-green' : 'w-1.5 bg-stone hover:bg-luxury-gold/60'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === last}
          aria-label="Next product"
          className="flex h-8 w-8 items-center justify-center rounded-full text-forest-green transition-opacity duration-300 hover:opacity-70 disabled:opacity-25"
        >
          <FiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* Loops silently (browsers only autoplay muted video) and only runs while it
   is on screen, so the 15 MB file isn't fetched by visitors who never scroll
   here. The 4K original is too
   heavy for the web, so the page uses a 1080p copy and a poster frame. */
function DairyVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      el.play().catch(() => {});
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative aspect-[4/3] max-h-[90vh] w-full overflow-hidden bg-deep-forest md:aspect-video">
      <video
        ref={videoRef}
        poster="/videos/dairy-poster.jpg"
        preload="none"
        muted
        loop
        playsInline
        aria-label="The dairy herd grazing, seen from above"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/dairy-web.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-deep-forest/40 px-6 text-center">
        <h2 className="max-w-2xl font-heading text-[clamp(1.5rem,3.6vw,2.9rem)] font-light leading-[1.2] text-ivory-white">
          We Work Every Day
          <span className="block">to Produce Delicious and Fresh Milk</span>
        </h2>
      </div>
    </div>
  );
}

export default function DairyFarm() {
  return (
    <main className="bg-ivory-white">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="overflow-x-clip bg-[#ffffff] px-5 pb-10 pt-28 md:px-10 md:pb-16 md:pt-32">
        <div className="mx-auto max-w-editorial">
          {/* Poster-style masthead: soft beige blob, a gold script word laid
              over big capitals, and a small tagline with a cheese sketch. */}
          <div className="relative min-h-[15rem] md:min-h-[21rem]">
            <span
              aria-hidden="true"
              className="absolute -top-4 left-[6%] h-[19rem] w-[min(28rem,86vw)] rounded-[58%_42%_55%_45%/52%_58%_42%_48%] bg-warm-sand md:left-[9%] md:h-[22rem] md:w-[30rem]"
            />

            <div className="relative z-10 pt-6 md:pt-10">
              <Reveal>
                <span className="block -rotate-3 font-hand text-[clamp(3.4rem,9vw,6.5rem)] font-semibold leading-none text-luxury-gold md:ml-4">
                  Bambardara
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="mt-1 font-subheading text-[clamp(2.3rem,6.4vw,5rem)] uppercase leading-[0.95] tracking-tight text-deep-forest md:-mt-1">
                  Dairy Farm
                  <span className="block">Experience</span>
                </h1>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative z-10 mt-8 flex max-w-[15rem] items-start gap-5 md:absolute md:right-0 md:top-6 md:mt-0 md:max-w-xs">
              <p className="font-subheading text-[1.05rem] leading-[1.45] text-deep-forest md:text-[1.2rem]">
                Naturally Delicious, Always Fresh Dairy Products
              </p>
              <svg
                viewBox="0 0 100 70"
                aria-hidden="true"
                className="h-14 w-20 flex-shrink-0 text-deep-forest md:h-[4.5rem] md:w-28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8,40 L74,8 Q86,4 92,14 L94,46 Q94,54 86,55 L16,62 Q8,62 8,54 Z" />
                <path d="M8,40 L86,32 Q92,31 94,38" />
                <circle cx="30" cy="49" r="5" />
                <circle cx="58" cy="45" r="7" />
                <circle cx="79" cy="40" r="3.5" />
                <circle cx="46" cy="56" r="2.5" />
                <circle cx="66" cy="22" r="3" />
              </svg>
            </Reveal>
          </div>

          {/* One wide landscape photograph across the full width. */}
          <Reveal delay={280} className="mt-8 md:mt-10">
            <div className="aspect-[16/9] w-full overflow-hidden md:aspect-[2.2/1]">
              <EstateImage
                slug="farmhouse-villa-2"
                alt="Livestock grazing the estate pasture at the edge of the evening"
                priority
                position="center 78%"
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HERD FACTS ───────────────────────────────────────────── */}
      <section className="bg-[#ffffff] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="aspect-square w-full overflow-hidden rounded-sm">
              <EstateImage
                slug="dairy"
                alt="The dairy herd at the feeding barn"
                sizes="(min-width: 768px) 40vw, 90vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <h2 className="max-w-sm font-heading text-[clamp(1.9rem,3.6vw,2.8rem)] font-normal leading-[1.1] text-deep-forest">
                Meet Our Dairy Animals
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 max-w-sm font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                Interact with well-cared-for cows and calves living in a happy, healthy environment. Witness the live process of clean, hygienic, and fresh milk collection.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <a
                href="#visit"
                className="mt-7 inline-block border border-deep-forest/70 px-5 py-2 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-deep-forest transition-colors duration-400 hover:bg-deep-forest hover:text-ivory-white"
              >
                Read more
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HONEST DAIRY FARMING ─────────────────────────────────── */}
      <section className="bg-deep-forest px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-start gap-6 md:grid-cols-[0.8fr_1.6fr_auto] md:gap-12">
            <Reveal>
              <h2 className="font-heading text-[clamp(1.9rem,3.4vw,2.6rem)] font-light leading-[1.1] text-ivory-white">
                Quality You Can Trust
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-xl font-body text-[0.85rem] font-light leading-[1.85] text-ivory-white/80">
                We promise{' '}
                <span className="font-normal text-luxury-gold">
                  100% Pure, Natural, and Unadulterated Dairy Products
                </span>
                {' '}crafted with natural feed, sustainable farming methods, and maintained in clean, spacious sheds ensuring top-tier hygiene and animal comfort at all times.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <Link
                to="/enquire"
                className="inline-block rounded-full bg-luxury-gold px-6 py-2.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-deep-forest transition-transform duration-500 ease-luxe hover:scale-105"
              >
                Visit the farm
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:gap-4">
            {[
              { slug: 'animal-farm-and-dairy-farm', alt: 'A farmhand with a Holstein cow in the shed' },
              { slug: 'animal-farm', alt: 'A calf looking out from the open-sided shed' },
            ].map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <div className="aspect-[4/5] w-full overflow-hidden rounded-md">
                  <EstateImage
                    slug={p.slug}
                    alt={p.alt}
                    sizes="(min-width: 1024px) 500px, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRESH · PURE · NATURAL ───────────────────────────────── */}
      <section className="bg-[#f3ece0] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.75fr_1.7fr] md:gap-16">
          <div className="space-y-9">
            {[
              { word: 'Natural Feed', body: 'Keeping our animals healthy and nourished with the best natural feed.' },
              { word: 'Sustainable', body: 'Practicing eco-friendly, sustainable farming methods for a better future.' },
              { word: 'Clean Sheds', body: 'Clean and spacious sheds ensuring top-tier hygiene and animal comfort at all times.' },
            ].map((q, i) => (
              <Reveal key={q.word} delay={i * 110}>
                <h3 className="font-heading text-[1.7rem] font-normal leading-none text-forest-green">{q.word}</h3>
                <span className="mt-3 block h-px w-full bg-forest-green/40" />
                <p className="mt-3 font-body text-[0.74rem] font-light leading-[1.75] text-light-charcoal">{q.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-sm">
                <EstateImage
                  slug="farmhouse-villa-2"
                  alt="Livestock grazing the estate pasture in the evening light"
                  position="center 70%"
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute right-4 top-4 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-forest-green/40 bg-ivory-white text-center font-mono text-[0.5rem] uppercase leading-tight tracking-[0.14em] text-forest-green shadow-md md:right-6 md:top-6 md:h-20 md:w-20">
                100%
                <br />
                natural
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CRAFT DAIRY PRODUCTS ─────────────────────────────────── */}
      <section className="bg-[#ffffff] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Reveal>
              <span className="font-body text-[0.68rem] font-normal uppercase tracking-[0.22em] text-light-charcoal/70">
                Farm fresh
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-3 font-heading text-[clamp(1.9rem,3.6vw,2.8rem)] font-normal leading-tight text-deep-forest">
                Our Offerings
              </h2>
            </Reveal>
          </div>
          <DairyProductsCarousel />
        </div>
      </section>

      {/* ── FARM TOURS ───────────────────────────────────────────── */}
      <section className="bg-[#ffffff] px-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl md:grid-cols-[0.85fr_1.4fr]">
          <Reveal className="h-full">
            <div className="aspect-[4/5] w-full md:aspect-auto md:h-full md:min-h-[26rem]">
              <EstateImage
                slug="animal-farm-and-dairy-farm"
                alt="A farmhand greeting a Holstein cow in the shed"
                sizes="(min-width: 768px) 36vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="bg-[#f3ece0] px-7 py-10 md:px-12 md:py-14">
            <Reveal>
              <span className="font-body text-[0.68rem] font-normal uppercase tracking-[0.22em] text-light-charcoal/70">
                Visit us
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-3 font-heading text-[clamp(1.9rem,3.4vw,2.6rem)] font-normal leading-tight text-deep-forest">
                Dairy Farm Experience
              </h2>
            </Reveal>

            <ul className="mt-8 divide-y divide-deep-forest/15">
              {[
                { slug: 'dairy', position: 'center', title: 'Meet Our Dairy Animals', body: 'Interact with well-cared-for cows and calves living happily.' },
                { slug: 'animal-farm-and-dairy-farm', position: 'center 40%', title: 'Milk Collection', body: 'Witness the live process of clean and hygienic milk collection.' },
                { slug: 'animal-farm', position: 'center 80%', title: 'Dairy Process Demo', body: 'Learn how our high-quality milk is processed using modern techniques.' },
              ].map((t, i) => (
                <Reveal key={t.title} as="li" delay={150 + i * 90} className="list-none">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3 py-5 md:flex-nowrap md:gap-6">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full md:h-16 md:w-16">
                      <EstateImage
                        slug={t.slug}
                        alt=""
                        position={t.position}
                        sizes="64px"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1 basis-[calc(100%-4.5rem)] md:basis-auto">
                      <h3 className="font-heading text-lg font-normal leading-snug text-deep-forest md:text-xl">{t.title}</h3>
                      <p className="mt-1 font-body text-[0.76rem] font-light leading-[1.6] text-light-charcoal">{t.body}</p>
                    </div>
                    <Link
                      to="/enquire"
                      className="ml-[4.5rem] flex-shrink-0 rounded-full bg-luxury-gold px-5 py-2 font-body text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-deep-forest transition-transform duration-500 ease-luxe hover:scale-105 md:ml-0 md:px-6"
                    >
                      Enquire
                    </Link>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── THE PEOPLE BEHIND THE DAIRY ──────────────────────────── */}
      {/* Portrait tiles show a role icon until real portraits (and names) are
          supplied — no people are invented here. */}
      <section className="bg-[#f3ece0] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="max-w-md font-heading text-[1.15rem] font-normal leading-[1.5] text-deep-forest md:text-[1.3rem]">
              Visitor Experiences
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-4 md:gap-5">
            {[
              { icon: GiMilkCarton, role: 'Calf Care & Love', body: 'Spend time bonding with and nurturing our young calves.' },
              { icon: GiCow, role: 'Milking Experience', body: 'Get a hands-on, authentic look at daily farm life.' },
              { icon: GiButter, role: 'The Dairy Makers', body: 'Turning the day’s milk into curd, butter and ghee.' },
              { icon: FiUsers, role: 'Farm Tours', body: 'Explore our farm and learn about sustainable farming.' },
            ].map((m, i) => (
              <Reveal key={m.role} delay={i * 90}>
                <div className="flex aspect-[4/5] w-full items-center justify-center rounded-sm bg-[#e8dfcf]">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ivory-white text-forest-green shadow-sm md:h-24 md:w-24">
                    <m.icon className="h-9 w-9 md:h-10 md:w-10" />
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-normal leading-snug text-deep-forest">{m.role}</h3>
                <p className="mt-1 font-body text-[0.72rem] font-light leading-[1.6] text-light-charcoal">{m.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO ────────────────────────────────────────────────── */}
      <section>
        <DairyVideo />
      </section>

      {/* ── WHAT IS AGROTOURISM ──────────────────────────────────── */}
      <section className="bg-ivory-white">
        <Reveal>
          <div className="px-8 py-16 text-center md:px-16 md:py-20">
              {/* Two People Icons */}
              <div className="mb-8 flex items-center justify-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warm-sand text-forest-green">
                  <FiUsers className="h-10 w-10" />
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warm-sand text-forest-green">
                  <FiUsers className="h-10 w-10" />
                </div>
              </div>

              {/* Question Mark */}
              <div className="mb-6 flex justify-center">
                <span className="text-6xl font-light text-forest-green md:text-7xl">?</span>
              </div>

              {/* Main Text */}
              <h2 className="mx-auto max-w-2xl font-heading text-[clamp(1.5rem,4vw,2.5rem)] font-light leading-tight text-forest-green">
                What is agrotourism and why does it work for you?
                <span className="mt-2 block font-normal text-luxury-gold">Let us tell you!</span>
              </h2>

              {/* Learn More Button */}
              <div className="mt-10">
                <Link
                  to="/enquire"
                  className="inline-block rounded-full bg-forest-green px-10 py-4 font-body text-sm font-medium uppercase tracking-wider text-ivory-white transition-all duration-300 hover:bg-luxury-gold hover:text-deep-forest hover:shadow-xl"
                >
                  Learn More
                </Link>
              </div>
          </div>
        </Reveal>
      </section>

      {/* ── DAIRY NEWS DIGEST ────────────────────────────────────── */}
      <section className="bg-ivory-white">
        <Reveal>
          <div className="px-8 py-16 md:px-16 md:py-20">
            {/* Heading */}
            <h2 className="mb-12 text-center font-heading text-[clamp(1.5rem,3vw,2rem)] font-light text-forest-green">
              Contact & Location Details
            </h2>

            {/* Three Cards */}
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <Reveal delay={100}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <EstateImage
                      slug="animal-farm-and-dairy-farm"
                      alt="Farmhand with dairy cow"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-4 text-center font-body text-sm font-semibold leading-relaxed text-forest-green">
                    Bambardara Agrotourism Pvt. Ltd.
                  </p>
                  <p className="mt-2 text-center font-body text-xs leading-relaxed text-light-charcoal">
                    Parale Ninai, Shahuwadi, Kolhapur - 415101, Maharashtra
                  </p>
                </div>
              </Reveal>

              {/* Card 2 */}
              <Reveal delay={200}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <EstateImage
                      slug="farmhouse-villa-2"
                      alt="Pasture landscape"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-4 text-center font-body text-sm font-semibold leading-relaxed text-forest-green">
                    Phone
                  </p>
                  <p className="mt-2 text-center font-body text-xs leading-relaxed text-light-charcoal">
                    +91 75887 75757 / +91 93222 75757
                  </p>
                </div>
              </Reveal>

              {/* Card 3 */}
              <Reveal delay={300}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <EstateImage
                      slug="dairy"
                      alt="Morning milking routine"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-4 text-center font-body text-sm font-semibold leading-relaxed text-forest-green">
                    Website
                  </p>
                  <p className="mt-2 text-center font-body text-xs leading-relaxed text-light-charcoal">
                    www.bambardaraagrotourism.com
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
