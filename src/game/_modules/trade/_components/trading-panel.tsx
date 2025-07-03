import { useGameStore } from '../../../_services/use-game-store';

export const TradingPanel = () => {
  const { gameState, buyStock, sellStock } = useGameStore();

  const buttonStyle = {
    padding: '6px 12px',
    borderRadius: 6,
    border: 'none',
    fontWeight: '600',
    fontSize: 11,
    cursor: 'pointer',
    transition: 'all 0.2s',
    height: 32,
    ':hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'none',
    },
  };

  const buyButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#10B981',
    color: 'white',
  };

  const sellButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#EF4444',
    color: 'white',
  };

  return (
    <div
      css={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 6,
          flex: 1,
          alignContent: 'center',
        }}
      >
        {/* 매수 버튼들 */}
        <button
          type="button"
          css={{
            ...buyButtonStyle,
            backgroundColor: '#047857',
          }}
          onClick={() => buyStock(0.25)}
          disabled={gameState.gameOver || gameState.cash < gameState.currentPrice}
        >
          25% 사기
        </button>

        <button
          type="button"
          css={{
            ...buyButtonStyle,
            backgroundColor: '#059669',
          }}
          onClick={() => buyStock(0.5)}
          disabled={gameState.gameOver || gameState.cash < gameState.currentPrice}
        >
          50% 사기
        </button>

        <button
          type="button"
          css={buyButtonStyle}
          onClick={() => buyStock(1.0)}
          disabled={gameState.gameOver || gameState.cash < gameState.currentPrice}
        >
          100% 사기
        </button>

        {/* 매도 버튼들 */}
        <button
          type="button"
          css={{
            ...sellButtonStyle,
            backgroundColor: '#DC2626',
          }}
          onClick={() => sellStock(0.25)}
          disabled={gameState.gameOver || gameState.shares === 0}
        >
          25% 팔기
        </button>

        <button
          type="button"
          css={{
            ...sellButtonStyle,
            backgroundColor: '#E11D48',
          }}
          onClick={() => sellStock(0.5)}
          disabled={gameState.gameOver || gameState.shares === 0}
        >
          50% 팔기
        </button>

        <button
          type="button"
          css={sellButtonStyle}
          onClick={() => sellStock(1.0)}
          disabled={gameState.gameOver || gameState.shares === 0}
        >
          100% 팔기
        </button>
      </div>
    </div>
  );
};
