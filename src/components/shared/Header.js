import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EstateImage from './EstateImage';
import { EXPERIENCES } from '../../data/experiences';

const ADVENTURE_ITEMS = EXPERIENCES
  .filter((e) => e.type === 'adventures')
  .map((e) => ({ name: e.title, href: `/experience/${e.id}` }));

const FUN_ITEMS = EXPERIENCES
  .filter((e) => e.type === 'leisure')
  .map((e) => ({ name: e.title, href: `/experience/${e.id}` }));

/* Routes that open on a full-bleed dark hero, like the homepage, and so want
   the header to start transparent and turn solid only once the visitor
   scrolls past it. Everything else (auth screens, 404) opens on a plain
   light background and needs the solid header from the first frame. */
const HERO_ROUTES = [
  '/experiences',
  '/spa',
  '/spa/booking',
  '/dining',
  '/agro-farming',
  '/agro-farming/nursery',
  '/agro-farming/high-tech-nursery',
  '/agro-farming/organic-farming',
  '/agro-farming/animal-farm',
  '/agro-farming/animal-care',
  '/agro-farming/fish-farming',
  '/cultural-experience',
  '/cultural-experience/shivaji-statue',
  '/cultural-experience/temple',
  '/cultural-experience/meditation-center',
  '/occasions',
  '/membership',
  '/investment',
  '/enquire',
  '/stays',
  '/nature-trails',
  '/nature-trails/waterfall',
  '/nature-trails/bambarddara-waterfall',
  '/nature-trails/kadavi-dam',
  '/nature-trails/oxygen-park',
  '/experience/nature-trails',
];
const hasHeroAtTop = (pathname) =>
  pathname === '/' ||
  HERO_ROUTES.includes(pathname) ||
  pathname.startsWith('/stays/') ||
  pathname.startsWith('/room/') ||
  pathname.startsWith('/nature-trails') ||
  pathname.startsWith('/experiences/') ||
  pathname.startsWith('/experience/');

const NAV_LINKS = [
  {
    name: 'Resort',
    children: [
      { name: 'Residences', href: '/stays' },
      { name: 'Spa',        href: '/spa' },
      { name: 'Dining',     href: '/dining' },
      { name: 'Occasions',  href: '/occasions' },
    ],
  },
  {
    name: 'Experiences',
    href: '/experiences',
    groups: [
      { title: 'Adventure', href: '/experiences/adventures', items: ADVENTURE_ITEMS },
      { title: 'Fun',       href: '/experiences/leisure',    items: FUN_ITEMS },
    ],
  },
  {
    name: 'Nature Trails',
    href: '/nature-trails',
    children: [
      { name: 'Bambarddara Waterfall', href: '/nature-trails/waterfall' },
      { name: 'Kadavi Dam',             href: '/nature-trails/kadavi-dam' },
      { name: 'Oxygen Park',            href: '/nature-trails/oxygen-park' },
    ],
  },
  {
    name: 'Agro Farming',
    href: '/agro-farming',
    children: [
      { name: 'Organic Farming',   href: '/agro-farming/organic-farming' },
      { name: 'High Tech Nursery', href: '/agro-farming/high-tech-nursery' },
      { name: 'Indoor Plantation', href: '/agro-farming/nursery' },
    ],
  },
  {
    name: 'Animal Farm',
    href: '/agro-farming/animal-farm',
    children: [
      { name: 'Dairy Farm',    href: '/agro-farming/dairy-farm' },
      { name: 'Animal Care',   href: '/agro-farming/animal-care' },
      { name: 'Fish Farming',  href: '/agro-farming/fish-farming' },
    ],
  },
  {
    name: 'Cultural Experience',
    href: '/cultural-experience',
    children: [
      { name: 'Shivaji Maharaj Statue', href: '/cultural-experience/shivaji-statue' },
      { name: 'Temple',                 href: '/cultural-experience/temple' },
      { name: 'International Meditation Center', href: '/cultural-experience/meditation-center' },
    ],
  },
  { name: 'Membership',  href: '/membership' },
];

export default function Header({ user, onLogout }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpenMenu, setMobileOpenMenu] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const solid = scrolled || !hasHeroAtTop(pathname);

  const getHref = (link) =>
    link.href ? link.href : isHome ? link.hash : `/${link.hash}`;

  /* Shared classes for every nav link. `group` scopes the hover underline
     in <NavLabel> to just this one link. */
  const linkCls = [
    'group font-body text-[0.7rem] uppercase tracking-[0.12em] whitespace-nowrap',
    'transition-colors duration-500 ease-out relative',
    solid
      ? 'text-forest-green hover:text-luxury-gold'
      : 'text-ivory-white/90 hover:text-luxury-gold',
  ].join(' ');

  /* A label with a gold underline that slides in from the left on hover,
     used for every top-level nav trigger. */
  const NavLabel = ({ children }) => (
    <span className="relative inline-block py-1">
      {children}
      <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-luxury-gold transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </span>
  );

  /* `side` flips which edge a dropdown hangs from, so menus on the
     right-hand nav don't spill off the edge of the viewport. */
  const renderNavLink = (link, side = 'left') => {
    if (link.children) {
      return (
        <div
          key={link.name}
          className="relative"
          onMouseEnter={() => setOpenMenu(link.name)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {link.href ? (
            <Link to={link.href} className={linkCls}>
              <NavLabel>{link.name}</NavLabel>
            </Link>
          ) : (
            <button type="button" className={linkCls}>
              <NavLabel>{link.name}</NavLabel>
            </button>
          )}
          <div
            className={[
              side === 'right' ? 'absolute right-0 top-full pt-3' : 'absolute left-0 top-full pt-3',
              'transition-all duration-300',
              openMenu === link.name ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none',
            ].join(' ')}
          >
            <div className="min-w-[10rem] border border-stone bg-ivory-white shadow-lg py-2 z-50">
              {link.children.map((child) => (
                child.href ? (
                  <Link
                    key={child.name}
                    to={child.href}
                    className="block px-5 py-2.5 font-body text-[0.7rem] uppercase tracking-wide text-forest-green hover:bg-warm-sand hover:text-luxury-gold whitespace-nowrap"
                  >
                    {child.name}
                  </Link>
                ) : (
                  <a
                    key={child.name}
                    href={getHref(child)}
                    className="block px-5 py-2.5 font-body text-[0.7rem] uppercase tracking-wide text-forest-green hover:bg-warm-sand hover:text-luxury-gold whitespace-nowrap"
                  >
                    {child.name}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (link.groups) {
      return (
        <div
          key={link.name}
          className="relative"
          onMouseEnter={() => setOpenMenu(link.name)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <Link to={link.href} className={linkCls}>
            <NavLabel>{link.name}</NavLabel>
          </Link>
          <div
            className={[
              'absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-300',
              openMenu === link.name ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none',
            ].join(' ')}
          >
            <div className="flex min-w-[32rem] gap-8 border border-stone bg-ivory-white shadow-lg p-6 z-50">
              {link.groups.map((group) => (
                <div key={group.title} className="flex-1">
                  <Link
                    to={group.href}
                    className="block font-heading text-sm font-light tracking-wide text-luxury-gold hover:text-forest-green"
                  >
                    {group.title}
                  </Link>
                  <span className="mt-2 block h-px w-8 bg-stone" />
                  <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block py-1.5 font-body text-[0.7rem] uppercase tracking-wide text-forest-green hover:text-luxury-gold whitespace-nowrap"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (link.href) {
      return (
        <Link key={link.name} to={link.href} className={linkCls}>
          <NavLabel>{link.name}</NavLabel>
        </Link>
      );
    }

    return (
      <a key={link.name} href={getHref(link)} className={linkCls}>
        <NavLabel>{link.name}</NavLabel>
      </a>
    );
  };

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 isolate transition-colors duration-700 ease-luxe',
        solid
          ? 'bg-ivory-white/95 shadow-sm backdrop-blur-sm'
          : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent',
      ].join(' ')}
    >
      {/* ─── Main bar ─────────────────────────────────────────── */}
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 flex items-center gap-2.5 transition-all duration-500 group"
        >
          <div className="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center bg-ivory-white/90 border border-luxury-gold/50 shadow-sm p-1 transition-all duration-500 group-hover:border-luxury-gold group-hover:scale-105">
            <EstateImage
              slug="logo"
              alt="BAMBARDDARA"
              fit="contain"
              priority
              className="h-full w-full"
            />
          </div>
          <span className="flex flex-col leading-tight">
            <span className={[
              'font-heading text-base tracking-[0.08em] transition-colors duration-500',
              solid ? 'text-forest-green' : 'text-ivory-white',
            ].join(' ')}>
              BAMBARDDARA
            </span>
            <span className={[
              'font-body text-[0.55rem] tracking-[0.25em] transition-colors duration-500',
              solid ? 'text-forest-green/70' : 'text-ivory-white/80',
            ].join(' ')}>
              AGRO TOURISM
            </span>
          </span>
        </Link>

        {/* ── Desktop nav ── visible at xl (1280 px+) */}
        <nav
          aria-label="Main navigation"
          className="hidden xl:flex items-center gap-[1.1rem]"
        >
          {NAV_LINKS.map((link) => renderNavLink(link, 'left'))}
        </nav>

        {/* ── Desktop right actions ── */}
        <div className="hidden xl:flex items-center gap-4 shrink-0">
          {user ? (
            <button type="button" onClick={onLogout} className={linkCls}>
              <NavLabel>Sign Out</NavLabel>
            </button>
          ) : (
            <Link to="/login" className={linkCls}>
              <NavLabel>Sign In</NavLabel>
            </Link>
          )}

          <Link
            to="/enquire"
            className={[
              'inline-flex items-center border px-6 py-2',
              'font-body text-[0.65rem] uppercase tracking-[0.15em] whitespace-nowrap',
              'transition-all duration-700 ease-out',
              solid
                ? 'border-forest-green text-forest-green hover:bg-forest-green hover:text-ivory-white hover:shadow-lg'
                : 'border-ivory-white/50 text-ivory-white hover:bg-ivory-white hover:text-dark-charcoal hover:shadow-lg',
            ].join(' ')}
          >
            Enquire
          </Link>
        </div>

        {/* ── Hamburger — visible below xl ── */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className={[
            'xl:hidden flex h-10 w-10 items-center justify-center',
            'transition-colors duration-500',
            solid ? 'text-forest-green' : 'text-ivory-white',
          ].join(' ')}
        >
          {/* Three-line / X icon */}
          <svg
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <>
                <line x1="4" y1="4"  x2="20" y2="20" />
                <line x1="20" y1="4" x2="4"  y2="20" />
              </>
            ) : (
              <>
                <line x1="3" y1="6"  x2="21" y2="6"  />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* ─── Mobile / Tablet drawer ─────────────────────────── */}
      <div
        className={[
          'xl:hidden overflow-hidden transition-all duration-500 ease-luxe',
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
          solid ? 'bg-ivory-white border-t border-stone' : 'bg-deep-forest/97 backdrop-blur-sm',
        ].join(' ')}
      >
        <div className="flex flex-col px-5 md:px-8 pb-8 pt-2">
          {NAV_LINKS.map((link) => {
            const cls = [
              'py-4 border-b font-body text-sm uppercase tracking-wide',
              'transition-colors duration-300',
              solid
                ? 'border-stone text-forest-green hover:text-luxury-gold'
                : 'border-ivory-white/10 text-ivory-white/90 hover:text-luxury-gold',
            ].join(' ');

            if (link.children) {
              const isOpen = mobileOpenMenu === link.name;
              return (
                <div key={link.name} className={['border-b', solid ? 'border-stone' : 'border-ivory-white/10'].join(' ')}>
                  <button
                    type="button"
                    onClick={() => setMobileOpenMenu((m) => (m === link.name ? null : link.name))}
                    className={[
                      'flex w-full items-center justify-between py-4 font-body text-sm uppercase tracking-wide',
                      'transition-colors duration-300',
                      solid ? 'text-forest-green hover:text-luxury-gold' : 'text-ivory-white/90 hover:text-luxury-gold',
                    ].join(' ')}
                    aria-expanded={isOpen}
                  >
                    {link.name}
                    <span className={['transition-transform duration-300', isOpen ? 'rotate-180' : ''].join(' ')}>▾</span>
                  </button>
                  <div className={['overflow-hidden transition-all duration-300', isOpen ? 'max-h-60 pb-2' : 'max-h-0'].join(' ')}>
                    {link.children.map((child) => (
                      child.href ? (
                        <Link
                          key={child.name}
                          to={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={[
                            'block py-3 pl-4 font-body text-sm uppercase tracking-wide',
                            solid ? 'text-forest-green/80 hover:text-luxury-gold' : 'text-ivory-white/70 hover:text-luxury-gold',
                          ].join(' ')}
                        >
                          {child.name}
                        </Link>
                      ) : (
                        <a
                          key={child.name}
                          href={getHref(child)}
                          onClick={() => setMobileOpen(false)}
                          className={[
                            'block py-3 pl-4 font-body text-sm uppercase tracking-wide',
                            solid ? 'text-forest-green/80 hover:text-luxury-gold' : 'text-ivory-white/70 hover:text-luxury-gold',
                          ].join(' ')}
                        >
                          {child.name}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              );
            }

            if (link.groups) {
              const isOpen = mobileOpenMenu === link.name;
              return (
                <div key={link.name} className={['border-b', solid ? 'border-stone' : 'border-ivory-white/10'].join(' ')}>
                  <button
                    type="button"
                    onClick={() => setMobileOpenMenu((m) => (m === link.name ? null : link.name))}
                    className={[
                      'flex w-full items-center justify-between py-4 font-body text-sm uppercase tracking-wide',
                      'transition-colors duration-300',
                      solid ? 'text-forest-green hover:text-luxury-gold' : 'text-ivory-white/90 hover:text-luxury-gold',
                    ].join(' ')}
                    aria-expanded={isOpen}
                  >
                    {link.name}
                    <span className={['transition-transform duration-300', isOpen ? 'rotate-180' : ''].join(' ')}>▾</span>
                  </button>
                  <div className={['overflow-hidden transition-all duration-300', isOpen ? 'max-h-[36rem] pb-4' : 'max-h-0'].join(' ')}>
                    {link.groups.map((group) => (
                      <div key={group.title} className="mt-2">
                        <Link
                          to={group.href}
                          onClick={() => setMobileOpen(false)}
                          className={[
                            'block pl-4 py-2 font-body text-xs font-semibold uppercase tracking-wider',
                            solid ? 'text-luxury-gold' : 'text-muted-gold',
                          ].join(' ')}
                        >
                          {group.title}
                        </Link>
                        {group.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={[
                              'block py-2 pl-8 font-body text-sm uppercase tracking-wide',
                              solid ? 'text-forest-green/80 hover:text-luxury-gold' : 'text-ivory-white/70 hover:text-luxury-gold',
                            ].join(' ')}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return link.href ? (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cls}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={getHref(link)}
                onClick={() => setMobileOpen(false)}
                className={cls}
              >
                {link.name}
              </a>
            );
          })}

          {/* Auth + CTA */}
          <div className="mt-6 flex flex-col gap-4">
            {user ? (
              <button
                type="button"
                onClick={() => { onLogout(); setMobileOpen(false); }}
                className={[
                  'text-left font-body text-sm uppercase tracking-wide transition-colors duration-300',
                  solid ? 'text-forest-green' : 'text-ivory-white/90',
                  'hover:text-luxury-gold',
                ].join(' ')}
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className={[
                  'font-body text-sm uppercase tracking-wide transition-colors duration-300',
                  solid ? 'text-forest-green' : 'text-ivory-white/90',
                  'hover:text-luxury-gold',
                ].join(' ')}
              >
                Sign In
              </Link>
            )}

            <Link
              to="/enquire"
              onClick={() => setMobileOpen(false)}
              className={[
                'inline-flex items-center justify-center border px-6 py-3',
                'font-body text-sm uppercase tracking-wide transition-all duration-500',
                solid
                  ? 'border-forest-green text-forest-green hover:bg-forest-green hover:text-ivory-white'
                  : 'border-ivory-white/40 text-ivory-white hover:bg-ivory-white hover:text-dark-charcoal',
              ].join(' ')}
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
