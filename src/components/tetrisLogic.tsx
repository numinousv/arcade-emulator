import { useState, useEffect } from "react";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const createBoard = () => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(0)
  );
};

export const useTetrisLogic = () => {
  const [board, setBoard] = useState(createBoard());
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const dropBlock = () => {
    // Placeholder for drop block logic
    const newBoard = [...board];
    // More logic needed here to actually move a block down, etc.
    setBoard(newBoard);
    setScore((prev) => prev + 10);
  };

  const resetGame = () => {
    setBoard(createBoard());
    setScore(0);
  };

  useEffect(() => {
    fetch("https://ch.tetr.io/api/users/lists/league/all")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data.data.users.slice(0, 5));
      })
      .catch((err) => console.error(err));
  }, []);

  return {
    board,
    score,
    leaderboard,
    dropBlock,
    resetGame,
  };
};
