export default function LotusBack() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(155deg, #1a0a0a 0%, #3d0a0a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        fontSize: 22, opacity: 0.25, userSelect: 'none',
        fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: '#FFDA00',
      }}>◆</div>
    </div>
  );
}
