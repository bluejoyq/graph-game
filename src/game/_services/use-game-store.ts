import { create } from 'zustand';
import { generateGameNews, getCurrentNews, getNewsPreview, parseCSV } from '../../utils/csv-parser';
import type { GameState } from '../_model/game-state';
import { GAME_DURATION, GAME_SPEED, initialGameState } from '../_model/game-state';
import type { Transaction } from '../_model/transaction';

type GameStore = {
  gameState: GameState;
  // 게임 초기화
  initializeGame: () => Promise<void>;
  // 게임 제어
  startGame: () => void;
  stopGame: () => void;
  resetGame: () => void;
  // 거래
  buyStock: (percentage?: number) => void;
  sellStock: (percentage?: number) => void;
  // 상태 업데이트
  updateGameState: (updater: (state: GameState) => GameState) => void;
};

let gameInterval: ReturnType<typeof setInterval> | null = null;

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: initialGameState,

  initializeGame: async () => {
    try {
      set((state) => ({
        gameState: { ...state.gameState, loading: true },
      }));

      const data = await parseCSV('/TSLA_24h.csv');
      const news = generateGameNews();

      set((state) => ({
        gameState: {
          ...state.gameState,
          stockData: data,
          gameNews: news,
          currentPrice: data[0]?.open || 0,
          loading: false,
        },
      }));

      // 게임 자동 시작
      get().startGame();
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
      set((state) => ({
        gameState: { ...state.gameState, loading: false },
      }));
    }
  },

  startGame: () => {
    const { gameState } = get();
    if (gameInterval || gameState.gameOver || gameState.loading) return;

    set((state) => ({
      gameState: { ...state.gameState, isPlaying: true },
    }));

    gameInterval = setInterval(() => {
      const currentState = get().gameState;

      if (currentState.gameOver || !currentState.isPlaying) {
        if (gameInterval) {
          clearInterval(gameInterval);
          gameInterval = null;
        }
        return;
      }

      const nextTime = currentState.gameTime + GAME_SPEED / 1000;
      const isGameOver = nextTime >= GAME_DURATION;

      // 주가 데이터 인덱스 계산
      const dataIndex = Math.floor(
        (nextTime / GAME_DURATION) * (currentState.stockData.length - 1),
      );
      const currentPrice = currentState.stockData[dataIndex]?.close || currentState.currentPrice;

      // 뉴스 시스템
      const currentNews = getCurrentNews(nextTime, currentState.gameNews);
      const newsPreview = getNewsPreview(nextTime, currentState.gameNews);

      let newsHistory = currentState.newsHistory;
      // 뉴스가 끝났을 때 히스토리에 추가
      if (currentState.currentNews && !currentNews && currentState.currentNews !== null) {
        newsHistory = [...currentState.newsHistory, currentState.currentNews];
      }

      set((state) => ({
        gameState: {
          ...state.gameState,
          gameTime: nextTime,
          currentPrice,
          currentNews,
          showNewsPreview: !!newsPreview,
          newsHistory,
          gameOver: isGameOver,
          tick: state.gameState.tick + 1,
        },
      }));

      if (isGameOver && gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
      }
    }, GAME_SPEED);
  },

  stopGame: () => {
    if (gameInterval) {
      clearInterval(gameInterval);
      gameInterval = null;
    }
    set((state) => ({
      gameState: { ...state.gameState, isPlaying: false },
    }));
  },

  resetGame: () => {
    if (gameInterval) {
      clearInterval(gameInterval);
      gameInterval = null;
    }
    set({ gameState: initialGameState });
  },

  buyStock: (percentage = 1.0) => {
    const { gameState } = get();
    const availableCash = gameState.cash * percentage;
    const maxShares = Math.floor(availableCash / gameState.currentPrice);

    if (maxShares > 0) {
      const cost = maxShares * gameState.currentPrice;

      const transaction: Transaction = {
        type: 'buy',
        price: gameState.currentPrice,
        shares: maxShares,
        date:
          gameState.stockData[
            Math.floor((gameState.gameTime / GAME_DURATION) * (gameState.stockData.length - 1))
          ]?.date || '',
      };

      set((state) => ({
        gameState: {
          ...state.gameState,
          cash: state.gameState.cash - cost,
          shares: state.gameState.shares + maxShares,
          transactions: [...state.gameState.transactions, transaction],
        },
      }));
    }
  },

  sellStock: (percentage = 1.0) => {
    const { gameState } = get();
    const sharesToSell = Math.floor(gameState.shares * percentage);

    if (sharesToSell > 0) {
      const revenue = sharesToSell * gameState.currentPrice;
      const avgBuyPrice =
        gameState.transactions
          .filter((t: Transaction) => t.type === 'buy')
          .reduce((total: number, t: Transaction) => total + t.price * t.shares, 0) /
        gameState.shares;

      const profit = revenue - avgBuyPrice * sharesToSell;

      const transaction: Transaction = {
        type: 'sell',
        price: gameState.currentPrice,
        shares: sharesToSell,
        date:
          gameState.stockData[
            Math.floor((gameState.gameTime / GAME_DURATION) * (gameState.stockData.length - 1))
          ]?.date || '',
        profit,
      };

      set((state) => ({
        gameState: {
          ...state.gameState,
          cash: state.gameState.cash + revenue,
          shares: state.gameState.shares - sharesToSell,
          transactions: [...state.gameState.transactions, transaction],
        },
      }));
    }
  },

  updateGameState: (updater) => {
    set((state) => ({
      gameState: updater(state.gameState),
    }));
  },
}));
