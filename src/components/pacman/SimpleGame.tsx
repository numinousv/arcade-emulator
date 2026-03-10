import React, { useEffect } from "react";
import { usePacmanLogic } from "./pacmanLogic";
import { Button } from "@/components/ui/button";

export const SimpleGame = () => {
  const {
    board,
    score,
    pacmanPosition,
    ghostPosition,
    movePacman,
    resetGame,
  } = usePacmanLogic();

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
      <h2 className="text-xl font-bold">Score: {score}</h2>

      <div
        className="bg-black p-2"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${board.length}, 32px)`,
          gap: "2px",
        }}
      >
        {board.flat().map((cell, index) => {
          const x = index % board.length;
          const y = Math.floor(index / board.length);

          const isPacman =
            pacmanPosition.x === x && pacmanPosition.y === y;

          const isGhost =
            ghostPosition.x === x && ghostPosition.y === y;

          return (
            <div
              key={index}
              className="w-8 h-8 flex items-center justify-center"
              style={{
                background: cell === -1 ? "#1e3a8a" : "black",
              }}
            >
              {isPacman && (
                <div className="w-6 h-6 bg-yellow-400 rounded-full" />
              )}

              {isGhost && (
                <div className="w-6 h-6 bg-red-500 rounded-full" />
              )}

              {!isPacman && !isGhost && cell === 0 && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => movePacman("up")}>↑</Button>
        <Button onClick={() => movePacman("down")}>↓</Button>
        <Button onClick={() => movePacman("left")}>←</Button>
        <Button onClick={() => movePacman("right")}>→</Button>
        <Button variant="outline" onClick={resetGame}>
          Reset
        </Button>
      </div>
    </div>
  );
};