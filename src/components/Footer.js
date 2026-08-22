import React from 'react';
import { Link } from 'react-router-dom';

const COLUMNS = [
  {
    heading: 'The Estate',
    links: [
      { name: 'Our Story', href: '/#estate' },
      { name: 'Stewardship', href: '/#sustainability' },
      { name: 'Gallery', href: '/#gallery' },
      { name: 'Board of Directors', href: '/#estate' },
    ],
  },
  {
    heading: 'Stay',
    links: [
      { name: 'The Valley Villas', href: '/#stays' },
      { name: 'Luxury Suites', href: '/#stays' },
      { name: 'The Farmhouse Rooms', href: '/#stays' },
      { name: 'Riverside Tented Camp', href: '/#stays' },
    ],
  },
  {
    heading: 'Experience',
    links: [
      { name: 'Safari & Wildlife', href: '/#experiences' },
      { name: 'Trails & Waterfalls', href: '/#experiences' },
      { name: 'Spa & Wellness', href: '/#wellness' },
      { name: 'Dining', href: '/#dining' },
    ],
  },
  {
    heading: 'Occasions',
    links: [
      { name: 'Weddings', href: '/#occasions' },
      { name: 'Conferences', href: '/#occasions' },
      { name: 'Harvest Nights', href: '/#occasions' },
      { name: 'Enquiries', href: '/enquire' },
    ],
  },
  {
    heading: 'Opportunities',
    links: [
      { name: 'Membership', href: '/membership' },
      { name: 'Investment', href: '/investment' },
      { name: 'Enquiries', href: '/enquire' },
    ],
  },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-dark-charcoal px-6 pt-24 md:px-10">
      <div className="mx-auto max-w-editorial">
        {/* Wordmark */}
        <div className="flex flex-col items-center border-b border-ivory-white/12 pb-16 text-center">
          <Link to="/" className="flex flex-col items-center">
            <span className="font-heading text-3xl font-light tracking-[0.08em] text-ivory-white md:text-4xl">
              BAMBARDDARA
            </span>
            <span className="mt-3 font-body text-[0.5625rem] uppercase tracking-label text-luxury-gold">
              Agro Tourism Estate &middot; Western Ghats
            </span>
          </Link>

          <p className="mt-8 max-w-prose font-body text-[0.875rem] font-light leading-[1.9] text-ivory-white/55">
            One hundred fifty acres of working farmland in Kolhapur district, kept to the
            standards of a fine hotel. Booked directly, always.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="font-body text-label uppercase text-luxury-gold">
                {col.heading}
              </h3>
              <span className="mt-5 block h-px w-8 bg-luxury-gold/40" />
              <ul className="mt-6 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-body text-[0.875rem] font-light text-ivory-white/60 transition-colors duration-500 hover:text-luxury-gold"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="grid grid-cols-1 gap-8 border-t border-ivory-white/12 py-14 sm:grid-cols-3">
          {[
            ['Address', ['Parale Nina Shahuwadi Kolhapur Maharashtra 416 003, India']],
            ['Telephone', ['+91 7588775757', '+91 9322275757']],
            ['Email', ['info@bambarddara.com']],
          ].map(([label, lines]) => (
            <div key={label}>
              <span className="font-body text-[0.625rem] uppercase tracking-label text-ivory-white/40">
                {label}
              </span>
              {lines.map((line, index) => (
                <p
                  key={`${label}-${line}-${index}`}
                  className="mt-2 font-body text-[0.875rem] font-light text-ivory-white/70"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ivory-white/12 py-8 sm:flex-row">
          <p className="font-body text-[0.75rem] font-light text-ivory-white/40">
            &copy; {new Date().getFullYear()} BAMBARDDARA Agro Tourism. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Accessibility'].map((item) => (
              <span
                key={item}
                className="font-body text-[0.75rem] font-light text-ivory-white/40"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
