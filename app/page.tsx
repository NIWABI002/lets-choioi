'use client';

import { useState } from 'react';
import BottomNav from '@/app/components/BottomNav';
import KantanTab from '@/app/components/tabs/KantanTab';
import EigoTab from '@/app/components/tabs/EigoTab';
import MixTab from '@/app/components/tabs/MixTab';
import SplashScreen from '@/app/components/SplashScreen';

type TabId = 'kantan' | 'eigo' | 'mix';

export default function Home() {
  const [tab, setTab] = useState<TabId>('kantan');
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      background: '#F8F7F4',
      overflow: 'hidden',
    }}>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      {/* タブコンテンツ */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {tab === 'kantan' && <KantanTab />}
        {tab === 'eigo' && <EigoTab />}
        {tab === 'mix' && <MixTab />}
      </div>

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}
