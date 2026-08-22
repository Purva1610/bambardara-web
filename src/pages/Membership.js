import React from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/EstateImage';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const TIERS = [
  {
    name: '🌿 Silver Explorer',
    amount: '₹1,50,000',
    duration: '5 Years',
    days: '10 Days',
  },
  {
    name: '🏅 Gold Adventure',
    amount: '₹3,00,000',
    duration: '10 Years',
    days: '10 Days',
  },
  {
    name: '💎 Platinum Nature',
    amount: '₹6,00,000',
    duration: '15 Years',
    days: '15 Days',
  },
  {
    name: '👑 Diamond Heritage',
    amount: '₹10,00,000',
    duration: '20 Years',
    days: '20 Days',
  },
  {
    name: '⭐ Founder Club',
    amount: '₹30,00,000',
    duration: '30 Years',
    days: '30 Days',
  },
];

const BENEFITS = [
  {
    icon: '🏡',
    title: 'Farm Stay',
    body: 'Complimentary or discounted stays every year at our nature resorts',
  },
  {
    icon: '🥗',
    title: 'Organic Food',
    body: 'Fresh, healthy organic meals and farm produce',
  },
  {
    icon: '🌾',
    title: 'Farm Activities',
    body: 'Bullock cart rides, farming experience, fruit picking, village tours & more',
  },
  {
    icon: '🏕️',
    title: 'Adventure',
    body: 'Trekking, camping, fishing, bird watching and exciting outdoor activities',
  },
  {
    icon: '🎊',
    title: 'Wedding, Birthday, Corporate Events',
    body: 'Host your special occasions and corporate events at our premium estate',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family Benefits',
    body: 'Membership valid for you and your family members',
  },
  {
    icon: '🏛️',
    title: 'Cultural Heritage',
    body: 'Experience local traditions, festivals, and rural culture',
  },
  {
    icon: '🧖',
    title: 'Wellness & Relax',
    body: 'Meditation sessions and luxury spa experiences for complete rejuvenation',
  },
];

const GALLERY = [
  { slug: 'luxury-hotel-rooms-and-suites', caption: 'Luxury Farm Stay' },
  { slug: 'organic-farming-and-farm-stay', caption: 'Farm to Table' },
  { slug: 'family-fun-and-adventure', caption: 'Hands-On Experience' },
  { slug: 'trekking', caption: 'Adventure & Nature' },
  { slug: 'event-and-cultural-experience', caption: 'Cultural Connection' },
  { slug: 'resort-and-villas', caption: 'Memories Together' },
];

const PERKS = [
  'Priority Booking',
  'Exclusive Offers',
  'Eco Learning',
  '24×7 Support',
];

const VALUES = [
  {
    icon: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22V12" strokeLinecap="round" />
        <path d="M12 12C12 12 8 8 8 5C8 2.5 10 1 12 1C14 1 16 2.5 16 5C16 8 12 12 12 12Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 22C3 20 3 17 5 15" strokeLinecap="round" />
        <path d="M19 22C21 20 21 17 19 15" strokeLinecap="round" />
      </svg>
    ),
    text: 'Reconnect with Nature',
  },
  {
    icon: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M17 21V19C17 17 16 15 14 14C17 13 19 10.5 19 7.5C19 4.5 17 2 14 2C11 2 9 4.5 9 7.5C9 10.5 11 13 14 14C12 15 11 17 11 19V21" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 21V19C7 17 6 15 4 14C7 13 9 10.5 9 7.5C9 4.5 7 2 4 2C1 2 -1 4.5 -1 7.5C-1 10.5 1 13 4 14C2 15 1 17 1 19V21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Support Local Communities',
  },
  {
    icon: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M21 12C21 16.97 16.97 21 12 21C10.5 21 9.1 20.7 7.8 20.2L3 21L3.8 16.2C3.3 14.9 3 13.5 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 10L12 13L16 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Sustainable Tourism',
  },
  {
    icon: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12H22" strokeLinecap="round" />
        <path d="M12 2C14 5 14 8 12 12C14 16 14 19 12 22" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2C10 5 10 8 12 12C10 16 10 19 12 22" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Live Green, Travel Smart',
  },
];

export default function Membership() {
  return (
    <div className="bg-ivory-white">
      <section className="relative h-[90vh] min-h-[40rem] overflow-hidden">
        <EstateImage
          slug="international-meditation-center"
          alt="Wellness meditation center surrounded by nature"
          sizes="100vw"
          priority
          className="h-full w-full object-cover"
        />
        <div className="lux-scrim absolute inset-0" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-editorial px-6 pt-24 pb-16 md:px-10 md:pb-20">
            <span className="lux-label text-muted-gold">Membership</span>
            <h1 className="mt-6 max-w-3xl font-heading text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.06] text-ivory-white">
              BAMBARDDARA AGROTOURISM PVT. LTD.
              <span className="block italic text-muted-gold">
                AGROTURISM CLUB MEMBERSHIP
              </span>
            </h1>
            <p className="mt-8 max-w-2xl font-body text-[0.95rem] font-light leading-[1.85] text-ivory-white/70 md:text-[1.05rem]">
              Experience Nature. Create Memories.
            </p>
            <p className="mt-4 max-w-2xl font-body text-[0.95rem] font-light leading-[1.85] text-ivory-white/70 md:text-[1.05rem]">
              Become a member of the BAMBARDDARA Agrotourism Club and experience the perfect blend of nature, adventure, comfort and rural culture with exclusive benefits every year.
            </p>
            <span className="mt-8 inline-block border border-muted-gold px-5 py-2 font-body text-[0.625rem] uppercase tracking-label text-muted-gold">
              Escape the City, Embrace Nature
            </span>
          </div>
        </div>
      </section>

      <section className="bg-ivory-white">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="Membership Plans"
            title={
              <>
                Agroturism Club
                <span className="block italic text-luxury-gold">
                  Membership Plans
                </span>
              </>
            }
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {TIERS.map((tier, idx) => (
              <Reveal key={tier.name} delay={idx * 80}>
                <div className="flex h-full flex-col border border-stone bg-white p-6 text-center transition-shadow duration-700 hover:shadow-xl">
                  <span className="text-3xl">{tier.name.split(' ')[0]}</span>
                  <h3 className="mt-3 font-heading text-base font-light text-forest-green">
                    {tier.name.split(' ').slice(1).join(' ')}
                  </h3>
                  <span className="lux-rule mt-4" />
                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="block font-heading text-xl font-light text-dark-charcoal">
                        {tier.amount}
                      </span>
                      <span className="font-body text-[0.625rem] uppercase tracking-label text-light-charcoal">
                        One-Time Fee
                      </span>
                    </div>
                    <div>
                      <span className="block font-body text-sm font-light text-forest-green">
                        {tier.duration}
                      </span>
                      <span className="font-body text-[0.625rem] uppercase tracking-label text-light-charcoal">
                        Duration
                      </span>
                    </div>
                    <div>
                      <span className="block font-body text-sm font-light text-forest-green">
                        {tier.days}
                      </span>
                      <span className="font-body text-[0.625rem] uppercase tracking-label text-light-charcoal">
                        Per Year
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Link to="/enquire" className="lux-btn-dark">
              <span>Apply For Club Membership</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          label="Member Benefits"
          title={
            <>
              Exclusive Benefits
              <span className="block italic text-luxury-gold">
                For Every Member
              </span>
            </>
          }
          align="center"
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, idx) => (
            <Reveal key={benefit.title} delay={idx * 80}>
              <div className="flex h-full flex-col border border-stone bg-white p-8 transition-shadow duration-700 hover:shadow-xl">
                <span className="text-4xl">{benefit.icon}</span>
                <h3 className="mt-4 font-heading text-lg font-light text-forest-green">
                  {benefit.title}
                </h3>
                <span className="lux-rule mt-4" />
                <p className="mt-4 flex-1 font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                  {benefit.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="bg-forest-green">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="Experience Gallery"
            title={
              <>
                Explore Our
                <span className="block italic text-muted-gold">
                  Agrotourism Experience
                </span>
              </>
            }
            align="center"
            tone="light"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item, idx) => (
              <Reveal key={item.slug} delay={idx * 120}>
                <div className="lux-frame aspect-[4/3] w-full">
                  <EstateImage
                    slug={item.slug}
                    alt={item.caption}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <span className="font-heading text-xl font-light text-ivory-white">
                      {item.caption}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-forest-green">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="Additional Perks"
            title={
              <>
                More Than Just
                <span className="block italic text-muted-gold">
                  A Membership
                </span>
              </>
            }
            align="center"
            tone="light"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk, idx) => (
              <Reveal key={perk} delay={idx * 100}>
                <div className="border border-ivory-white/15 bg-deep-forest p-6 text-center">
                  <span className="font-heading text-lg font-light text-ivory-white">
                    {perk}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-warm-sand">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              label="Our Values"
              title={
                <>
                  What We Stand
                  <span className="block italic text-luxury-gold">
                    For
                  </span>
                </>
              }
              align="center"
              className="mb-12"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value, idx) => (
                <Reveal key={value.text} delay={idx * 100}>
                  <div className="flex flex-col items-center border border-stone bg-white p-8 text-center shadow-sm transition-shadow duration-700 hover:shadow-xl">
                    <span className="text-5xl">{value.icon}</span>
                    <span className="mt-4 font-body text-[0.95rem] font-light text-forest-green">
                      {value.text}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-20">
              <blockquote className="mx-auto max-w-2xl border-l-2 border-luxury-gold pl-8 text-left">
                <p className="font-heading text-2xl font-light italic text-forest-green md:text-3xl">
                  "Join Today & Create Unforgettable Memories!"
                </p>
              </blockquote>
            </div>

            <div className="mt-12">
              <Link to="/enquire" className="lux-btn-dark">
                <span>Apply For Club Membership</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
