import type { News } from './news';
import type { Stock, StockData } from './stock';
import type { Transaction } from './transaction';

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
  // 추가 상태들
  stockData: StockData[];
  gameNews: News[];
  isPlaying: boolean;
  loading: boolean;
  tick: number;
  stocks: Stock[];
}

export interface GameResult {
  initialCash: number;
  finalValue: number;
  profit: number;
  profitPercentage: number;
  transactions: Transaction[];
  days: number;
}

export interface MockGameData {
  stockName: string;
  initialPrice: number;
  ticks: any[];
  news: News[];
  gameDuration: number; // 게임 총 시간 (초)
}

// 게임 상수들
export const INITIAL_CASH = 10000;
export const GAME_SPEED = 500;
export const GAME_DURATION = 300;

export const initialGameState: GameState = {
  tick: 0,
  cash: INITIAL_CASH,
  shares: 0,
  currentPrice: 0,
  gameTime: 0,
  gameOver: false,
  gameDuration: GAME_DURATION,
  transactions: [],
  currentNews: null,
  newsHistory: [],
  showNewsPreview: false,
  stockData: [],
  gameNews: [],
  isPlaying: false,
  loading: true,
  stocks: [],
};
