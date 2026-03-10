// /src/routes/pacman.tsx
import React, { useState } from "react";
import { createFileRoute } from '@tanstack/react-router';
import { MenuScreen } from '../components/pacman/MenuScreen';
import { SimpleGame } from '../components/pacman/SimpleGame';
import { usePacmanLogic } from '../components/pacman/pacmanLogic'; // Importera pacmanLogic

const ArcadeApp = () => {
  const [gameActive, setGameActive] = useState(false);
  const { resetGame } = usePacmanLogic(); // Tillgång till logiken om nödvändigt

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col">
      {!gameActive ? (
        <MenuScreen onPlay={() => {
          resetGame(); // Reset spelet när användaren börjar spela
          setGameActive(true);
        }} />
      ) : (
        <div className="flex-1">
          <button 
            onClick={() => setGameActive(false)}
            className="absolute top-4 left-4 z-10 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm"
          >
            ← MENY
          </button>
          <SimpleGame />
        </div>
      )}
    </div>
  );
};

// Definiera route i TanStack Router
export const Route = createFileRoute('/pacman')({
  component: ArcadeApp,
});

export default ArcadeApp;
