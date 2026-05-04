'use client';

import React from 'react';

interface IOSDeviceProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  dark?: boolean;
}

export default function IOSDevice({ children, width = 390, height = 844, dark = false }: IOSDeviceProps) {
  return (
    <div style={{
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system,system-ui,sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
