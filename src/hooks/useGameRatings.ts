import { useState, useEffect } from "react";

const KEY = "game-ratings";

// Load ratings from localStorage
function getStoredRatings(): Record<string, number> {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : {};
}

// Hook to manage game ratings
export function useGameRatings() {
  const [ratings, setRatings] = useState<Record<string, number>>(getStoredRatings());

  const rateGame = (gameId: string, value: number) => {
    const updated = { ...ratings, [gameId]: value };
    setRatings(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  return { ratings, rateGame };
}