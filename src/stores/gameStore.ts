import { create } from 'zustand';
import { Game } from '../types/game';

interface GameState {
  selectedGame?: Game | null;
  isPlaying: boolean;
  selectGame: (game: Game) => void;
  stopGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  selectedGame: null,
  isPlaying: false,
  selectGame: (game) => set({ selectedGame: game, isPlaying: true }),
  stopGame: () => set({ selectedGame: null, isPlaying: false }),
}));