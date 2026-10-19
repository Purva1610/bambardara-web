import React from 'react';
import { Link } from 'react-router-dom';
import EstateImage from './EstateImage';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const NAV_COLUMNS = [
  {
    heading: 'Resort',
    links: [
      { name: 'Residences & Stays', href: '/stays' },
      { name: 'Spa & Wellness', href: '/spa' },
      { name: 'Fine Dining', href: '/dining' },
      { name: 'Occasions & Weddings', href: '/occasions' },
    ],
  },
  {
    heading: 'Experiences',
    links: [
      { name: 'All Experiences', href: '/experiences' },
      { name: 'Water Park', href: '/waterpark' },
      { name: 'Lake Boating', href: '/boating' },
      { name: 'Ropeway Ride', href: '/ropeway' },
      { name: 'Outdoor Adventures', href: '/experiences/adventures' },
      { name: 'Fun & Leisure', href: '/experiences/leisure' },
    ],
  },
  {
    heading: 'Nature Trails',
    links: [
      { name: 'Nature Trails Hub', href: '/nature-trails' },
      { name: 'Bambarddara Waterfall', href: '/nature-trails/waterfall' },
      { name: 'Kadavi Dam', href: '/nature-trails/kadavi-dam' },
      { name: 'Oxygen Park', href: '/nature-trails/oxygen-park' },
    ],
  },
  {
    heading: 'Agro & Animal Farm',
    links: [
      { name: 'Organic Farming', href: '/agro-farming/organic-farming' },
      { name: 'High Tech Nursery', href: '/agro-farming/high-tech-nursery' },
      { name: 'Indoor Plantation', href: '/agro-farming/nursery' },
      { name: 'Dairy Farm', href: '/agro-farming/dairy-farm' },
      { name: 'Animal Care', href: '/agro-farming/animal-care' },
      { name: 'Fish Farming', href: '/agro-farming/fish-farming' },
    ],
  },
  {
    heading: 'Cultural & Heritage',
    links: [
      { name: 'Cultural Hub', href: '/cultural-experience' },
      { name: 'Shivaji Maharaj Statue', href: '/cultural-experience/shivaji-statue' },
      { name: 'Sacred Temple', href: '/cultural-experience/temple' },
      { name: 'International Meditation Center', href: '/cultural-experience/meditation-center' },
    ],
  },
  {
    heading: 'Estate & Enquiries',
    links: [
      { name: 'Membership', href: '/membership' },
      { name: 'Investment Opportunities', href: '/investment' },
      { name: 'Plan Your Visit', href: '/enquire' },
      { name: 'Direct Enquiries', href: '/enquire' },
    ],
  },
];

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-luxury-gold/20 bg-dark-brown px-6 pt-20 text-ivory-white md:px-10 md:pt-24">
      <div className="mx-auto max-w-editorial">
        {/* Brand Header Strip */}
        <div className="flex flex-col items-center border-b border-ivory-white/10 pb-14 text-center">
          <Link to="/" className="group flex flex-col items-center">
            <div className="mb-4 h-16 w-16 transition-transform duration-500 group-hover:scale-105">
              <EstateImage slug="logo" alt="BAMBARDDARA" fit="contain" className="h-full w-full" />
            </div>
            <span className="font-heading text-3xl font-light tracking-[0.1em] text-ivory-white md:text-4xl">
              BAMBARDDARA
            </span>
            <span className="mt-2.5 font-body text-[0.625rem] font-medium uppercase tracking-[0.25em] text-luxury-gold">
              Agro Tourism Pvt. Ltd. &middot; Western Ghats
            </span>
          </Link>

          <p className="mt-6 max-w-2xl font-body text-sm font-light leading-relaxed text-ivory-white/70">
            One hundred fifty acres of pristine mountain paradise and working farmland in Kolhapur district,
            crafted with international hospitality, scenic agrotourism, and thrilling adventures.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/enquire"
              className="inline-flex items-center gap-2 rounded-sm bg-luxury-gold px-7 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-dark-brown transition-all duration-300 hover:bg-rich-gold hover:shadow-gold hover:-translate-y-0.5"
            >
              <span>Book Your Visit</span>
              <FaArrowRight className="h-3 w-3" />
            </Link>
            <a
              href="tel:+917588775757"
              className="inline-flex items-center gap-2 rounded-sm border border-ivory-white/30 px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.18em] text-ivory-white transition-all duration-300 hover:border-ivory-white hover:bg-ivory-white/10 hover:-translate-y-0.5"
            >
              <FaPhoneAlt className="h-3 w-3 text-luxury-gold" />
              <span>+91 75887 75757</span>
            </a>
          </div>
        </div>

        {/* Navigation Grid mirrored from Header */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-16 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8">
          {NAV_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col">
              <h3 className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-luxury-gold">
                {col.heading}
              </h3>
              <span className="mt-3 block h-px w-6 bg-luxury-gold/50" />
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="font-body text-[0.82rem] font-light leading-snug text-ivory-white/65 transition-all duration-300 hover:text-luxury-gold hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 gap-8 border-t border-ivory-white/10 py-12 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="mt-1 h-4 w-4 flex-shrink-0 text-luxury-gold" />
            <div>
              <span className="font-body text-[0.625rem] font-medium uppercase tracking-widest text-ivory-white/40">
                Location
              </span>
              <p className="mt-1 font-body text-sm font-light text-ivory-white/80">
                Parale Ninai, Shahuwadi, Kolhapur, Maharashtra 416215, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaPhoneAlt className="mt-1 h-4 w-4 flex-shrink-0 text-luxury-gold" />
            <div>
              <span className="font-body text-[0.625rem] font-medium uppercase tracking-widest text-ivory-white/40">
                Reservations &amp; Enquiries
              </span>
              <div className="mt-1 space-y-0.5">
                <a
                  href="tel:+917588775757"
                  className="block font-body text-sm font-light text-ivory-white/80 hover:text-luxury-gold transition-colors"
                >
                  +91 75887 75757
                </a>
                <a
                  href="tel:+919322275757"
                  className="block font-body text-sm font-light text-ivory-white/80 hover:text-luxury-gold transition-colors"
                >
                  +91 93222 75757
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaEnvelope className="mt-1 h-4 w-4 flex-shrink-0 text-luxury-gold" />
            <div>
              <span className="font-body text-[0.625rem] font-medium uppercase tracking-widest text-ivory-white/40">
                Email
              </span>
              <p className="mt-1">
                <a
                  href="mailto:info@bambarddara.com"
                  className="font-body text-sm font-light text-ivory-white/80 hover:text-luxury-gold transition-colors"
                >
                  info@bambarddara.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ivory-white/10 py-8 text-xs font-light text-ivory-white/45 sm:flex-row">
          <p className="font-body">
            &copy; {new Date().getFullYear()} BAMBARDDARA Agro Tourism Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-body text-[0.75rem]">
            <Link to="/enquire" className="hover:text-luxury-gold transition-colors">
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <Link to="/enquire" className="hover:text-luxury-gold transition-colors">
              Terms of Service
            </Link>
            <span>&middot;</span>
            <Link to="/enquire" className="hover:text-luxury-gold transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
