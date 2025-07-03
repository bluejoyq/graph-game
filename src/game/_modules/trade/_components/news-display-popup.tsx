import { Bell } from 'lucide-react';
import { useGameStore } from '../../../_services/use-game-store';

export const NewsDisplayPopup = () => {
  const { gameState } = useGameStore();

  return (
    <>
      {/* 뉴스 예고 팝업 - 1초(4틱) 전부터 표시 */}
      {gameState.showNewsPreview && (
        <div
          css={{
            position: 'fixed',
            top: 20,
            right: 20,
            backgroundColor: '#FEF3C7',
            color: '#92400E',
            padding: '12px 16px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            border: '2px solid #F59E0B',
            // 깜빡이는 애니메이션
            animation: 'newsPreview 0.8s infinite',
            '@keyframes newsPreview': {
              '0%, 100%': {
                opacity: 1,
                transform: 'scale(1)',
              },
              '50%': {
                opacity: 0.7,
                transform: 'scale(1.05)',
              },
            },
          }}
        >
          <Bell
            size={16}
            css={{
              animation: 'bellShake 0.5s infinite',
              '@keyframes bellShake': {
                '0%, 100%': { transform: 'rotate(0deg)' },
                '25%': { transform: 'rotate(-10deg)' },
                '75%': { transform: 'rotate(10deg)' },
              },
            }}
          />
          <span css={{ fontWeight: '600', fontSize: 14 }}>🚨 속보 예고 (1초 후)</span>
        </div>
      )}

      {/* 뉴스 팝업 */}
      {gameState.currentNews && (
        <div
          css={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1001,
            maxWidth: '90vw',
            width: 400,
            // 등장 애니메이션
            animation: 'newsAppear 0.3s ease-out',
            '@keyframes newsAppear': {
              '0%': {
                opacity: 0,
                transform: 'translate(-50%, -50%) scale(0.8)',
              },
              '100%': {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(1)',
              },
            },
          }}
        >
          <div
            css={{
              backgroundColor: gameState.currentNews.impact === 'positive' ? '#DCFCE7' : '#FEE2E2',
              color: gameState.currentNews.impact === 'positive' ? '#166534' : '#991B1B',
              padding: 20,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${gameState.currentNews.impact === 'positive' ? '#16A34A' : '#DC2626'}`,
              // 약간 흔들리는 효과
              animation:
                gameState.currentNews.impact === 'negative' ? 'newsShake 0.1s infinite' : 'none',
              '@keyframes newsShake': {
                '0%, 100%': { transform: 'translateX(0)' },
                '25%': { transform: 'translateX(-1px)' },
                '75%': { transform: 'translateX(1px)' },
              },
            }}
          >
            <span
              css={{
                fontSize: 24,
                animation: 'iconPulse 1s infinite',
                '@keyframes iconPulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                },
              }}
            >
              {gameState.currentNews.impact === 'positive' ? '📈' : '📉'}
            </span>
            <span css={{ fontWeight: '600', fontSize: 16 }}>{gameState.currentNews.title}</span>
          </div>
        </div>
      )}
    </>
  );
};
