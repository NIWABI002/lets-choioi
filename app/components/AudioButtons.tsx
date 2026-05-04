'use client';

const C = { red: '#C8102E' };

interface AudioButtonsProps {
  isPlaying: boolean;
  isRecording: boolean;
  hasRecording: boolean;
  onPlay: () => void;
  onRecord: () => void;
  onPlayRecording: () => void;
}

export default function AudioButtons({ isPlaying, isRecording, hasRecording, onPlay, onRecord, onPlayRecording }: AudioButtonsProps) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {/* TTS play */}
      <button
        onClick={onPlay}
        style={{
          flex: 1, height: 44, borderRadius: 12,
          background: isPlaying ? '#a00020' : C.red,
          border: 'none', color: '#fff',
          fontSize: 14, fontWeight: 700, fontFamily: 'Nunito, sans-serif',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'all 0.15s ease',
          boxShadow: isPlaying ? '0 0 0 3px rgba(200,16,46,0.3)' : 'none',
        }}
      >
        {isPlaying ? (
          <>
            <span style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: 'inline-block',
                  width: 3, borderRadius: 2,
                  background: '#fff', opacity: 0.9,
                  height: 8 + i * 4,
                  animation: `wave ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
                }} />
              ))}
            </span>
            再生中
          </>
        ) : '▶ 再生'}
      </button>

      {/* Record */}
      <button
        onClick={onRecord}
        style={{
          flex: 1, height: 44, borderRadius: 12,
          background: isRecording ? C.red : 'transparent',
          border: `1.5px solid ${C.red}`,
          color: isRecording ? '#fff' : C.red,
          fontSize: 14, fontWeight: 700, fontFamily: 'Nunito, sans-serif',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'all 0.15s ease',
        }}
      >
        {isRecording ? (
          <><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', animation: 'pulse 1s ease-in-out infinite' }} />録音中</>
        ) : '⏺ 録音'}
      </button>

      {/* Play own recording */}
      {hasRecording && (
        <button
          onClick={onPlayRecording}
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'transparent',
            border: `1.5px solid #888`,
            color: '#888',
            fontSize: 14, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s ease',
            flexShrink: 0,
          }}
          title="自分の録音を再生"
        >
          🎧
        </button>
      )}
    </div>
  );
}
