'use client';

import React from 'react';

const C = { red: '#C8102E', blue: '#185FA5', gray: '#888' };

type TabId = 'kantan' | 'eigo' | 'mix';

interface BottomNavProps {
  tab: TabId;
  setTab: (t: TabId) => void;
}

export default function BottomNav({ tab, setTab }: BottomNavProps) {
  const tabs: { id: TabId; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    {
      id: 'kantan',
      label: 'ベトナム',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2C8 2 5 5 5 8c0 4 6 12 6 12s6-8 6-12c0-3-2.5-6-6-6z" fill={active ? C.red : 'none'} stroke={active ? C.red : C.gray} strokeWidth="1.8" />
          <circle cx="11" cy="8" r="2" fill={active ? '#fff' : C.gray} />
        </svg>
      ),
    },
    {
      id: 'eigo',
      label: '英語',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="4" width="18" height="12" rx="3" fill={active ? C.blue : 'none'} stroke={active ? C.blue : C.gray} strokeWidth="1.8" />
          <path d="M7 10h8M7 13h5" stroke={active ? '#fff' : C.gray} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 16l-2 3" stroke={active ? C.blue : C.gray} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'mix',
      label: 'ミックス',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <polygon points="11,2 13.5,8.5 20,9 15,14 17,20.5 11,17 5,20.5 7,14 2,9 8.5,8.5" fill={active ? C.red : 'none'} stroke={active ? C.red : C.gray} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      height: 80,
      flexShrink: 0,
      background: 'rgba(248,247,244,0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
      paddingTop: 10,
      zIndex: 100,
    }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px 16px', borderRadius: 12,
            transition: 'all 0.15s ease',
          }}
        >
          {t.icon(tab === t.id)}
          <span style={{
            fontSize: 10,
            fontWeight: tab === t.id ? 800 : 500,
            color: tab === t.id ? (t.id === 'eigo' ? C.blue : C.red) : C.gray,
            fontFamily: 'Nunito, sans-serif',
            transition: 'all 0.15s ease',
          }}>{t.label}</span>
          {tab === t.id && (
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: t.id === 'eigo' ? C.blue : C.red }} />
          )}
        </button>
      ))}
    </div>
  );
}
