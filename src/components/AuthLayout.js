import React from 'react';
import EstateImage from './EstateImage';

/* Shared field classes so both auth forms stay identical. */
export const FIELD_LABEL =
  'block font-body text-[0.625rem] uppercase tracking-label text-light-charcoal';

export const FIELD_INPUT =
  'mt-3 w-full border-0 border-b border-stone bg-transparent pb-3 font-body ' +
  'text-[0.95rem] font-light text-dark-charcoal placeholder:text-light-charcoal/50 ' +
  'transition-colors duration-500 focus:border-luxury-gold focus:outline-none focus:ring-0';

export const SUBMIT_BUTTON =
  'mt-4 w-full border border-forest-green bg-forest-green px-8 py-4 font-body ' +
  'text-label uppercase text-ivory-white transition-colors duration-500 ' +
  'hover:bg-transparent hover:text-forest-green disabled:cursor-not-allowed ' +
  'disabled:opacity-45 disabled:hover:bg-forest-green disabled:hover:text-ivory-white';

export const GOOGLE_BUTTON =
  'flex w-full items-center justify-center gap-3 border border-stone px-8 py-4 ' +
  'font-body text-label uppercase text-dark-charcoal transition-colors duration-500 ' +
  'hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-45';

export function GoogleMark() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/**
 * Split-screen shell for the auth routes: estate photography on one side,
 * the form on ivory on the other. `pt` clears the fixed header.
 */
export default function AuthLayout({
  slug,
  imageAlt,
  quote,
  label,
  title,
  intro,
  children,
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Plate */}
      <div className="relative hidden overflow-hidden lg:block">
        <EstateImage
          slug={slug}
          alt={imageAlt}
          sizes="50vw"
          priority
          className="h-full w-full object-cover"
        />
        <div className="lux-scrim absolute inset-0" />
        <div className="absolute inset-0 flex items-end p-14">
          <p className="max-w-md font-heading text-2xl font-light italic leading-snug text-ivory-white">
            {quote}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-ivory-white px-6 pb-20 pt-32 md:px-14">
        <div className="w-full max-w-md">
          <span className="lux-label">{label}</span>
          <h1 className="mt-6 font-heading text-[clamp(2rem,4vw,2.75rem)] font-light leading-tight text-forest-green">
            {title}
          </h1>
          <span className="lux-rule mt-6" />
          <p className="mt-6 font-body text-[0.9rem] font-light leading-[1.85] text-light-charcoal">
            {intro}
          </p>

          <div className="mt-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
