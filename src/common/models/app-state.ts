type HomeState = {
  type: 'home';
};

type GameState = {
  type: 'game';
  tick: number;
  stocks: {
    name: string;
    averagePrice: number;
    quantity: number;
  }[];
  cash: number;
};

export type AppState = HomeState | GameState;

export const initialHomeState: HomeState = {
  type: 'home',
};

export const initialGameState: GameState = {
  type: 'game',
  tick: 0,
  stocks: [],
  cash: 10000,
};
