import { ExclamationPhrase } from '@/app/data/phrases';

interface Props { phrase: ExclamationPhrase; correct: boolean; }

export default function AnswerCard({ phrase, correct }: Props) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: correct
        ? 'linear-gradient(160deg, #fff 0%, #f0fbf4 100%)'
        : 'linear-gradient(160deg, #fff 0%, #fdf3f4 100%)',
      borderRadius: 24, padding: '10px 14px 12px', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 12px 40px -8px rgba(0,0,0,0.45)',
      border: `2px solid ${correct ? '#28B85A' : '#C8102E'}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Nunito', fontSize: 10, fontWeight: 800, color: correct ? '#0F7B3A' : '#C8102E', letterSpacing: 1.6 }}>
          {correct ? '✓ ĐÚNG / 正解' : '✗ SAI / 不正解'}
        </div>
        <div style={{ fontSize: 18 }}>{phrase.emoji}</div>
      </div>
      <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' as const }}>
        <div style={{ fontFamily: 'Nunito', fontWeight: 900, color: '#C8102E', fontSize: 28, lineHeight: 1.0, letterSpacing: -0.5 }}>
          {phrase.viet}
        </div>
        <div style={{ fontFamily: '"Noto Sans JP", sans-serif', fontSize: 10, color: '#888', letterSpacing: 1 }}>
          {phrase.ruby}
        </div>
      </div>
      <div style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 700, color: '#1A1A1A', fontSize: 13, marginTop: 3 }}>
        {phrase.jp}
      </div>
      {phrase.nuance && (
        <div style={{ fontFamily: '"Noto Sans JP", sans-serif', fontSize: 10.5, color: '#444', marginTop: 6, lineHeight: 1.45, paddingTop: 5, borderTop: '1px solid #eee' }}>
          {phrase.nuance}
        </div>
      )}
      {phrase.example && (
        <div style={{ marginTop: 6, paddingTop: 5, borderTop: '1px dashed #eee', flex: 1, overflow: 'hidden' }}>
          <div style={{ fontFamily: 'Nunito', fontSize: 8.5, fontWeight: 800, color: '#888', letterSpacing: 1.5, marginBottom: 2 }}>VÍ DỤ / 用例</div>
          <div style={{ fontFamily: '"Noto Sans JP", sans-serif', fontSize: 10.5, color: '#1A1A1A', lineHeight: 1.4 }}>
            {phrase.example}
          </div>
        </div>
      )}
    </div>
  );
}
