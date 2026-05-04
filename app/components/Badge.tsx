'use client';

const C = { yellow: '#FFDA00', dark: '#1A1A1A' };

export default function Badge({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 999,
      background: C.yellow,
      color: C.dark,
      fontSize: 11,
      fontWeight: 800,
      fontFamily: 'Nunito, sans-serif',
      letterSpacing: 0.3,
    }}>{label}</span>
  );
}
