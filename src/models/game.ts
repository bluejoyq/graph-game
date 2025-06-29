export interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Transaction {
  type: 'buy' | 'sell';
  price: number;
  shares: number;
  date: string;
  profit?: number;
}

// 뉴스 시스템을 위한 타입들
export interface News {
  id: string;
  title: string;
  impact: 'positive' | 'negative';
  triggerTime: number; // 게임 시작 후 몇 초에 등장할지
  duration: number; // 뉴스 표시 지속 시간 (초)
  priceImpact: number; // 주가에 미치는 영향 (%)
}

export interface MockStockTick {
  time: number; // 게임 시작 후 경과 시간 (초)
  price: number;
  volume: number;
}

export interface MockGameData {
  stockName: string;
  initialPrice: number;
  ticks: MockStockTick[];
  news: News[];
  gameDuration: number; // 게임 총 시간 (초)
}

// 게임 상태 (뉴스 시스템 포함)
export interface GameState {
  cash: number;
  shares: number;
  currentPrice: number;
  gameTime: number; // 게임 경과 시간 (초)
  gameOver: boolean;
  gameDuration: number; // 총 게임 시간 (초)
  transactions: Transaction[];
  currentNews: News | null; // 현재 표시중인 뉴스
  newsHistory: News[]; // 지나간 뉴스들
  showNewsPreview: boolean; // 뉴스 예고 표시 여부
}

export interface GameResult {
  initialCash: number;
  finalValue: number;
  profit: number;
  profitPercentage: number;
  transactions: Transaction[];
  days: number;
}
