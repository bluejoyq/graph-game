import { Game } from '../game';
import { Home } from '../game/_modules/home';
import { type AppState, initialHomeState } from './models/app-state';

import { useGameLoopState } from './services/use-game-loop';

function App() {
  const [state, setState] = useGameLoopState<AppState>(initialHomeState);

  return (
    <AppStateContext.Provider value={[state, setState]}>
      {state.type === 'home' && <Home />}
      {state.type === 'game' && <Game />}
    </AppStateContext.Provider>
  );
}

export default App;
