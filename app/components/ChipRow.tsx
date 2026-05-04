'use client';

const C = { red: '#C8102E', dark: '#1A1A1A', lightGray: '#E8E6E2' };

interface ChipRowProps {
  chips: readonly string[];
  selected: string;
  onSelect: (c: string) => void;
}

export default function ChipRow({ chips, selected, onSelect }: ChipRowProps) {
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 4px', scrollbarWidth: 'none' }}>
      {chips.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          style={{
            flexShrink: 0,
            padding: '6px 14px',
            borderRadius: 999,
            border: selected === c ? 'none' : `1.5px solid ${C.lightGray}`,
            background: selected === c ? C.red : 'transparent',
            color: selected === c ? '#fff' : C.dark,
            fontSize: 13,
            fontWeight: selected === c ? 700 : 500,
            fontFamily: 'Nunito, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
