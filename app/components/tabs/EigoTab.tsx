'use client';

import { useState, useEffect, useRef } from 'react';
import { englishPhrases, englishCategories } from '@/app/data/phrases';
import { useTTS, useRecorder } from '@/app/hooks/useAudio';
import Badge from '@/app/components/Badge';
import ChipRow from '@/app/components/ChipRow';
import AudioButtons from '@/app/components/AudioButtons';

const C = { red: '#C8102E', blue: '#185FA5', offwhite: '#F8F7F4', gray: '#888', lightGray: '#E8E6E2', cardBg: '#FFFFFF', dark: '#1A1A1A' };

const situationHints: Record<string, string> = {
  '値切り': '市場や屋台での交渉に使えます',
  '屋台・注文': '料理を指差しながら使うと便利',
  '移動': 'タクシーアプリと一緒に使うと効果的',
  '緊急': '大声ではっきりと言いましょう',
  '自己紹介': '笑顔で話しかけると好印象に',
  'ベトナムについて': '地元の人との会話のきっかけに',
};

export default function EigoTab() {
  const [selectedCat, setSelectedCat] = useState<string>(englishCategories[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isPlaying, speak, stop } = useTTS();
  const { isRecording, recordingUrl, startRecording, stopRecording, playRecording } = useRecorder();

  const filtered = englishPhrases.filter((p) => p.category === selectedCat);
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
    if (activePhrase) speak(activePhrase.en, 'en-US');
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
        <ChipRow chips={englishCategories} selected={selectedCat} onSelect={handleCatChange} />
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
              key={`${phrase.en}-${i}`}
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
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: C.blue, opacity: 0.07 }} />

                <div style={{ marginBottom: 14 }}>
                  <Badge label={phrase.category} />
                </div>

                <div style={{ fontSize: 30, fontWeight: 800, color: C.blue, fontFamily: 'Nunito, sans-serif', lineHeight: 1.2, marginBottom: 12, letterSpacing: -0.3 }}>
                  &ldquo;{phrase.en}&rdquo;
                </div>

                <div style={{ fontSize: 17, fontWeight: 500, color: C.dark, fontFamily: '"Noto Sans", sans-serif', borderTop: `1.5px solid ${C.lightGray}`, paddingTop: 14, lineHeight: 1.5, marginBottom: isActive ? 14 : 0 }}>
                  {phrase.jp}
                </div>

                {isActive && (
                  <>
                    <div style={{ marginBottom: 16, padding: '10px 14px', background: '#EEF4FB', borderRadius: 12, fontSize: 12, color: C.blue, fontFamily: '"Noto Sans", sans-serif', fontWeight: 500 }}>
                      💡 {situationHints[phrase.category] ?? '旅先で使えるフレーズです'}
                    </div>
                    <AudioButtons
                      isPlaying={isPlaying}
                      isRecording={isRecording}
                      hasRecording={!!recordingUrl}
                      onPlay={handlePlay}
                      onRecord={handleRecord}
                      onPlayRecording={playRecording}
                    />
                  </>
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
