import { ExclamationPhrase } from '@/app/data/phrases';

const C = { red: '#C8102E', yellow: '#FFDA00', gray: '#888', offwhite: '#F8F7F4', dark: '#1A1A1A' };

interface Props { phrase: ExclamationPhrase; }

export default function QuizCardFront({ phrase }: Props) {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#fff', borderRadius: 24,
      padding: '8px 10px', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: C.yellow, opacity: 0.12 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div data-card-cat style={{ fontFamily: 'Nunito', fontSize: 9, fontWeight: 800, color: C.gray, letterSpacing: 2, textTransform: 'uppercase' as const }}>
          {phrase.category}
        </div>
        <div data-card-emoji style={{ fontSize: 14 }}>{phrase.emoji}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div data-card-viet style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: C.red, fontSize: 20, lineHeight: 1.1, letterSpacing: -0.5 }}>
          {phrase.viet}
        </div>
        <div data-card-ruby style={{ fontFamily: '"Noto Sans JP", sans-serif', fontSize: 9, color: C.gray, marginTop: 4, letterSpacing: 1 }}>
          {phrase.ruby}
        </div>
      </div>
      <div data-card-play style={{ width: 20, height: 20, borderRadius: '50%', background: C.offwhite, display: 'grid', placeItems: 'center', alignSelf: 'center', color: C.red, fontSize: 8 }}>▶</div>
    </div>
  );
}
