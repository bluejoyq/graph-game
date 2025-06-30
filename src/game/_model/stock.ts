export interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Stock {
  name: string;
  averagePrice: number;
  quantity: number;
}

export interface MockStockTick {
  time: number; // 게임 시작 후 경과 시간 (초)
  price: number;
  volume: number;
}
