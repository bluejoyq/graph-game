import { gray, red } from '@radix-ui/colors';
import { useState } from 'react';
import { StockGame } from '../components/stock-game';

export function Game() {
  const [tab, setTab] = useState<'home' | 'trade'>('home');

  return (
    <>
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
      {tab === 'home' && <div>home</div>}
      {tab === 'trade' && <StockGame />}
    </>
  );
}
