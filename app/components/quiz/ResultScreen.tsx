'use client';

import { useState, useEffect } from 'react';
import { ExclamationPhrase } from '@/app/data/phrases';

interface HistoryEntry { q: ExclamationPhrase; picked: number | null; correct: boolean; }

interface Props {
  score: number;
  total: number;
  history: HistoryEntry[];
  onRetry: () => void;
  onExit: () => void;
}

export default function ResultScreen({ score, total, history, onRetry, onExit }: Props) {
  const pct = Math.round((score / total) * 100);
  const verdict =
    pct >= 80 ? { label: 'Tuyệt vời!', sub: '最高！', color: '#FFDA00' }
    : pct >= 50 ? { label: 'Hay quá!', sub: 'いい感じ！', color: '#FFDA00' }
    : { label: 'Cố lên!', sub: 'もう一回！', color: '#fff' };

  const [shown, setShown] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 800);
      setShown(Math.round((1 - Math.pow(1 - p, 3)) * pct));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pct]);

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', animation: 'fadeUp 400ms ease' }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onExit} style={{ border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: 14, fontFamily: 'Nunito' }}>×</button>
        <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>KẾT QUẢ</div>
        <div style={{ width: 30 }} />
      </div>

      <div style={{ flex: 1, padding: '20px 24px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Nunito', fontWeight: 900, color: verdict.color, fontSize: 28, letterSpacing: -0.5 }}>{verdict.label}</div>
        <div style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 }}>{verdict.sub}</div>

        <div style={{ marginTop: 26, position: 'relative' }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="78" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <circle
              cx="90" cy="90" r="78" fill="none" stroke="#FFDA00" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${(shown / 100) * 490} 490`}
              transform="rotate(-90 90 90)"
              style={{ transition: 'stroke-dasharray 80ms linear' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 52, color: '#fff', lineHeight: 1 }}>
              {shown}<span style={{ fontSize: 20 }}>%</span>
            </div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, marginTop: 4 }}>
              {score} / {total}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 240 }}>
          {history.map((h, i) => (
            <div key={i} style={{
              width: 14, height: 14, borderRadius: 4,
              background: h.correct ? '#FFDA00' : 'rgba(255,255,255,0.18)',
              border: h.correct ? 'none' : '1px solid rgba(255,255,255,0.25)',
            }} />
          ))}
        </div>
      </div>

      <div style={{ padding: '0 18px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={onRetry} style={{ width: '100%', height: 44, borderRadius: 12, border: 'none', background: '#FFDA00', color: '#1A1A1A', fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, cursor: 'pointer', letterSpacing: 0.5 }}>
          もう一度 →
        </button>
        <button onClick={onExit} style={{ width: '100%', height: 40, borderRadius: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', fontFamily: 'Nunito', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          学習に戻る
        </button>
      </div>
    </div>
  );
}
