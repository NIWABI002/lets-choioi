'use client';

import { useState, useEffect, useMemo, CSSProperties } from 'react';
import { ExclamationPhrase } from '@/app/data/phrases';
import QuizCardFront from './QuizCardFront';
import LotusBack from './LotusBack';
import IntroCard from './IntroCard';

interface Props {
  cards: ExclamationPhrase[];
  picked: ExclamationPhrase;
  onComplete: () => void;
  speed?: number;
  gridCols?: number;
  gridRows?: number;
}

type Phase = 'expanding' | 'flipping' | 'converging' | 'exploding' | 'reveal' | 'morphing';

export default function PinchTransition({ cards, picked, onComplete, speed = 1, gridCols = 4, gridRows = 5 }: Props) {
  const [phase, setPhase] = useState<Phase>('expanding');
  const total = gridCols * gridRows;
  const cells = useMemo(() => cards.slice(0, total), [cards, total]);
  const pickedIdx = useMemo(
    () => Math.max(0, cells.findIndex(c => c.viet === picked.viet)),
    [cells, picked]
  );
  const T = (ms: number) => ms / speed;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('flipping'),   T(900)));
    timers.push(setTimeout(() => setPhase('converging'), T(900 + 500)));
    timers.push(setTimeout(() => setPhase('exploding'),  T(900 + 500 + 280)));
    timers.push(setTimeout(() => setPhase('reveal'),     T(900 + 500 + 280 + 380)));
    timers.push(setTimeout(() => setPhase('morphing'),   T(900 + 500 + 280 + 380 + 250)));
    timers.push(setTimeout(() => onComplete(),           T(900 + 500 + 280 + 380 + 250 + 550)));
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', perspective: 1200 }}>
      <div
        className={`pt-stage pt-${phase}`}
        style={{
          '--cols': gridCols,
          '--rows': gridRows,
          '--picked-col': pickedIdx % gridCols,
          '--picked-row': Math.floor(pickedIdx / gridCols),
          '--speed': speed,
        } as CSSProperties}
      >
        <div className="pt-grid">
          {cells.map((c, i) => {
            const col = i % gridCols;
            const row = Math.floor(i / gridCols);
            const isPicked = i === pickedIdx;
            const dx = col - (pickedIdx % gridCols);
            const dy = row - Math.floor(pickedIdx / gridCols);
            const dist = Math.sqrt(dx * dx + dy * dy);
            const showIntro = isPicked && (phase === 'converging' || phase === 'exploding' || phase === 'reveal' || phase === 'morphing');
            return (
              <div
                key={i}
                className={`pt-cell${isPicked ? ' pt-picked' : ''}`}
                style={{
                  '--col': col,
                  '--row': row,
                  '--dx': dx,
                  '--dy': dy,
                  '--flip-delay': `${(dist * 35) / speed}ms`,
                  '--converge-delay': `${Math.max(0, 3 - dist) * 18 / speed}ms`,
                } as CSSProperties}
              >
                <div className="pt-flip">
                  <div className="pt-face pt-front">
                    {showIntro
                      ? <div className="pt-front-intro"><IntroCard /></div>
                      : <QuizCardFront phrase={c} />
                    }
                  </div>
                  <div className="pt-face pt-back"><LotusBack /></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-caption">
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 12, letterSpacing: 4, color: '#FFDA00' }}>◆ QUIZ ◆</div>
          <div style={{ fontFamily: '"Noto Sans JP", sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 6, letterSpacing: 2 }}>シャッフル中…</div>
        </div>
      </div>
    </div>
  );
}
