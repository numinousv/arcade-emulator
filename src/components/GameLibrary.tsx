import { useState } from "react";
import { GAMES } from "../config/games";
import { useGameStore } from "../stores/gameStore";
import { Game } from "../types/game";

export const GameLibrary = () => {
  const [search, setSearch] = useState("");
  const { selectGame } = useGameStore();
  // (game) =>
  const filteredGames = GAMES.filter((game) => {
    game.name.toLowerCase().includes(search.toLowerCase()) || "";
  });

  return (
    <div className="p-5 max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎮 Retro Game Library</h1>

      <input
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 text-base mb-5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} onSelect={selectGame} />
        ))}
      </div>
    </div>
  );
};

const GameCard = ({
  game,
  onSelect,
}: {
  game: Game;
  onSelect: (g: Game) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(game)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border-2 border-gray-700 rounded-xl p-4 cursor-pointer bg-[#1a1a1a] text-white transition-all duration-200"
      style={{
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered ? "0 10px 20px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {game.cover ? (
        <img
          src={game.cover}
          alt={game.name}
          className="w-full h-[150px] object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-[150px] bg-gray-700 flex items-center justify-center rounded-lg">
          No Cover
        </div>
      )}

      <h3 className="my-2 text-base font-medium">{game.name}</h3>
      <p className="m-0 text-gray-500 text-xs uppercase tracking-wide">
        {game.core}
      </p>
      {game.description && (
        <p className="mt-1 text-xs text-gray-400 line-clamp-2">
          {game.description}
        </p>
      )}
    </div>
  );
};
