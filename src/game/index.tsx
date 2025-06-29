import { gray, red } from '@radix-ui/colors';
import { useState } from 'react';
import { TradeModule } from './_modules/trade';
import { useGameStore } from './_services/use-game-store';

export function Game() {
  const [tab, setTab] = useState<'home' | 'trade'>('trade');
  const { gameState } = useGameStore();

  return (
    <>
      <div css={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <div>
          <button
            type="button"
            onClick={() => setTab('home')}
            css={{
              backgroundColor: tab === 'home' ? red.red5 : gray.gray5,
            }}
          >
            home
          </button>
          <button
            type="button"
            onClick={() => setTab('trade')}
            css={{
              backgroundColor: tab === 'trade' ? red.red5 : gray.gray5,
            }}
          >
            trade
          </button>
        </div>
        <div css={{ fontSize: 20, fontWeight: 'bold' }}>{gameState.tick}</div>
      </div>
      {tab === 'home' && <div>home</div>}
      {tab === 'trade' && <TradeModule />}
    </>
  );
}
