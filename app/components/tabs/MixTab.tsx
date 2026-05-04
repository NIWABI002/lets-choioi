'use client';

import { useEffect, useRef, useState } from 'react';
import { mixConversations, ConversationStep } from '@/app/data/phrases';

const C = {
  red: '#C8102E', blue: '#185FA5', offwhite: '#F8F7F4',
  gray: '#888', lightGray: '#E8E6E2', cardBg: '#FFFFFF', dark: '#1A1A1A',
};

// ── 台本1行 ──────────────────────────────────────
function ScriptLine({ step }: { step: ConversationStep }) {
  if (step.lang === 'note') {
    return (
      <div style={{
        textAlign: 'center',
        fontSize: 11,
        color: C.gray,
        fontStyle: 'italic',
        fontFamily: '"Noto Sans", sans-serif',
        padding: '10px 0 6px',
        letterSpacing: 0.3,
      }}>
        （{step.text.replace(/^→\s*/, '')}）
      </div>
    );
  }
  if (step.lang === 'viet') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
        <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 2, background: C.red, flexShrink: 0 }} />
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.red, opacity: 0.7, marginRight: 6 }}>🇻🇳</span>
          <span style={{ fontSize: 20, fontWeight: 900, color: C.red, fontFamily: 'Nunito, sans-serif', letterSpacing: -0.3 }}>
            {step.text}
          </span>
        </div>
      </div>
    );
  }
  if (step.lang === 'en') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
        <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 2, background: C.blue, flexShrink: 0 }} />
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, opacity: 0.7, marginRight: 6 }}>🇬🇧</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.dark, fontFamily: 'Nunito, sans-serif' }}>
            {step.text}
          </span>
        </div>
      </div>
    );
  }
  if (step.lang === 'mixed') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
        <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 2, flexShrink: 0, background: 'linear-gradient(to bottom, #C8102E, #185FA5)' }} />
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.gray, marginRight: 6 }}>✨</span>
          {step.viet && <span style={{ fontSize: 16, fontWeight: 900, color: C.red, fontFamily: 'Nunito, sans-serif' }}>{step.viet}</span>}
          {step.en && <span style={{ fontSize: 15, fontWeight: 600, color: C.dark, fontFamily: 'Nunito, sans-serif' }}>{step.en}</span>}
          {!step.viet && !step.en && <span style={{ fontSize: 15, fontWeight: 600, color: C.dark, fontFamily: 'Nunito, sans-serif' }}>{step.text}</span>}
        </div>
      </div>
    );
  }
  return null;
}

// ── シナリオページ（縦スクロール） ────────────────
function ScenarioPage({ conv, isActivePage }: { conv: typeof mixConversations[number]; isActivePage: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActivePage && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [isActivePage]);

  return (
    <div
      ref={scrollRef}
      style={{
        flex: '0 0 100%',
        height: '100%',
        scrollSnapAlign: 'start',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        touchAction: 'pan-y',
        padding: '8px 20px 24px',
      }}
    >
      {/* 凡例 */}
      <div style={{ display: 'flex', gap: 12, padding: '8px 0 12px', borderBottom: `1px solid ${C.lightGray}`, marginBottom: 4 }}>
        <span style={{ fontSize: 10, color: C.red, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>🇻🇳 感嘆</span>
        <span style={{ fontSize: 10, color: C.blue, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>🇬🇧 英語</span>
        <span style={{ fontSize: 10, color: C.gray, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>✨ MIX</span>
      </div>

      {conv.steps.map((step, i) => (
        <ScriptLine key={i} step={step} />
      ))}
    </div>
  );
}

// ── メインタブ ────────────────────────────────────
export default function MixTab() {
  const [activePage, setActivePage] = useState(0);
  const hScrollRef = useRef<HTMLDivElement>(null);
  const activePageRef = useRef(0);

  useEffect(() => {
    const el = hScrollRef.current;
    if (!el) return;
    let timeout: ReturnType<typeof setTimeout>;
    const detect = () => {
      const page = Math.round(el.scrollLeft / el.clientWidth);
      if (page !== activePageRef.current) {
        activePageRef.current = page;
        setActivePage(page);
      }
    };
    const onScroll = () => { clearTimeout(timeout); timeout = setTimeout(detect, 100); };
    el.addEventListener('scrollend', detect, { passive: true });
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scrollend', detect);
      el.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
    };
  }, []);

  const goToPage = (i: number) => {
    hScrollRef.current?.scrollTo({ left: i * (hScrollRef.current.clientWidth), behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, background: C.offwhite }}>

      {/* ヘッダー */}
      <div style={{ padding: '12px 16px 10px', flexShrink: 0, background: C.offwhite }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: C.red, fontFamily: 'Nunito, sans-serif', letterSpacing: 0.5, opacity: 0.7 }}>
            {"Let's Chời ơi"}
          </span>
          <span style={{ fontSize: 12, color: C.gray, fontFamily: 'Nunito, sans-serif' }}>
            {activePage + 1} / {mixConversations.length}
          </span>
        </div>

        {/* シナリオピルバー */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
          {mixConversations.map((conv, i) => {
            const active = i === activePage;
            return (
              <button
                key={i}
                onClick={() => goToPage(i)}
                style={{
                  flexShrink: 0,
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: active ? 'none' : `1.5px solid ${C.gray}`,
                  background: active ? C.red : 'transparent',
                  color: active ? '#fff' : C.gray,
                  fontSize: 12,
                  fontWeight: active ? 800 : 500,
                  fontFamily: 'Nunito, sans-serif',
                  cursor: 'pointer',
                  opacity: active ? 1 : 0.5,
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                🎭 {conv.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* 横スクロールページャー */}
      <div
        ref={hScrollRef}
        style={{
          flex: 1, minHeight: 0,
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
        }}
      >
        {mixConversations.map((conv, i) => (
          <ScenarioPage key={i} conv={conv} isActivePage={i === activePage} />
        ))}
      </div>
    </div>
  );
}
