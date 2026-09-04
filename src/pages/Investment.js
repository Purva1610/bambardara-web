import React from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const PLANS = [
  {
    title: '₹1 Lakh Tier',
    investment: '₹1,00,000',
    annualReturn: '₹12,000',
    totalReturns: '₹1,20,000',
    refund: '₹1,00,000',
    totalCash: '₹2,20,000',
  },
  {
    title: '₹2 Lakh Tier',
    investment: '₹2,00,000',
    annualReturn: '₹24,000',
    totalReturns: '₹2,40,000',
    refund: '₹2,00,000',
    totalCash: '₹4,40,000',
  },
  {
    title: '₹10 Lakh Membership Tier',
    investment: '₹10,00,000',
    annualReturn: '₹1,20,000',
    totalReturns: '₹12,00,000',
    refund: '₹10,00,000',
    totalCash: '₹22,00,000',
  },
  {
    title: '₹25 Lakh Tier',
    investment: '₹25,00,000',
    annualReturn: '₹3,00,000',
    totalReturns: '₹30,00,000',
    refund: '₹25,00,000',
    totalCash: '₹55,00,000',
  },
  {
    title: '₹50 Lakh Tier',
    investment: '₹50,00,000',
    annualReturn: '₹6,00,000',
    totalReturns: '₹60,00,000',
    refund: '₹50,00,000',
    totalCash: '₹1,10,00,000',
  },
  {
    title: '₹1 Crore Tier',
    investment: '₹1,00,00,000',
    annualReturn: '₹12,00,000',
    totalReturns: '₹1,20,00,000',
    refund: '₹1,00,00,000',
    totalCash: '₹2,20,00,000',
  },
];

const FEATURES = [
  { slug: 'resort-and-villas', caption: 'Luxury Resorts' },
  { slug: 'organic-farming-and-farm-stay', caption: 'Farm Stay' },
  { slug: 'family-fun-and-adventure', caption: 'Adventure Activities' },
  { slug: 'animal-farm-and-dairy-farm', caption: 'Organic Farming' },
  { slug: 'waterfall', caption: 'Nature & Waterfalls' },
];

const WHY_INVEST = [
  {
    title: 'Sustainable Agrotourism',
    body: 'Project with long-term growth potential',
  },
  {
    title: 'Luxury Infrastructure',
    body: 'Resorts, Adventure & Recreational Facilities',
  },
  {
    title: 'Assured Annual Returns',
    body: 'Attractive returns for 10 years',
  },
  {
    title: 'Principal Refund',
    body: '100% of your investment after 10 years',
  },
  {
    title: 'Heritage & Nature Combined',
    body: 'Invest in greenery, community & a better tomorrow',
  },
];

export default function Investment() {
  return (
    <div className="bg-ivory-white">
      <section className="relative h-[58vh] min-h-[26rem] overflow-hidden">
        <EstateImage
          slug="integrated"
          alt="Sunrise over the BAMBARDDARA estate terraces"
          sizes="100vw"
          priority
          className="h-full w-full object-cover"
        />
        <div className="lux-scrim absolute inset-0" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-editorial px-6 pb-16 md:px-10 md:pb-20">
            <span className="lux-label text-muted-gold">Investment</span>
            <h1 className="mt-6 max-w-3xl font-heading text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.06] text-ivory-white">
              Invest in Nature.
              <span className="block italic text-muted-gold">
                Secure Your Future.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl font-body text-[0.95rem] font-light leading-[1.85] text-ivory-white/70 md:text-[1.05rem]">
              Capitalize on India's booming agrotourism sector with an
              asset-backed investment offering strong annual yields and a 100%
              principal refund guarantee.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory-white">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="Investment Plans"
            title={
              <>
                10-Year Investment Plans
                <span className="block italic text-luxury-gold">
                  Choose Your Tier
                </span>
              </>
            }
            lede="All plans offer a 10-year tenure with assured annual returns and 100% principal refund. Select the investment tier that aligns with your financial goals."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {PLANS.map((plan, idx) => (
              <Reveal key={plan.title} delay={idx * 100}>
                <div className="flex h-full flex-col border border-stone bg-white p-8 shadow-sm transition-shadow duration-700 hover:shadow-xl">
                  <h3 className="font-heading text-xl font-light text-forest-green">
                    {plan.title}
                  </h3>
                  <span className="mt-3 block font-heading text-2xl font-light text-dark-charcoal">
                    {plan.investment}
                  </span>
                  <span className="lux-rule mt-5" />
                  <dl className="mt-6 flex-1 space-y-4">
                    <div>
                      <dt className="font-body text-[0.625rem] uppercase tracking-label text-light-charcoal">
                        Annual Return
                      </dt>
                      <dd className="mt-1.5 font-body text-[0.95rem] font-light text-forest-green">
                        {plan.annualReturn}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-body text-[0.625rem] uppercase tracking-label text-light-charcoal">
                        Total Returns (10 Years)
                      </dt>
                      <dd className="mt-1.5 font-body text-[0.95rem] font-light text-dark-charcoal">
                        {plan.totalReturns}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-body text-[0.625rem] uppercase tracking-label text-light-charcoal">
                        Principal Refund
                      </dt>
                      <dd className="mt-1.5 font-body text-[0.95rem] font-light text-dark-charcoal">
                        {plan.refund}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-body text-[0.625rem] uppercase tracking-label text-light-charcoal">
                        Total Cash Received
                      </dt>
                      <dd className="mt-1.5 font-body text-[0.95rem] font-light text-forest-green">
                        {plan.totalCash}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link to="/enquire" className="lux-btn-dark">
              <span>Download Investment Prospectus</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-forest-green">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="Why Invest"
            title={
              <>
                Why Invest with
                <span className="block italic text-muted-gold">
                  BAMBARDDARA?
                </span>
              </>
            }
            align="center"
            tone="light"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {WHY_INVEST.slice(0, 3).map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="border border-ivory-white/15 bg-deep-forest p-8">
                  <h3 className="font-heading text-xl font-light text-ivory-white">
                    {item.title}
                  </h3>
                  <span className="lux-rule mt-5 bg-muted-gold" />
                  <p className="mt-5 font-body text-[0.9rem] font-light leading-[1.85] text-ivory-white/70">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
              {WHY_INVEST.slice(3).map((item, idx) => (
                <Reveal key={item.title} delay={(idx + 3) * 100}>
                  <div className="border border-ivory-white/15 bg-deep-forest p-8">
                    <h3 className="font-heading text-xl font-light text-ivory-white">
                      {item.title}
                    </h3>
                    <span className="lux-rule mt-5 bg-muted-gold" />
                    <p className="mt-5 font-body text-[0.9rem] font-light leading-[1.85] text-ivory-white/70">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-3xl mt-16">
            <blockquote className="border-l-2 border-muted-gold pl-8">
              <p className="font-heading text-2xl font-light italic text-ivory-white md:text-3xl">
                "A rupee invested in nature returns wealth for life."
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <SectionHeading
                label="The Vision"
                title={
                  <>
                    Physical assets,
                    <span className="block italic text-luxury-gold">
                      real returns
                    </span>
                  </>
                }
                lede="Every rupee invested becomes a brick, a tree, or a machine. We do not trade paper. We build things you can walk around, touch, and be proud of."
              />
              <div className="mt-10">
                <Link to="/enquire" className="lux-btn-dark">
                  <span>Download Investment Prospectus</span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="lux-frame aspect-[4/5] w-full sm:aspect-[16/11]">
                <EstateImage
                  slug="integrated"
                  alt="Estate infrastructure and planted avenues"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          label="Feature Images"
          title={
            <>
              Explore Our
              <span className="block italic text-luxury-gold">
                Investment Assets
              </span>
            </>
          }
          align="center"
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.slice(0, 3).map((feature, idx) => (
            <Reveal key={feature.slug} delay={idx * 120}>
              <div className="lux-frame aspect-[4/3] w-full">
                <EstateImage
                  slug={feature.slug}
                  alt={feature.caption}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <span className="font-heading text-xl font-light text-ivory-white">
                    {feature.caption}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-4xl">
            {FEATURES.slice(3).map((feature, idx) => (
              <Reveal key={feature.slug} delay={(idx + 3) * 120}>
                <div className="lux-frame aspect-[4/3] w-full">
                  <EstateImage
                    slug={feature.slug}
                    alt={feature.caption}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <span className="font-heading text-xl font-light text-ivory-white">
                      {feature.caption}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-warm-sand">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-light text-forest-green md:text-4xl">
              SAFE INVESTMENT | SECURE FUTURE | SUSTAINABLE GROWTH
            </h2>

            <div className="mt-16 border-t border-stone pt-12 text-left">
              <span className="lux-label text-luxury-gold">Contact Details</span>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-light text-forest-green">
                    BAMBARDDARA AGROTOURISM PVT. LTD.
                  </h3>
                  <p className="mt-3 font-body text-[0.9rem] font-light leading-[1.85] text-light-charcoal">
                     Address: Parale Nina Shahuwadi Kolhapur Maharashtra 416 003, India
                  </p>
                  <p className="mt-1 font-body text-[0.9rem] font-light leading-[1.85] text-light-charcoal">
                     Phone: +91 7588775757 / +91 9322275757
                  </p>
                  <p className="mt-1 font-body text-[0.9rem] font-light leading-[1.85] text-light-charcoal">
                    Website: www.bambardaraagrotourism.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-stone pt-12 text-left">
              <span className="lux-label text-luxury-gold">Disclaimer</span>
              <p className="mt-6 font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                "This is a projected return structure based on estimated performance. Please read all terms & conditions carefully before investing."
              </p>
            </div>

            <div className="mt-16">
              <Link to="/enquire" className="lux-btn-dark">
                <span>Download Investment Prospectus</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
