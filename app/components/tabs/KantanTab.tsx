'use client';

import { useState, useEffect, useRef } from 'react';
import { exclamationPhrases, exclamationCategories } from '@/app/data/phrases';
import { useTTS, useRecorder } from '@/app/hooks/useAudio';
import Badge from '@/app/components/Badge';
import ChipRow from '@/app/components/ChipRow';
import AudioButtons from '@/app/components/AudioButtons';

const C = { red: '#C8102E', yellow: '#FFDA00', offwhite: '#F8F7F4', gray: '#888', cardBg: '#FFFFFF', dark: '#1A1A1A' };

export default function KantanTab() {
  const [selectedCat, setSelectedCat] = useState('すべて');
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isPlaying, speak, stop } = useTTS();
  const { isRecording, recordingUrl, startRecording, stopRecording, playRecording } = useRecorder();

  const filtered = selectedCat === 'すべて'
    ? exclamationPhrases
    : exclamationPhrases.filter((p) => p.category === selectedCat);

  const activePhrase = filtered[activeIndex];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.55) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) { setActiveIndex(idx); stop(); }
          }
        });
      },
      { root: container, threshold: [0.55] }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filtered, stop]);

  const handleCatChange = (c: string) => {
    setSelectedCat(c);
    setActiveIndex(0);
    stop();
    setTimeout(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, 0);
  };

  const handlePlay = () => {
    if (isPlaying) { stop(); return; }
    if (activePhrase) speak(activePhrase.viet, 'vi-VN');
  };

  const handleRecord = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, background: C.offwhite }}>
      {/* Header */}
      <div style={{ padding: '14px 16px 8px', background: C.offwhite, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: C.red, fontFamily: 'Nunito, sans-serif', letterSpacing: 0.5, opacity: 0.7 }}>
            {"Let's Chời ơi"}
          </span>
          <span style={{ fontSize: 12, color: C.gray, fontFamily: 'Nunito, sans-serif' }}>
            {activeIndex + 1} / {filtered.length}
          </span>
        </div>
        <ChipRow chips={exclamationCategories} selected={selectedCat} onSelect={handleCatChange} />
      </div>

      {/* Vertical snap scroll */}
      <div
        ref={scrollRef}
        style={{
          flex: 1, minHeight: 0,
          overflowY: 'scroll', scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
        }}
      >
        {filtered.map((phrase, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={`${phrase.viet}-${i}`}
              ref={(el) => { itemRefs.current[i] = el; }}
              style={{
                height: '100%', flexShrink: 0,
                scrollSnapAlign: 'center',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '10px 20px',
              }}
            >
              <div style={{
                background: C.cardBg,
                borderRadius: 24,
                width: '100%',
                padding: '24px 22px 20px',
                boxShadow: isActive
                  ? '0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)'
                  : '0 2px 10px rgba(0,0,0,0.06)',
                opacity: isActive ? 1 : 0.3,
                transform: isActive ? 'scale(1)' : 'scale(0.93)',
                transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Decoration */}
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: C.yellow, opacity: 0.12 }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <Badge label={phrase.category} />
                  <span style={{ fontSize: 26 }}>{phrase.emoji}</span>
                </div>

                <div style={{ fontSize: 46, fontWeight: 900, color: C.red, fontFamily: 'Nunito, sans-serif', lineHeight: 1.1, marginBottom: 6, letterSpacing: -0.5 }}>
                  {phrase.viet}
                </div>
                <div style={{ fontSize: 12, color: C.gray, fontFamily: '"Noto Sans", sans-serif', marginBottom: 10, letterSpacing: 0.5 }}>
                  {phrase.ruby}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: C.dark, fontFamily: '"Noto Sans", sans-serif', lineHeight: 1.5, marginBottom: isActive ? 20 : 0 }}>
                  {phrase.jp}
                </div>

                {isActive && (
                  <AudioButtons
                    isPlaying={isPlaying}
                    isRecording={isRecording}
                    hasRecording={!!recordingUrl}
                    onPlay={handlePlay}
                    onRecord={handleRecord}
                    onPlayRecording={playRecording}
                  />
                )}
              </div>

              {isActive && (
                <div style={{ marginTop: 10, fontSize: 11, color: C.gray, fontFamily: 'Nunito, sans-serif', opacity: 0.6 }}>
                  ↑↓ スワイプで切り替え
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
