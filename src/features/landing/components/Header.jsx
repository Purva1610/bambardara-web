import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { name: 'Estate',      hash: '#estate' },
  { name: 'Residences',  href: '/stays' },
  { name: 'Spa',         href: '/spa' },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Dining',      hash: '#dining' },
  { name: 'Occasions',   hash: '#occasions' },
  { name: 'Gallery',     hash: '#gallery' },
  { name: 'Investment',  href: '/investment' },
  { name: 'Membership',  href: '/membership' },
];

export default function Header({ user, onLogout }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const solid = scrolled || !isHome;

  const getHref = (link) =>
    link.href ? link.href : isHome ? link.hash : `/${link.hash}`;

  /* Shared classes for every nav link */
  const linkCls = [
    'font-body text-[0.7rem] uppercase tracking-wide whitespace-nowrap',
    'transition-all duration-500 ease-out relative',
    solid
      ? 'text-forest-green hover:text-luxury-gold'
      : 'text-ivory-white/90 hover:text-luxury-gold',
  ].join(' ');

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-luxe',
        'overflow-x-hidden',          /* hard clip — nothing can escape the header */
        solid
          ? 'bg-ivory-white/95 shadow-sm backdrop-blur-sm'
          : 'bg-gradient-to-b from-black/75 via-black/35 to-transparent',
      ].join(' ')}
    >
      {/* ─── Main bar ─────────────────────────────────────────── */}
      <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 flex items-center gap-3 transition-all duration-500 group"
        >
          <div className="h-11 w-11 rounded-full overflow-hidden flex items-center justify-center bg-ivory-white/90 border border-luxury-gold/50 shadow-sm p-1 transition-all duration-500 group-hover:border-luxury-gold group-hover:scale-105">
            <img
              src="/images/opt/logo.png"
              alt="BAMBARDDARA"
              className="h-full w-full object-contain"
            />
          </div>
          <span className={[
            'font-heading text-lg tracking-[0.06em] transition-colors duration-500',
            solid ? 'text-forest-green' : 'text-ivory-white',
          ].join(' ')}>
            BAMBARDDARA
          </span>
        </Link>

        {/* ── Desktop nav ── visible at xl (1280 px+) */}
        <nav
          aria-label="Main navigation"
          className="hidden xl:flex items-center gap-[1.1rem]"
        >
          {NAV_LINKS.map((link) =>
            link.href ? (
              <Link key={link.name} to={link.href} className={linkCls}>
                {link.name}
              </Link>
            ) : (
              <a key={link.name} href={getHref(link)} className={linkCls}>
                {link.name}
              </a>
            )
          )}
        </nav>

        {/* ── Desktop right actions ── */}
        <div className="hidden xl:flex items-center gap-4 shrink-0">
          {user ? (
            <button type="button" onClick={onLogout} className={linkCls}>
              Sign Out
            </button>
          ) : (
            <Link to="/login" className={linkCls}>
              Sign In
            </Link>
          )}

          <Link
            to="/enquire"
            className={[
              'inline-flex items-center border px-5 py-2.5',
              'font-body text-[0.7rem] uppercase tracking-wide whitespace-nowrap',
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
