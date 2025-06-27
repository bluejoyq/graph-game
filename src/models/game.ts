export interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface GameState {
  cash: number;
  shares: number;
  currentPrice: number;
  dayIndex: number;
  gameOver: boolean;
  totalDays: number;
  transactions: Transaction[];
}

export interface Transaction {
  type: 'buy' | 'sell';
  price: number;
  shares: number;
  date: string;
  profit?: number;
}

export interface GameResult {
  initialCash: number;
  finalValue: number;
  profit: number;
  profitPercentage: number;
  transactions: Transaction[];
  days: number;
}
