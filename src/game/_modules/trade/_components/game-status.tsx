import { BarChart3, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { formatCurrency } from '../../../../utils/csv-parser';
import { GAME_DURATION } from '../../../_model/game-state';
import { useGameStore } from '../../../_services/use-game-store';

export const GameStatus = () => {
  const { gameState } = useGameStore();

  // 시간 포맷 (MM:SS)
  const formatTime = (seconds: number): string => {
    const remainingTime = Math.max(0, GAME_DURATION - seconds);
    const minutes = Math.floor(remainingTime / 60);
    const secs = Math.floor(remainingTime % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 평단가 계산
  const averagePrice = useMemo(() => {
    if (gameState.shares === 0) return 0;

    const buyTransactions = gameState.transactions.filter((t) => t.type === 'buy');
    if (buyTransactions.length === 0) return 0;

    const totalCost = buyTransactions.reduce((total, t) => total + t.price * t.shares, 0);
    const totalShares = buyTransactions.reduce((total, t) => total + t.shares, 0);

    return totalCost / totalShares;
  }, [gameState.transactions, gameState.shares]);

  return (
    <div
      css={{
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 게임 헤더 - 한 줄로 정리 */}
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
          flexShrink: 0,
        }}
      >
        {/* 타이머 */}
        <div css={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span css={{ fontSize: 12, color: '#6B7280' }}>남은 시간:</span>
          <span
            css={{
              fontSize: 16,
              fontWeight: 'bold',
              color:
                gameState.gameTime > GAME_DURATION * 0.8
                  ? '#EF4444'
                  : gameState.gameTime > GAME_DURATION * 0.6
                    ? '#F59E0B'
                    : '#10B981',
            }}
          >
            {formatTime(gameState.gameTime)}
          </span>
        </div>

        {gameState.gameOver && (
          <div
            css={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#10B981',
            }}
          >
            🎉 게임 종료!
          </div>
        )}

        <div css={{ fontSize: 14, color: '#6B7280' }}>Tick: {gameState.tick}</div>
      </div>

      {/* 게임 상태 카드들 - 남은 공간 차지 */}
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          flex: 1,
        }}
      >
        <div
          css={{
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: 8,
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          <div css={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <DollarSign size={14} />
            <span css={{ fontWeight: '600', fontSize: 12 }}>현금</span>
          </div>
          <div css={{ fontSize: 14, fontWeight: 'bold' }}>{formatCurrency(gameState.cash)}</div>
        </div>

        <div
          css={{
            backgroundColor: '#10B981',
            color: 'white',
            padding: 8,
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          <div css={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <TrendingUp size={14} />
            <span css={{ fontWeight: '600', fontSize: 12 }}>보유 주식</span>
          </div>
          <div css={{ fontSize: 14, fontWeight: 'bold' }}>{gameState.shares}주</div>
        </div>

        <div
          css={{
            backgroundColor: '#EF4444',
            color: 'white',
            padding: 8,
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          <div css={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <TrendingDown size={14} />
            <span css={{ fontWeight: '600', fontSize: 12 }}>현재가</span>
          </div>
          <div css={{ fontSize: 14, fontWeight: 'bold' }}>
            {formatCurrency(gameState.currentPrice)}
          </div>
        </div>

        <div
          css={{
            backgroundColor: '#F59E0B',
            color: 'white',
            padding: 8,
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          <div css={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <BarChart3 size={14} />
            <span css={{ fontWeight: '600', fontSize: 12 }}>평단가</span>
          </div>
          <div css={{ fontSize: 14, fontWeight: 'bold' }}>
            {gameState.shares > 0 ? formatCurrency(averagePrice) : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};
