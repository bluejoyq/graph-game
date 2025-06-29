import { useNavigate } from '@tanstack/react-router';

export function Home() {
  const navigate = useNavigate();

  const _handleStart = () => {
    navigate({ to: '/game' });
  };

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <button type="button" onClick={_handleStart}>
        시작하기
      </button>
    </div>
  );
}
