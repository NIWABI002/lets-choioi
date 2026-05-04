'use client';

import { useState } from 'react';
import { mixConversations, ConversationStep } from '@/app/data/phrases';
import ChipRow from '@/app/components/ChipRow';

const C = {
  red: '#C8102E', blue: '#185FA5', offwhite: '#F8F7F4',
  gray: '#888', lightGray: '#E8E6E2', cardBg: '#FFFFFF', dark: '#1A1A1A',
};

const mixCats = mixConversations.map((c) => c.category);

// ── 台本1行 ──────────────────────────────────────
function ScriptLine({ step }: { step: ConversationStep }) {
  // ト書き（状況説明）
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

  // ベトナム語感嘆詞
  if (step.lang === 'viet') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '5px 0',
      }}>
        <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 2, background: C.red, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.red, fontFamily: 'Nunito, sans-serif', marginRight: 6, opacity: 0.7 }}>🇻🇳</span>
          <span style={{ fontSize: 20, fontWeight: 900, color: C.red, fontFamily: 'Nunito, sans-serif', letterSpacing: -0.3 }}>
            {step.text}
          </span>
        </div>
      </div>
    );
  }

  // 英語
  if (step.lang === 'en') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '5px 0',
      }}>
        <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 2, background: C.blue, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, fontFamily: 'Nunito, sans-serif', marginRight: 6, opacity: 0.7 }}>🇬🇧</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.dark, fontFamily: 'Nunito, sans-serif' }}>
            {step.text}
          </span>
        </div>
      </div>
    );
  }

  // ミックス（ベトナム語＋英語混合）
  if (step.lang === 'mixed') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '5px 0',
      }}>
        <div style={{
          width: 3, alignSelf: 'stretch', borderRadius: 2, flexShrink: 0,
          background: 'linear-gradient(to bottom, #C8102E, #185FA5)',
        }} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'Nunito, sans-serif', marginRight: 6, opacity: 0.7 }}>✨</span>
          {step.viet && (
            <span style={{ fontSize: 16, fontWeight: 900, color: C.red, fontFamily: 'Nunito, sans-serif' }}>
              {step.viet}
            </span>
          )}
          {step.en && (
            <span style={{ fontSize: 15, fontWeight: 600, color: C.dark, fontFamily: 'Nunito, sans-serif' }}>
              {step.en}
            </span>
          )}
          {!step.viet && !step.en && (
            <span style={{ fontSize: 15, fontWeight: 600, color: C.dark, fontFamily: 'Nunito, sans-serif' }}>
              {step.text}
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// ── メインタブ ────────────────────────────────────
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

      {/* ヘッダー */}
      <div style={{ padding: '14px 16px 8px', background: C.offwhite, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: C.red, fontFamily: 'Nunito, sans-serif', letterSpacing: 0.5, opacity: 0.7 }}>
            {"Let's Chời ơi"}
          </span>
          {/* 凡例 */}
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 10, color: C.red, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>🇻🇳 感嘆</span>
            <span style={{ fontSize: 10, color: C.blue, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>🇬🇧 英語</span>
            <span style={{ fontSize: 10, color: C.gray, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>✨ MIX</span>
          </div>
        </div>
        <ChipRow chips={mixCats} selected={selectedCat} onSelect={handleCatChange} />
      </div>

      {/* シナリオ一覧 */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '8px 16px 20px' }}>
        {filtered.map((conv, ci) => (
          <div key={ci} style={{ marginBottom: 12 }}>

            {/* シナリオタイトル */}
            <button
              onClick={() => setExpanded(expanded === ci ? -1 : ci)}
              style={{
                width: '100%', textAlign: 'left',
                background: C.cardBg, borderRadius: expanded === ci ? '16px 16px 0 0' : 16,
                border: 'none', padding: '14px 16px', cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, fontFamily: 'Nunito, sans-serif' }}>
                  🎭 {conv.category}
                </div>
                <div style={{ fontSize: 11, color: C.gray, fontFamily: '"Noto Sans", sans-serif', marginTop: 2 }}>
                  {conv.steps.filter((s) => s.lang !== 'note').length} フレーズ
                </div>
              </div>
              <span style={{
                fontSize: 14, color: C.gray,
                transform: expanded === ci ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}>▾</span>
            </button>

            {/* 台本展開 */}
            {expanded === ci && (
              <div style={{
                background: C.cardBg,
                borderRadius: '0 0 16px 16px',
                padding: '4px 18px 20px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.09)',
              }}>
                {conv.steps.map((step, si) => (
                  <ScriptLine key={si} step={step} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
