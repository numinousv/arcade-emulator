import { createFileRoute } from "@tanstack/react-router";
import { useTetrisLogic } from "../components/tetrisLogic";
export const BOARD_WIDTH = 10; // This should be declared before it's used

const RouteComponent = () => {
  // Basic component implementation for the route
  const { board, score, leaderboard, dropBlock, resetGame } = useTetrisLogic();

  return (
    <div>
      <h1>Tetris</h1>
      <h2>Score: {score}</h2>

      <button onClick={dropBlock} aria-label="Drop block">
        Drop Block
      </button>

      <button onClick={resetGame} aria-label="Reset game">
        Reset
      </button>

      <h3>Game Board</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 30px)`,
          gap: "2px",
        }}
      >
        {board.flat().map((cell, index) => (
          <div
            key={index}
            style={{
              width: 30,
              height: 30,
              background: cell ? "purple" : "#eee",
              border: "1px solid #ccc",
            }}
          />
        ))}
      </div>

      <h3>Top Players (TETR.IO)</h3>
      <ul>
        {leaderboard.map((player) => (
          <li key={player._id}>{player.username}</li>
        ))}
      </ul>
    </div>
  );
};

export const Route = createFileRoute("/tetrisStart")({
  component: RouteComponent,
});

export default RouteComponent;
