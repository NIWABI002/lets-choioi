'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { ExclamationPhrase } from '@/app/data/phrases';
import { useTTS } from '@/app/hooks/useAudio';
import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';
import ResultScreen from './ResultScreen';

interface QuizItem {
  q: ExclamationPhrase;
  choices: ExclamationPhrase[];
  correctIdx: number;
}
interface HistoryEntry { q: ExclamationPhrase; picked: number | null; correct: boolean; }
interface Result { score: number; total: number; history: HistoryEntry[]; }

interface Props {
  pool: ExclamationPhrase[];
  total?: number;
  onExit: () => void;
  introFromTransition?: boolean;
}

const CHOICE_STATE = {
  idle:    { bg: '#F8F7F4', fg: '#1A1A1A', border: 'transparent' },
  correct: { bg: '#E6F7EC', fg: '#0F7B3A', border: '#28B85A' },
  wrong:   { bg: '#FDEAEC', fg: '#C8102E', border: '#C8102E' },
  dim:     { bg: 'rgba(248,247,244,0.4)', fg: 'rgba(26,26,26,0.45)', border: 'transparent' },
} as const;

const LABELS = ['A', 'B', 'C', 'D'];

function buildQuestions(pool: ExclamationPhrase[], count: number): QuizItem[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picks = shuffled.slice(0, Math.min(count, shuffled.length));
  return picks.map(q => {
    const sameCat = pool.filter(p => p.category === q.category && p.viet !== q.viet);
    const others = pool.filter(p => p.viet !== q.viet);
    const pickFrom = sameCat.length >= 3 ? sameCat : others;
    const distractors = [...pickFrom].sort(() => Math.random() - 0.5).slice(0, 3);
    const choices = [...distractors, q].sort(() => Math.random() - 0.5);
    return { q, choices, correctIdx: choices.findIndex(c => c.viet === q.viet) };
  });
}

export default function QuizScreen({ pool, total = 7, onExit, introFromTransition = false }: Props) {
  const { speak } = useTTS();
  const [questions, setQuestions] = useState<QuizItem[]>(() => buildQuestions(pool, total));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [shake, setShake] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const cur = questions[idx];

  useEffect(() => {
    if (!cur) return;
    const t = setTimeout(() => speak(cur.q.viet, 'vi-VN'), 300);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, cur]);

  const handlePick = useCallback((i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === cur.correctIdx;
    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => speak(cur.q.viet, 'vi-VN'), 600);
    } else {
      setTimeout(() => speak(cur.q.viet, 'vi-VN'), 200);
    }
  }, [picked, cur, speak]);

  const handleNext = useCallback(() => {
    const entry: HistoryEntry = { q: cur.q, picked, correct: picked === cur.correctIdx };
    const newHistory = [...history, entry];
    setHistory(newHistory);
    setPicked(null);
    if (idx + 1 >= questions.length) {
      setResult({ score: newHistory.filter(h => h.correct).length, total: questions.length, history: newHistory });
    } else {
      setIdx(idx + 1);
    }
  }, [cur, picked, history, idx, questions.length]);

  const handleRetry = useCallback(() => {
    setQuestions(buildQuestions(pool, total));
    setIdx(0);
    setPicked(null);
    setHistory([]);
    setResult(null);
  }, [pool, total]);

  if (!cur && !result) return null;

  if (result) {
    return (
      <div className="ck-bg" style={{ position: 'absolute', inset: 0 }}>
        <div className="ck-vignette" />
        <ResultScreen score={result.score} total={result.total} history={result.history} onRetry={handleRetry} onExit={onExit} />
      </div>
    );
  }

  const stateOf = (i: number) => {
    if (picked === null) return 'idle' as const;
    if (i === cur.correctIdx) return 'correct' as const;
    if (i === picked) return 'wrong' as const;
    return 'dim' as const;
  };

  const progress = ((idx + (picked !== null ? 1 : 0)) / questions.length) * 100;

  return (
    <div
      className={`ck-bg quiz-root${shake ? ' quiz-shake' : ''}${introFromTransition && idx === 0 ? ' quiz-intro' : ''}`}
      style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}
    >
      <div className="ck-vignette" />

      {/* トップバー */}
      <div className="quiz-topbar" style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
        <button onClick={onExit} style={{ border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: 14, fontFamily: 'Nunito', flexShrink: 0 }}>×</button>
        <div style={{ flex: 1, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#FFDA00', transition: 'width 300ms ease' }} />
        </div>
        <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: 1, minWidth: 36, textAlign: 'right' as const }}>
          {idx + 1}/{questions.length}
        </div>
      </div>

      {/* 問題カード */}
      <div className="quiz-question-slot" style={{ padding: '14px 24px 0', display: 'flex', justifyContent: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <div
          style={{ width: '100%', maxWidth: 280, aspectRatio: '5/4', perspective: 1200 }}
          onClick={() => speak(cur.q.viet, 'vi-VN')}
        >
          <div className={`qcard-flip${picked !== null ? ' qcard-flipped' : ''}`}>
            <div className="qcard-face qcard-front"><QuestionCard phrase={cur.q} /></div>
            <div className="qcard-face qcard-back">
              {picked !== null && <AnswerCard phrase={cur.q} correct={picked === cur.correctIdx} />}
            </div>
          </div>
        </div>
      </div>

      {/* プロンプト */}
      <div className="quiz-prompt" style={{ textAlign: 'center', padding: '14px 18px 6px', fontFamily: '"Noto Sans JP", sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: 1, position: 'relative', zIndex: 1 }}>
        意味として正しいのは？
      </div>

      {/* 選択肢 */}
      <div className="quiz-choices" style={{ flex: 1, padding: '4px 18px 12px', display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, height: '100%' }}>
          {cur.choices.map((c, i) => {
            const s = CHOICE_STATE[stateOf(i)];
            return (
              <button
                key={i}
                onClick={() => handlePick(i)}
                disabled={picked !== null}
                style={{
                  flex: 1, minHeight: 0, width: '100%', borderRadius: 12,
                  border: `2px solid ${s.border}`, background: s.bg, color: s.fg,
                  fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 600, fontSize: 13,
                  cursor: picked !== null ? 'default' : 'pointer', textAlign: 'left' as const,
                  padding: '0 14px', display: 'flex', alignItems: 'center', gap: 12,
                  transition: 'all 200ms ease',
                }}
              >
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: stateOf(i) === 'idle' ? '#fff' : 'rgba(255,255,255,0.6)', display: 'grid', placeItems: 'center', fontFamily: 'Nunito', fontWeight: 800, fontSize: 10, color: stateOf(i) === 'idle' ? '#888' : s.fg, flexShrink: 0 }}>
                  {LABELS[i]}
                </span>
                <span style={{ flex: 1 }}>{c.jp.replace(/（[^）]*）/g, '').trim()}</span>
                {stateOf(i) === 'correct' && <span style={{ fontSize: 16 }}>✓</span>}
                {stateOf(i) === 'wrong'   && <span style={{ fontSize: 16 }}>✗</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 次へボタン */}
      <div className="quiz-next-slot" style={{ padding: '0 18px 16px', minHeight: 60, position: 'relative', zIndex: 1 }}>
        {picked !== null && (
          <button
            onClick={handleNext}
            style={{ width: '100%', height: 44, borderRadius: 12, border: 'none', background: '#FFDA00', color: '#1A1A1A', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, cursor: 'pointer', letterSpacing: 0.5, animation: 'fadeUp 220ms ease' }}
          >
            {idx + 1 >= questions.length ? '結果を見る →' : '次へ →'}
          </button>
        )}
      </div>
    </div>
  );
}
