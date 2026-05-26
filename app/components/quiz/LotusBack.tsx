export default function LotusBack() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(155deg, #8a0a1f 0%, #C8102E 100%)',
      border: '1px solid rgba(255, 218, 0, 0.4)',
      borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* 四隅の小さな菱形（トランプ感） */}
      <div style={{ position: 'absolute', top: 3, left: 3, fontSize: 5, color: '#FFDA00', opacity: 0.7, fontWeight: 900 }}>◆</div>
      <div style={{ position: 'absolute', top: 3, right: 3, fontSize: 5, color: '#FFDA00', opacity: 0.7, fontWeight: 900 }}>◆</div>
      <div style={{ position: 'absolute', bottom: 3, left: 3, fontSize: 5, color: '#FFDA00', opacity: 0.7, fontWeight: 900 }}>◆</div>
      <div style={{ position: 'absolute', bottom: 3, right: 3, fontSize: 5, color: '#FFDA00', opacity: 0.7, fontWeight: 900 }}>◆</div>
      {/* 中央の大きな菱形 */}
      <div style={{
        fontSize: 20, opacity: 0.5, userSelect: 'none',
        fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: '#FFDA00',
      }}>◆</div>
    </div>
  );
}
