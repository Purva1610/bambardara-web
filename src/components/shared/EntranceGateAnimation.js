import React, { useEffect, useRef, useState } from 'react';

export default function EntranceGateAnimation({ onComplete }) {
  // Timeline:
  // 1. 'show'      (0.0s - 1.2s) : Closed grand entrance
  // 2. 'opening'   (1.2s - 2.6s) : Gates swing open, revealing palm-lined driveway
  // 3. 'entering'  (2.6s - 3.6s) : Camera glides forward through the open gates
  // 4. 'smoky'     (3.6s - 4.6s) : Ivory-white smoke completely covers the screen (gate image disappears!)
  // 5. 'revealing' (4.6s - 5.8s) : Smoke dissolves away to directly reveal the live website
  // 6. 'done'      (5.8s)        : Unmount entrance overlay
  const [phase, setPhase] = useState('initial');
  const completedRef = useRef(false);

  const closedImgUrl = `${process.env.PUBLIC_URL}/images/entrance.png`;
  const openImgUrl = `${process.env.PUBLIC_URL}/images/entrance-open.jpg`;

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('show'), 100);
    const t2 = window.setTimeout(() => setPhase('opening'), 1200);
    const t3 = window.setTimeout(() => setPhase('entering'), 2600);
    const t4 = window.setTimeout(() => setPhase('smoky'), 3600);
    const t5 = window.setTimeout(() => setPhase('revealing'), 4600);
    const t6 = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete?.();
    }, 5800);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
      window.clearTimeout(t6);
    };
  }, [onComplete]);

  const isOpening = phase === 'opening' || phase === 'entering' || phase === 'smoky' || phase === 'revealing';
  const isEntering = phase === 'entering' || phase === 'smoky' || phase === 'revealing';
  const isSmoky = phase === 'smoky' || phase === 'revealing';
  const isRevealing = phase === 'revealing';

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center pointer-events-none"
      style={{
        opacity: phase === 'initial' ? 0 : 1,
        transition: 'opacity 0.4s ease',
        backgroundColor: isSmoky ? 'transparent' : '#071811',
      }}
      aria-hidden="true"
    >
      {/* 
        ========================================================================
        1536x1024 CINEMATIC SCALING STAGE (Entrance Images)
        Fades out completely once smoke is opaque, so it NEVER shows again!
        ========================================================================
      */}
      <div
        className="relative shrink-0 flex items-center justify-center will-change-transform"
        style={{
          width: 'max(100vw, calc(100vh * (1536 / 1024)))',
          height: 'max(100vh, calc(100vw * (1024 / 1536)))',
          transformOrigin: '50% 65%',
          transform: isEntering ? 'scale(1.45)' : 'scale(1)',
          transition: isEntering ? 'transform 1.8s cubic-bezier(0.35, 0, 0.25, 1)' : 'none',
          // As soon as smoke covers the screen, hide the entrance images completely
          opacity: isSmoky ? 0 : 1,
          transitionProperty: 'transform, opacity',
          transitionDuration: isSmoky ? '1.8s, 0.5s' : '1.8s, 0s',
        }}
      >
        {/* Base Layer: Closed Gate */}
        <img
          src={closedImgUrl}
          alt="Bambardara Grand Entrance"
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
        />

        {/* Top Layer: Open Gate with Driveway */}
        <img
          src={openImgUrl}
          alt="Bambardara Grand Entrance Open"
          className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
          style={{
            opacity: isOpening ? 1 : 0,
            transition: 'opacity 1400ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Status Pill */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-500 ${
            isEntering ? 'opacity-0' : 'opacity-85'
          }`}
        >
          <div className="px-5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-luxury-gold/40 shadow-lg">
            <span className="font-body text-[0.65rem] tracking-[0.28em] uppercase text-ivory-white font-light">
              Entering Estate...
            </span>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        IVORY WHITE SMOKY MIST EFFECT
        Envelops the screen, and when it clears, reveals ONLY the live website!
        ========================================================================
      */}
      <div
        className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden"
        style={{
          opacity: isSmoky ? (isRevealing ? 0 : 1) : 0,
          transition: isRevealing ? 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'opacity 0.7s ease-in',
        }}
      >
        {/* Solid Luminous Ivory Base Cloud */}
        <div className="absolute inset-0 bg-[#FFFBF5]" />

        {/* Center Plume */}
        <div
          className="absolute inset-0 filter blur-[40px]"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, #FFFBF5 0%, #FAF5EC 50%, #F5EFE4 80%, #EDE4D4 100%)',
            animation: 'smokePulse 3.5s ease-in-out infinite alternate',
          }}
        />

        {/* Left Smoke Plume */}
        <div
          className="absolute -top-[20%] -left-[20%] w-[140vw] h-[140vh] filter blur-[55px]"
          style={{
            background: 'radial-gradient(circle at 40% 50%, rgba(255,251,245,1) 0%, rgba(248,242,232,0.95) 55%, transparent 80%)',
            animation: 'smokeDriftLeft 5s ease-in-out infinite alternate',
          }}
        />

        {/* Right Smoke Plume */}
        <div
          className="absolute -bottom-[20%] -right-[20%] w-[140vw] h-[140vh] filter blur-[60px]"
          style={{
            background: 'radial-gradient(circle at 60% 50%, rgba(255,249,240,1) 0%, rgba(245,238,226,0.95) 55%, transparent 80%)',
            animation: 'smokeDriftRight 6s ease-in-out infinite alternate',
          }}
        />

        {/* Gold Glow */}
        <div
          className="absolute inset-0 filter blur-[35px]"
          style={{
            background: 'radial-gradient(circle at 50% 45%, rgba(201,169,97,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <style>{`
        @keyframes smokePulse {
          0% { transform: scale(0.95); }
          100% { transform: scale(1.05); }
        }
        @keyframes smokeDriftLeft {
          0% { transform: translate(-2%, -2%) rotate(0deg); }
          100% { transform: translate(3%, 3%) rotate(3deg); }
        }
        @keyframes smokeDriftRight {
          0% { transform: translate(2%, 2%) rotate(0deg); }
          100% { transform: translate(-3%, -2%) rotate(-3deg); }
        }
      `}</style>
    </div>
  );
}
