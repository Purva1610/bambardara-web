import React from 'react';
import Reveal from './Reveal';

/**
 * The label / gold hairline / serif heading / lede stack that opens every
 * section. `tone` switches the type colours for use over dark grounds.
 */
export default function SectionHeading({
  label,
  title,
  lede,
  tone = 'dark',
  align = 'left',
  className = '',
}) {
  const light = tone === 'light';
  const centered = align === 'center';

  return (
    <div
      className={`${centered ? 'mx-auto max-w-prose text-center' : 'max-w-2xl'} ${className}`}
    >
      {label && (
        <Reveal>
          <span className={`lux-label ${light ? 'text-muted-gold' : ''}`}>
            {label}
          </span>
        </Reveal>
      )}

      <Reveal delay={80}>
        <span
          className={`lux-rule mt-5 ${centered ? 'mx-auto origin-center' : ''} ${
            light ? 'bg-muted-gold' : ''
          }`}
        />
      </Reveal>

      <Reveal delay={140}>
        <h2
          className={`mt-7 text-section font-heading ${
            light ? 'text-ivory-white' : 'text-forest-green'
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={220}>
          <p
            className={`mt-6 max-w-prose font-body text-[0.95rem] font-light leading-[1.9] ${
              centered ? 'mx-auto' : ''
            } ${light ? 'text-ivory-white/70' : 'text-light-charcoal'}`}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
