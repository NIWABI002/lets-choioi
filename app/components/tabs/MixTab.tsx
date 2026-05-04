'use client';

import { useState } from 'react';
import { mixConversations } from '@/app/data/phrases';
import ChipRow from '@/app/components/ChipRow';

const C = { red: '#C8102E', blue: '#185FA5', offwhite: '#F8F7F4', gray: '#888', lightGray: '#E8E6E2', cardBg: '#FFFFFF', dark: '#1A1A1A', yellow: '#FFDA00' };

const mixCats = mixConversations.map((c) => c.category);

function StepBubble({ text, lang }: { text: string; lang: string }) {
  if (lang === 'note') {
    return (
      <div style={{ textAlign: 'center', fontSize: 11, color: C.gray, fontFamily: '"Noto Sans", sans-serif', padding: '4px 0', fontStyle: 'italic' }}>
        {text}
      </div>
    );
  }
  if (lang === 'viet') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{ background: C.red, color: '#fff', borderRadius: '18px 18px 18px 4px', padding: '10px 14px', maxWidth: '80%', fontSize: 18, fontWeight: 800, fontFamily: 'Nunito, sans-serif' }}>
          {text}
        </div>
      </div>
    );
  }
  if (lang === 'en') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ background: C.blue, color: '#fff', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', maxWidth: '80%', fontSize: 15, fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>
          {text}
        </div>
      </div>
    );
  }
  if (lang === 'mixed') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ background: 'linear-gradient(135deg, #C8102E, #185FA5)', color: '#fff', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', maxWidth: '80%', fontSize: 15, fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>
          {text}
        </div>
      </div>
    );
  }
  return null;
}

export default function MixTab() {
  const [selectedCat, setSelectedCat] = useState(mixCats[0]);
  const [expanded, setExpanded] = useState(0);

  const filtered = mixConversations.filter((c) => c.category === selectedCat);

  const handleCatChange = (c: string) => {
    setSelectedCat(c);
    setExpanded(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, background: C.offwhite }}>
      {/* Header */}
      <div style={{ padding: '14px 16px 8px', background: C.offwhite, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: C.red, fontFamily: 'Nunito, sans-serif', letterSpacing: 0.5, opacity: 0.7 }}>
            {"Let's Chời ơi"}
          </span>
        </div>
        <ChipRow chips={mixCats} selected={selectedCat} onSelect={handleCatChange} />
      </div>

      {/* Scroll list */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '8px 16px 20px' }}>
        {filtered.map((conv, ci) => (
          <div key={ci} style={{ marginBottom: 12 }}>
            {/* Scenario card */}
            <button
              onClick={() => setExpanded(expanded === ci ? -1 : ci)}
              style={{
                width: '100%', textAlign: 'left',
                background: C.cardBg, borderRadius: 16, border: 'none',
                padding: '14px 16px', cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, fontFamily: 'Nunito, sans-serif' }}>
                  {conv.category}
                </div>
                <div style={{ fontSize: 11, color: C.gray, fontFamily: '"Noto Sans", sans-serif', marginTop: 2 }}>
                  {conv.steps.filter((s) => s.lang !== 'note').length}フレーズ
                </div>
              </div>
              <span style={{ fontSize: 16, color: C.gray, transform: expanded === ci ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </button>

            {/* Expanded conversation */}
            {expanded === ci && (
              <div style={{ background: C.cardBg, borderRadius: '0 0 16px 16px', padding: '12px 16px 16px', marginTop: -4, boxShadow: '0 4px 16px rgba(0,0,0,0.09)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* Legend */}
                <div style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${C.lightGray}`, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: C.red, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>🇻🇳 感嘆</span>
                  <span style={{ fontSize: 10, color: C.blue, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>🇬🇧 英語</span>
                  <span style={{ fontSize: 10, background: 'linear-gradient(135deg,#C8102E,#185FA5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>✨ ミックス</span>
                </div>
                {conv.steps.map((step, si) => (
                  <StepBubble key={si} text={step.text} lang={step.lang} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
