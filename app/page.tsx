'use client';

import { useState } from 'react';
import IOSDevice from '@/app/components/IOSDevice';
import BottomNav from '@/app/components/BottomNav';
import KantanTab from '@/app/components/tabs/KantanTab';
import EigoTab from '@/app/components/tabs/EigoTab';
import MixTab from '@/app/components/tabs/MixTab';

type TabId = 'kantan' | 'eigo' | 'mix';

const C = { offwhite: '#F8F7F4' };

function AppShell() {
  const [tab, setTab] = useState<TabId>('kantan');

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',

      background: C.offwhite,
    }}>
      {/* Tab content */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {tab === 'kantan' && <KantanTab />}
        {tab === 'eigo' && <EigoTab />}
        {tab === 'mix' && <MixTab />}
      </div>

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ padding: '40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <IOSDevice width={390} height={844}>
        <AppShell />
      </IOSDevice>
    </div>
  );
}
