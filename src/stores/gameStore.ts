import { create } from "zustand";

interface GameStore {
  selectedGameId: string | null;
  recentGames: string[];
  setSelectedGame: (id: string | null) => void;
  addRecentGame: (id: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  selectedGameId: null,
  recentGames: [],
  setSelectedGame: (id) => set({ selectedGameId: id }),
  addRecentGame: (id) =>
    set((state) => ({
      recentGames: [id, ...state.recentGames.slice(0, 4)],
    })),
}));
