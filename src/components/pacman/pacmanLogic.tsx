import { useState, useEffect } from "react";

const BOARD_SIZE = 12;

export const createBoard = () => {
  const board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(0)
  );

  // Väggar
  board[2][2] = -1;
  board[2][3] = -1;
  board[2][4] = -1;

  board[5][5] = -1;
  board[6][5] = -1;

  board[7][2] = -1;
  board[8][2] = -1;

  return board;
};

export const usePacmanLogic = () => {
  const [board, setBoard] = useState(createBoard());
  const [score, setScore] = useState(0);

  const [pacmanPosition, setPacmanPosition] = useState({
    x: 1,
    y: 1,
  });

  const [ghostPosition, setGhostPosition] = useState({
    x: 9,
    y: 9,
  });

  const movePacman = (direction: string) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.slice());

      let newX = pacmanPosition.x;
      let newY = pacmanPosition.y;

      switch (direction) {
        case "up":
          newY -= 1;
          break;
        case "down":
          newY += 1;
          break;
        case "left":
          newX -= 1;
          break;
        case "right":
          newX += 1;
          break;
      }

      // hålla inom board
      if (newX < 0 || newY < 0 || newX >= BOARD_SIZE || newY >= BOARD_SIZE)
        return prevBoard;

      // vägg
      if (newBoard[newY][newX] === -1) return prevBoard;

      // pellet
      if (newBoard[newY][newX] === 0) {
        newBoard[newY][newX] = 1;
        setScore((s) => s + 1);
      }

      setPacmanPosition({ x: newX, y: newY });

      return newBoard;
    });
  };

  const resetGame = () => {
    setBoard(createBoard());
    setScore(0);

    setPacmanPosition({
      x: 1,
      y: 1,
    });

    setGhostPosition({
      x: 9,
      y: 9,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGhostPosition((prev) => {
        let newX = prev.x + (Math.random() < 0.5 ? -1 : 1);
        let newY = prev.y + (Math.random() < 0.5 ? -1 : 1);

        newX = Math.max(0, Math.min(BOARD_SIZE - 1, newX));
        newY = Math.max(0, Math.min(BOARD_SIZE - 1, newY));

        return { x: newX, y: newY };
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return {
    board,
    score,
    pacmanPosition,
    ghostPosition,
    movePacman,
    resetGame,
  };
};