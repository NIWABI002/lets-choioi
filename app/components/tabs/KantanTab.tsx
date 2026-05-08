'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { exclamationPhrases, exclamationCategories, ExclamationPhrase } from '@/app/data/phrases';
import { useTTS, useRecorder, Lang } from '@/app/hooks/useAudio';
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

// ── 縦スクロールカードページ（activeCardを自己管理）──
interface PageProps {
  phrases: ExclamationPhrase[];
  isActivePage: boolean;
  onActiveCard: (idx: number, total: number, phrase: ExclamationPhrase) => void;
  isPlaying: boolean;
  isRecording: boolean;
  hasRecording: boolean;
  speak: (text: string, lang: Lang) => void;
  stop: () => void;
  onRecord: () => void;
  onPlayRecording: () => void;
}

function CategoryPage({
  phrases, isActivePage, onActiveCard,
  isPlaying, isRecording, hasRecording,
  speak, stop, onRecord, onPlayRecording,
}: PageProps) {
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 非アクティブになったらリセット
  useEffect(() => {
    if (!isActivePage) {
      setActiveCard(0);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  }, [isActivePage]);

  // アクティブカードを親に通知（ヘッダーカウンター用）
  useEffect(() => {
    if (isActivePage) onActiveCard(activeCard, phrases.length, phrases[activeCard]);
  }, [isActivePage, activeCard, phrases, onActiveCard]);

  // 縦スナップ: アクティブカード検出
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    itemRefs.current = itemRefs.current.slice(0, phrases.length);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.55) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) {
              setActiveCard(idx);
              if (isActivePage) stop();
            }
          }
        });
      },
      { root: container, threshold: [0.55] }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [phrases, isActivePage, stop]);

  // このページ内のアクティブフレーズを自分で計算
  const activePhrase = phrases[activeCard];

  const handlePlay = () => {
    if (isPlaying) { stop(); return; }
    if (activePhrase) speak(activePhrase.viet, 'vi-VN');
  };

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
        const isActive = i === activeCard;
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
                  isPlaying={isPlaying && isActivePage}
                  isRecording={isRecording && isActivePage}
                  hasRecording={hasRecording}
                  onPlay={handlePlay}
                  onRecord={onRecord}
                  onPlayRecording={onPlayRecording}
                />
              )}
            </div>
            {isActive && isActivePage && (
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

// ── カテゴリ別フレーズリスト（参照を固定してobserver再発火を防ぐ）──
const phrasesByCategory: Record<string, ExclamationPhrase[]> = Object.fromEntries(
  exclamationCategories.map((cat) => [
    cat,
    cat === 'すべて'
      ? exclamationPhrases
      : exclamationPhrases.filter((p) => p.category === cat),
  ])
);

// ── メインタブ ────────────────────────────────────
interface KantanTabProps { onStartQuiz?: (phrase: ExclamationPhrase) => void; }

export default function KantanTab({ onStartQuiz }: KantanTabProps = {}) {
  const [activePage, setActivePage] = useState(0);
  const [headerCard, setHeaderCard] = useState(0);
  const [headerTotal, setHeaderTotal] = useState(exclamationPhrases.length);
  const [activePhrase, setActivePhrase] = useState<ExclamationPhrase>(exclamationPhrases[0]);
  const hScrollRef = useRef<HTMLDivElement>(null);
  const activePageRef = useRef(0);

  const { isPlaying, speak, stop } = useTTS();
  const { isRecording, recordingUrl, startRecording, stopRecording, playRecording } = useRecorder();

  const handleRecord = () => { isRecording ? stopRecording() : startRecording(); };

  const handleActiveCard = useCallback((idx: number, total: number, phrase: ExclamationPhrase) => {
    setHeaderCard(idx);
    setHeaderTotal(total);
    setActivePhrase(phrase);
  }, []);

  useEffect(() => {
    const el = hScrollRef.current;
    if (!el) return;
    let timeout: ReturnType<typeof setTimeout>;
    const detect = () => {
      const page = Math.round(el.scrollLeft / el.clientWidth);
      if (page !== activePageRef.current) {
        activePageRef.current = page;
        setActivePage(page);
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

  const goToPage = (i: number) => {
    hScrollRef.current?.scrollTo({ left: i * (hScrollRef.current.clientWidth), behavior: 'smooth' });
  };

  const currentCat = exclamationCategories[activePage];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, background: C.offwhite }}>

      {/* ヘッダー */}
      <div style={{ padding: '12px 16px 10px', flexShrink: 0, background: C.offwhite }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: C.red, fontFamily: 'Nunito, sans-serif', letterSpacing: 0.5, opacity: 0.7 }}>
            {"Let's Chời ơi"}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: C.gray, fontFamily: 'Nunito, sans-serif' }}>
              {headerCard + 1} / {headerTotal}
            </span>
            {onStartQuiz && (
              <button
                onClick={() => onStartQuiz(activePhrase)}
                style={{
                  padding: '4px 10px', borderRadius: 20, border: 'none',
                  background: C.red, color: '#fff',
                  fontSize: 11, fontWeight: 800, fontFamily: 'Nunito, sans-serif',
                  cursor: 'pointer', letterSpacing: 0.5,
                }}
              >
                クイズ
              </button>
            )}
          </div>
        </div>

        {/* カテゴリーピルバー */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
          {exclamationCategories.map((cat, i) => {
            const active = i === activePage;
            return (
              <button
                key={cat}
                onClick={() => goToPage(i)}
                style={{
                  flexShrink: 0, padding: '5px 12px', borderRadius: 20,
                  border: active ? 'none' : `1.5px solid ${C.gray}`,
                  background: active ? C.red : 'transparent',
                  color: active ? '#fff' : C.gray,
                  fontSize: 12, fontWeight: active ? 800 : 500,
                  fontFamily: 'Nunito, sans-serif', cursor: 'pointer',
                  opacity: active ? 1 : 0.5, transition: 'all 0.25s ease',
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
          const phrases = phrasesByCategory[cat];
          return (
            <CategoryPage
              key={cat}
              phrases={phrases}
              isActivePage={pageIdx === activePage}
              onActiveCard={handleActiveCard}
              isPlaying={isPlaying}
              isRecording={isRecording}
              hasRecording={!!recordingUrl}
              speak={speak}
              stop={stop}
              onRecord={handleRecord}
              onPlayRecording={playRecording}
            />
          );
        })}
      </div>
    </div>
  );
}
