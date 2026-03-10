import { useState, useEffect } from "react";

const BOARD_SIZE = 10;

// Skapa spelbrädet
export const createBoard = () => {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
};

export const usePacmanLogic = () => {
  const [board, setBoard] = useState(createBoard());
  const [score, setScore] = useState(0);
  const [pacmanPosition, setPacmanPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [ghostPosition, setGhostPosition] = useState<{ x: number, y: number }>({ x: 5, y: 5 }); // Spökets startposition
  
  // Initiera hinder
  useEffect(() => {
    const initialBoard = createBoard();
    
    // Lägg till hinder
    initialBoard[2][2] = -1; // -1 representerar ett hinder
    initialBoard[3][5] = -1; // fler hinder kan läggas till
    initialBoard[6][1] = -1;

    setBoard(initialBoard);
  }, []);

  const movePacman = (direction: string) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.slice());
      let newX = pacmanPosition.x;
      let newY = pacmanPosition.y;

      switch (direction) {
        case 'up':
          if (pacmanPosition.y > 0) newY -= 1;
          break;
        case 'down':
          if (pacmanPosition.y < BOARD_SIZE - 1) newY += 1;
          break;
        case 'left':
          if (pacmanPosition.x > 0) newX -= 1;
          break;
        case 'right':
          if (pacmanPosition.x < BOARD_SIZE - 1) newX += 1;
          break;
      }

      // Kontrollera om nästa position är en vägg
      if (newBoard[newY][newX] === -1) {
        // Om det är ett hinder, flytta inte
        return prevBoard;
      }

      // Samla poäng om Pac-Man går till en matpunkt
      if (newBoard[newY][newX] === 0) {
        newBoard[newY][newX] = 1; // 1 representerar en matpunkt
        setScore((prevScore) => prevScore + 1);
      }

      setPacmanPosition({ x: newX, y: newY });
      return newBoard;
    });
  };

  const resetGame = () => {
    setBoard(createBoard());
    setScore(0);
    setPacmanPosition({ x: 0, y: 0 });
    setGhostPosition({ x: 5, y: 5 }); // Återställ spökets position
  };

  const moveGhost = () => {
    // Enkel logik för att flytta spöket
    setInterval(() => {
      setGhostPosition((prevGhost) => {
        let newX = prevGhost.x + (Math.random() < 0.5 ? -1 : 1);
        let newY = prevGhost.y + (Math.random() < 0.5 ? -1 : 1);

        // Hålla spöket inom gränserna
        newX = Math.max(0, Math.min(BOARD_SIZE - 1, newX));
        newY = Math.max(0, Math.min(BOARD_SIZE - 1, newY));

        return { x: newX, y: newY };
      });
    }, 1000); // Spöket flyttar sig varje sekund
  };

  useEffect(() => {
    moveGhost();
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
