import { create } from 'zustand';
import { type GameState, initialGameState } from '../_model/game';

type GameStore = {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
};

let _tmpGameState: GameState | null = null;

export const useGameStore = create<GameStore>(() => {
  return {
    gameState: initialGameState,
    setGameState: (gameState: GameState) => {
      _tmpGameState = gameState;
    },
  };
});

setInterval(() => {
  let nextGameState: GameState;
  if (_tmpGameState != null) {
    nextGameState = {
      ..._tmpGameState,
      tick: _tmpGameState.tick + 1,
    };
    _tmpGameState = null;
  } else {
    nextGameState = {
      ...useGameStore.getState().gameState,
      tick: useGameStore.getState().gameState.tick + 1,
    };
  }
  useGameStore.setState({ gameState: nextGameState });
}, 250);
