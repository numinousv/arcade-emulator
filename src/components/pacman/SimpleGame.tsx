// /src/components/pacman/SimpleGame.tsx
import React from "react";
import { usePacmanLogic } from "./pacmanLogic";

export const SimpleGame = () => {
  const { board, score, pacmanPosition, movePacman, resetGame } = usePacmanLogic();

  return (
    <div className="flex flex-col items-center">
      <h2>Score: {score}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${board.length}, 30px)`,
          gap: "2px",
        }}
      >
        {board.flat().map((cell, index) => (
          <div
            key={index}
            style={{
              width: 30,
              height: 30,
              background: (pacmanPosition.x === index % board.length && pacmanPosition.y === Math.floor(index / board.length))
                ? "yellow"
                : "#eee",
              border: "1px solid #ccc",
            }}
          />
        ))}
      </div>
      <div>
        <button onClick={() => movePacman('up')}>Up</button>
        <button onClick={() => movePacman('down')}>Down</button>
        <button onClick={() => movePacman('left')}>Left</button>
        <button onClick={() => movePacman('right')}>Right</button>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};
