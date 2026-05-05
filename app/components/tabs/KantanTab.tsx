'use client';

import { useState, useEffect, useRef } from 'react';
import { exclamationPhrases, exclamationCategories, ExclamationPhrase } from '@/app/data/phrases';
import { useTTS, useRecorder } from '@/app/hooks/useAudio';
import Badge from '@/app/components/Badge';
import AudioButtons from '@/app/components/AudioButtons';

const C = {
  red: '#C8102E', yellow: '#FFDA00', offwhite: '#F8F7F4',
  gray: '#888', cardBg: '#FFFFFF', dark: '#1A1A1A',
};

const CAT_EMOJI: Record<string, string> = {
  'すべて': '🗂', '驚き': '😲', '喜び': '🎉',
  '感謝': '🙏', '苦笑': '😮‍💨', '拒否': '🙅', 'スラング': '🔥',
};

// ── 縦スクロールカードページ ──────────────────────
interface PageProps {
  phrases: ExclamationPhrase[];
  isActivePage: boolean;
  activeCard: number;
  onCardChange: (i: number) => void;
  isPlaying: boolean;
  isRecording: boolean;
  hasRecording: boolean;
  onPlay: () => void;
  onRecord: () => void;
  onPlayRecording: () => void;
  stop: () => void;
}

function CategoryPage({
  phrases, isActivePage, activeCard, onCardChange,
  isPlaying, isRecording, hasRecording,
  onPlay, onRecord, onPlayRecording, stop,
}: PageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ページが非アクティブになったらスクロールをリセット
  useEffect(() => {
    if (!isActivePage && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isActivePage]);

  // 縦スナップ: アクティブカード検出
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    itemRefs.current = itemRefs.current.slice(0, phrases.length);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isActivePage) return;
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.55) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) { onCardChange(idx); stop(); }
          }
        });
      },
      { root: container, threshold: [0.55] }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [phrases, isActivePage, onCardChange, stop]);

  return (
    <div
      ref={scrollRef}
      style={{
        flex: '0 0 100%',
        height: '100%',
        scrollSnapAlign: 'start',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollbarWidth: 'none',
        touchAction: 'auto',
      }}
    >
      {phrases.map((phrase, i) => {
        const isActive = i === activeCard && isActivePage;
        return (
          <div
            key={`${phrase.viet}-${i}`}
            ref={(el) => { itemRefs.current[i] = el; }}
            style={{
              height: '100%',
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
                  hasRecording={hasRecording}
                  onPlay={onPlay}
                  onRecord={onRecord}
                  onPlayRecording={onPlayRecording}
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
  );
}

// ── メインタブ ────────────────────────────────────
export default function KantanTab() {
  const [activePage, setActivePage] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const hScrollRef = useRef<HTMLDivElement>(null);
  const activePageRef = useRef(0);

  const { isPlaying, speak, stop } = useTTS();
  const { isRecording, recordingUrl, startRecording, stopRecording, playRecording } = useRecorder();

  const currentCat = exclamationCategories[activePage];
  const filtered = currentCat === 'すべて'
    ? exclamationPhrases
    : exclamationPhrases.filter((p) => p.category === currentCat);
  const activePhrase = filtered[activeCard];

  // 横スクロール位置からアクティブページを検出
  useEffect(() => {
    const el = hScrollRef.current;
    if (!el) return;
    let timeout: ReturnType<typeof setTimeout>;
    const detect = () => {
      const page = Math.round(el.scrollLeft / el.clientWidth);
      if (page !== activePageRef.current) {
        activePageRef.current = page;
        setActivePage(page);
        setActiveCard(0);
        stop();
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
  }, [stop]);

  const handlePlay = () => {
    if (isPlaying) { stop(); return; }
    if (activePhrase) speak(activePhrase.viet, 'vi-VN');
  };
  const handleRecord = () => { isRecording ? stopRecording() : startRecording(); };

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
            {activeCard + 1} / {filtered.length}
          </span>
        </div>

        {/* カテゴリーピルバー */}
        <div style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingBottom: 2,
        }}>
          {exclamationCategories.map((cat, i) => {
            const active = i === activePage;
            return (
              <button
                key={cat}
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
                {CAT_EMOJI[cat]} {cat}
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
        {exclamationCategories.map((cat, pageIdx) => {
          const phrases = cat === 'すべて'
            ? exclamationPhrases
            : exclamationPhrases.filter((p) => p.category === cat);
          return (
            <CategoryPage
              key={cat}
              phrases={phrases}
              isActivePage={pageIdx === activePage}
              activeCard={pageIdx === activePage ? activeCard : 0}
              onCardChange={setActiveCard}
              isPlaying={isPlaying}
              isRecording={isRecording}
              hasRecording={!!recordingUrl}
              onPlay={handlePlay}
              onRecord={handleRecord}
              onPlayRecording={playRecording}
              stop={stop}
            />
          );
        })}
      </div>
    </div>
  );
}
