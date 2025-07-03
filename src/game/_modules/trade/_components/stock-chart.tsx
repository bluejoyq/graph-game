import { useMemo } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency, formatDate } from '../../../../utils/csv-parser';
import { GAME_DURATION } from '../../../_model/game-state';
import { useGameStore } from '../../../_services/use-game-store';

export const StockChart = () => {
  const { gameState } = useGameStore();

  // 현재 진행 지점 계산
  const currentDataIndex = useMemo(() => {
    return Math.floor((gameState.gameTime / GAME_DURATION) * gameState.stockData.length);
  }, [gameState.gameTime, gameState.stockData.length]);

  // 차트용 데이터 - 최근 100틱만 슬라이딩 윈도우
  const chartData = useMemo(() => {
    const WINDOW_SIZE = 100; // 최근 100틱만 표시
    const endIndex = Math.min(currentDataIndex + 1, gameState.stockData.length);
    const startIndex = Math.max(0, endIndex - WINDOW_SIZE);

    return gameState.stockData.slice(startIndex, endIndex).map((data, index) => ({
      day: startIndex + index + 1, // 실제 데이터 인덱스
      price: data.close,
      date: formatDate(data.date),
    }));
  }, [gameState.stockData, currentDataIndex]);

  // 데이터가 없을 때 표시
  if (gameState.stockData.length === 0) {
    return (
      <div
        css={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div css={{ color: '#6B7280' }}>차트 데이터를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="day" stroke="#6B7280" tick={{ fontSize: 11, fill: '#6B7280' }} />
        <YAxis
          stroke="#6B7280"
          tick={{ fontSize: 11, fill: '#6B7280' }}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          labelFormatter={(value) => `Day ${value}`}
          formatter={(value: number) => [formatCurrency(value), 'Price']}
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            color: '#1F2937',
            fontSize: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 3, fill: '#3B82F6' }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
