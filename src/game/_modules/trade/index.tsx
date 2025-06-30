import { useEffect } from 'react';
import { useGameStore } from '../../_services/use-game-store';
import { GameStatus } from './_components/game-status';
import { NewsDisplay } from './_components/news-display';
import { StockChart } from './_components/stock-chart';
import { TradingPanel } from './_components/trading-panel';

export const TradeModule = () => {
  const { gameState, initializeGame } = useGameStore();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  if (gameState.loading) {
    return (
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <div>데이터를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div
      css={{
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        gap: 8,
      }}
    >
      <NewsDisplay />

      <div css={{ height: '20%' }}>
        <GameStatus />
      </div>

      <div css={{ height: '60%' }}>
        <StockChart />
      </div>

      <div css={{ height: '20%' }}>
        <TradingPanel />
      </div>
    </div>
  );
};
