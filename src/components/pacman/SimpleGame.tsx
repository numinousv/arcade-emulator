import { useEffect } from "react";
import { usePacmanLogic } from "./pacmanLogic";
import { Button } from "@/components/ui/button";

export const SimpleGame = () => {
  const { board, score, pacmanPosition, ghostPosition, movePacman, resetGame } =
    usePacmanLogic();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") movePacman("up");
      if (e.key === "ArrowDown") movePacman("down");
      if (e.key === "ArrowLeft") movePacman("left");
      if (e.key === "ArrowRight") movePacman("right");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Instruktion för skärmläsare */}
      <p className="sr-only">
        Use arrow keys to move Pac-Man around the board and collect pellets.
        Avoid the ghost.
      </p>

      {/* Score */}
      <h2
        className="text-xl font-bold"
        aria-live="polite"
        aria-label={`Current score ${score}`}
      >
        Score: {score}
      </h2>

      {/* Game board */}
      <div
        className="bg-black p-2"
        role="grid"
        aria-label="Pac-Man game board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${board.length}, 32px)`,
          gap: "2px",
        }}
      >
        {board.flat().map((cell, index) => {
          const x = index % board.length;
          const y = Math.floor(index / board.length);

          const isPacman = pacmanPosition.x === x && pacmanPosition.y === y;

          const isGhost = ghostPosition.x === x && ghostPosition.y === y;

          let label = "Empty space";

          if (cell === -1) label = "Wall";
          if (cell === 0) label = "Pellet";
          if (isPacman) label = "Pac-Man";
          if (isGhost) label = "Ghost";

          return (
            <div
              key={index}
              role="gridcell"
              aria-label={`Row ${y + 1} column ${x + 1}: ${label}`}
              className="w-8 h-8 flex items-center justify-center"
              style={{
                background: cell === -1 ? "#1e3a8a" : "black",
              }}
            >
              {isPacman && (
                <div className="w-6 h-6 bg-yellow-400 rounded-full" />
              )}

              {isGhost && <div className="w-6 h-6 bg-red-500 rounded-full" />}

              {!isPacman && !isGhost && cell === 0 && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex gap-2" aria-label="Movement controls">
        <Button onClick={() => movePacman("up")} aria-label="Move Pac-Man up">
          ↑
        </Button>

        <Button
          onClick={() => movePacman("down")}
          aria-label="Move Pac-Man down"
        >
          ↓
        </Button>

        <Button
          onClick={() => movePacman("left")}
          aria-label="Move Pac-Man left"
        >
          ←
        </Button>

        <Button
          onClick={() => movePacman("right")}
          aria-label="Move Pac-Man right"
        >
          →
        </Button>

        <Button
          variant="outline"
          onClick={resetGame}
          aria-label="Reset the Pac-Man game"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
