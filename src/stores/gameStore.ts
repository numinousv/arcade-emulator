import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Game {
  id: string;
  name: string;
  core: string;
  url: string;
  cover?: string;
  description?: string;
}

interface GameState {
  // Navigation state
  selectedGame: Game | null;
  isPlaying: boolean;
  
  // UI state
  searchQuery: string;
  selectedCore: string | null;
  isNavbarOpen: boolean;
  
  // Emulator state
  isEmulatorReady: boolean;
  isFullscreen: boolean;
  
  // Actions
  selectGame: (game: Game) => void;
  stopGame: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCore: (core: string | null) => void;
  toggleNavbar: () => void;
  setEmulatorReady: (ready: boolean) => void;
  toggleFullscreen: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      selectedGame: null,
      isPlaying: false,
      searchQuery: '',
      selectedCore: null,
      isNavbarOpen: true,
      isEmulatorReady: false,
      isFullscreen: false,
      
      selectGame: (game) => set({ 
        selectedGame: game, 
        isPlaying: true,
        isEmulatorReady: false,
      }),
      
      stopGame: () => set({ 
        selectedGame: null, 
        isPlaying: false,
        isEmulatorReady: false,
      }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCore: (core) => set({ selectedCore: core }),
      toggleNavbar: () => set((state) => ({ isNavbarOpen: !state.isNavbarOpen })),
      setEmulatorReady: (ready) => set({ isEmulatorReady: ready }),
      toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
    }),
    {
      name: 'game-store',
      partialize: (state) => ({ 
        // Only persist search query, not game state
        searchQuery: state.searchQuery,
        selectedCore: state.selectedCore,
      }),
    }
  )
);