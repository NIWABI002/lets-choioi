'use client';

import { useEffect, useState } from 'react';

type Phase = 'in' | 'hold' | 'out';

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 80);
    const t2 = setTimeout(() => setPhase('out'), 2600);
    const t3 = setTimeout(() => onDone(), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const visible = phase !== 'in';

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 100,
      background: '#C0392B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0,
      opacity: phase === 'out' ? 0 : 1,
      transition: phase === 'out' ? 'opacity 0.5s ease' : 'none',
      overflow: 'hidden',
    }}>

      {/* Background star watermark */}
      <div style={{
        position: 'absolute',
        fontSize: 320,
        opacity: 0.06,
        userSelect: 'none',
        pointerEvents: 'none',
        lineHeight: 1,
      }}>★</div>

      {/* Let's */}
      <div style={{
        color: '#FFD700',
        fontSize: 26,
        fontWeight: 700,
        fontFamily: 'var(--font-nunito)',
        letterSpacing: '0.08em',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-16px)',
        transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
        marginBottom: 2,
      }}>
        Let&apos;s
      </div>

      {/* Chời ơi! — spring bounce */}
      <div style={{
        color: '#FFD700',
        fontSize: 56,
        fontWeight: 900,
        fontFamily: 'var(--font-nunito)',
        lineHeight: 1.1,
        letterSpacing: '-0.5px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.4)',
        transition: 'opacity 0.25s ease 0.35s, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s',
      }}>
        Chời ơi！
      </div>

      {/* Star row */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginTop: 18,
        fontSize: 20,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease 0.8s, transform 0.4s ease 0.8s',
      }}>
        ★ ★ ★
      </div>

      {/* Subtitle */}
      <div style={{
        color: 'rgba(255, 215, 0, 0.75)',
        fontSize: 12,
        fontFamily: 'var(--font-noto-sans)',
        letterSpacing: '0.04em',
        marginTop: 14,
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease 1.1s',
      }}>
        ベトナムインターンのための
        <br />
        心を開くフレーズ集
      </div>

    </div>
  );
}
