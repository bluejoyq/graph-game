export type GameState = {
  tick: number;
  stocks: Stock[];
  cash: number;
};

export type Stock = {
  name: string;
  averagePrice: number;
  quantity: number;
};

export const initialGameState: GameState = {
  tick: 0,
  stocks: [],
  cash: 100000,
};
