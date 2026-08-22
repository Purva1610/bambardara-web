import React, { useEffect, useRef, useState } from 'react';

export default function EntranceGateAnimation({ onComplete }) {
  // phases: 'initial' -> 'show' -> 'opening' -> 'done'
  const [phase, setPhase] = useState('initial');
  const completedRef = useRef(false);
  const leftImgUrl = `${process.env.PUBLIC_URL}/images/gate-left.png`;
  const rightImgUrl = `${process.env.PUBLIC_URL}/images/gate-right.png`;

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('show'), 100);
    const t2 = window.setTimeout(() => setPhase('opening'), 1800);
    const t3 = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete?.();
    }, 3600);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [onComplete]);

  const isOpening = phase === 'opening';

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: '#072A1E',
    overflow: 'hidden',
    opacity: phase === 'initial' ? 1 : 1,
  };

  const splitStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
  };

  const halfBase = {
    flex: '0 0 50%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    willChange: 'transform',
    transition: isOpening
      ? 'transform 2.4s cubic-bezier(0.76, 0, 0.24, 1)'
      : 'opacity 0.6s ease',
    opacity: phase === 'initial' ? 0 : 1,
  };

  const leftStyle = {
    ...halfBase,
    backgroundImage: `url(${leftImgUrl})`,
    backgroundSize: '100% 100%',
    transform: isOpening ? 'translateX(-100%)' : 'translateX(0)',
  };

  const rightStyle = {
    ...halfBase,
    backgroundImage: `url(${rightImgUrl})`,
    backgroundSize: '100% 100%',
    transform: isOpening ? 'translateX(100%)' : 'translateX(0)',
  };

  // Logo / title overlay in the center of the gate
  const centerOverlayStyle = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 10,
    opacity: isOpening ? 0 : phase === 'show' ? 1 : 0,
    transition: 'opacity 0.8s ease',
  };

  return (
    <div style={overlayStyle} aria-hidden="true">
      <div style={splitStyle}>
        <div style={leftStyle} />
        <div style={rightStyle} />
      </div>

      {/* Dark gradient vignette so the center text is readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.0) 70%)',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: isOpening ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Center branding shown while gate is still closed */}
      <div style={centerOverlayStyle}>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(0.5625rem, 1.2vw, 0.6875rem)',
            fontWeight: 400,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#C9A86A',
            marginBottom: '1.4rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          Western Ghats &middot; Est. 2019
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 300,
            color: '#FAF8F3',
            margin: 0,
            textShadow: '0 3px 20px rgba(0,0,0,0.75)',
            textAlign: 'center',
            letterSpacing: '0.12em',
          }}
        >
          BAMBARDDARA
        </h1>

        {/* Thin gold divider line */}
        <div
          style={{
            width: 'clamp(56px, 9vw, 96px)',
            height: '1px',
            background: '#C9A86A',
            marginTop: '1.6rem',
            opacity: 0.8,
          }}
        />

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(0.5625rem, 1.3vw, 0.6875rem)',
            fontWeight: 400,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(250,248,243,0.75)',
            marginTop: '1.6rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          Agro Tourism Estate
        </p>

        {/* Pulsing hint that the gate is about to open */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(0.5rem, 1.1vw, 0.625rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(250,248,243,0.55)',
            marginTop: '3rem',
            animation: 'entrancePulse 2.2s ease-in-out infinite',
          }}
        >
          Entering
        </p>
      </div>

      <style>{`
        @keyframes entrancePulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
