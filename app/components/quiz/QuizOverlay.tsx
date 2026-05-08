'use client';

import { useState } from 'react';
import { ExclamationPhrase } from '@/app/data/phrases';
import PinchTransition from './PinchTransition';
import QuizScreen from './QuizScreen';

interface Props {
  pool: ExclamationPhrase[];
  pickedPhrase: ExclamationPhrase;
  onExit: () => void;
}

type Phase = 'transition' | 'quiz';

export default function QuizOverlay({ pool, pickedPhrase, onExit }: Props) {
  const [phase, setPhase] = useState<Phase>('transition');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
      <div className="ck-bg" style={{ position: 'absolute', inset: 0 }}>
        <div className="ck-vignette" />
      </div>

      {phase === 'transition' && (
        <PinchTransition
          cards={pool}
          picked={pickedPhrase}
          onComplete={() => setPhase('quiz')}
          speed={1.2}
          gridCols={4}
          gridRows={5}
        />
      )}

      {phase === 'quiz' && (
        <QuizScreen
          pool={pool}
          total={7}
          onExit={onExit}
          introFromTransition
        />
      )}
    </div>
  );
}
