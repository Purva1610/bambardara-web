import React, { useEffect, useRef, useState } from 'react';

export default function EntranceGateAnimation({ onComplete }) {
  const [phase, setPhase] = useState('closed'); // closed -> opening -> fading
  const completedRef = useRef(false);

  useEffect(() => {
    // Opening overlay start hone ke turant baad rahe, aur approx 2s me gates open ho jaye.
    const tOpen = window.setTimeout(() => setPhase('opening'), 0);
    const tFade = window.setTimeout(() => setPhase('fading'), 2000);
    const tDone = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete?.();
    }, 2400);

    return () => {
      window.clearTimeout(tOpen);
      window.clearTimeout(tFade);
      window.clearTimeout(tDone);
    };
  }, [onComplete]);

  return (
    <div
      className={[
        'entrance-overlay',
        phase === 'opening' ? 'opening' : '',
        phase === 'fading' ? 'fading' : '',
      ].join(' ')}
      aria-hidden="true"
    >
      <div className="entrance-split">
        <div className="entrance-half left" />
        <div className="entrance-half right" />
      </div>
    </div>
  );
}

