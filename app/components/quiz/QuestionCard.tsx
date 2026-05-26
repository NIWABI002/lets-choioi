import { ExclamationPhrase } from '@/app/data/phrases';
import { PlayIcon } from '@/app/components/icons';

interface Props { phrase: ExclamationPhrase; }

export default function QuestionCard({ phrase }: Props) {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#fff', borderRadius: 24,
      padding: '20px 18px', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 12px 40px -8px rgba(0,0,0,0.45)',
    }}>
      <div style={{ position: 'absolute', top: -28, right: -28, width: 120, height: 120, borderRadius: '50%', background: '#FFDA00', opacity: 0.12 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Nunito', fontSize: 9, fontWeight: 800, color: '#888', letterSpacing: 2, textTransform: 'uppercase' as const }}>
          {phrase.category}
        </div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F8F7F4', display: 'grid', placeItems: 'center', color: '#C8102E' }}>
          <PlayIcon size={11} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: '#C8102E', fontSize: 36, lineHeight: 1.05, letterSpacing: -0.5 }}>
          {phrase.viet}
        </div>
        <div style={{ fontFamily: '"Noto Sans JP", sans-serif', fontSize: 11, color: '#888', marginTop: 8, letterSpacing: 1.2 }}>
          {phrase.ruby}
        </div>
      </div>
    </div>
  );
}
