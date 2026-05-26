export default function IntroCard() {
  return (
    <div style={{
      width: '100%', height: '100%', borderRadius: 8,
      background: '#C8102E',
      border: '1px solid rgba(255, 218, 0, 0.45)',
      padding: '6px 5px', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
    }}>
      {/* 四隅の小さな菱形（裏面と統一） */}
      <div style={{ position: 'absolute', top: 4, left: 4, fontSize: 6, color: '#FFDA00', opacity: 0.7, fontWeight: 900 }}>◆</div>
      <div style={{ position: 'absolute', top: 4, right: 4, fontSize: 6, color: '#FFDA00', opacity: 0.7, fontWeight: 900 }}>◆</div>
      <div style={{ position: 'absolute', bottom: 4, left: 4, fontSize: 6, color: '#FFDA00', opacity: 0.7, fontWeight: 900 }}>◆</div>
      <div style={{ position: 'absolute', bottom: 4, right: 4, fontSize: 6, color: '#FFDA00', opacity: 0.7, fontWeight: 900 }}>◆</div>
      <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: '#FFDA00', fontSize: 7, letterSpacing: 1.5 }}>{"LET'S"}</div>
      <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, color: '#fff', fontSize: 12, lineHeight: 1, marginTop: 2, letterSpacing: -0.3 }}>Chời ơi!</div>
      <div style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.85)', fontSize: 5.5, marginTop: 3, letterSpacing: 1.2 }}>スタート</div>
    </div>
  );
}
