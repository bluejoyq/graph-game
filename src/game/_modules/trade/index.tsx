import { useEffect } from 'react';
import { useGameStore } from '../../_services/use-game-store';
import { GameStatus } from './_components/game-status';
import { NewsDisplayPopup } from './_components/news-display-popup';
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
    <>
      <div
        css={{
          height: '100vh',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: '100px 1fr 150px',
          gap: 8,
        }}
      >
        <GameStatus />
        <StockChart />
        <TradingPanel />
      </div>
      <NewsDisplayPopup />
    </>
  );
};
