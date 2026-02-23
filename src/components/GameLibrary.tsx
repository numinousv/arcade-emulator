import { useState } from "react";
import { GAMES } from "../config/games";
import { useGameStore } from "../stores/gameStore";
import { Game } from "../types/game";

export const GameLibrary = () => {
  const [search, setSearch] = useState("");
  const { selectGame } = useGameStore();

  const filteredGames = GAMES.filter(
    (game) =>
      game.name.toLowerCase().includes(search.toLowerCase()) ||
      game.tags?.some((tag) => tag.includes(search.toLowerCase())),
  );

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>🎮 Retro Game Library</h1>

      <input
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
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
}) => (
  <div
    onClick={() => onSelect(game)}
    style={{
      border: "2px solid #333",
      borderRadius: "12px",
      padding: "15px",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
      background: "#1a1a1a",
      color: "white",
      ":hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
      },
    }}
  >
    {game.cover ? (
      <img
        src={game.cover}
        alt={game.name}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    ) : (
      <div
        style={{
          width: "100%",
          height: "150px",
          background: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      >
        No Cover
      </div>
    )}

    <h3 style={{ margin: "10px 0 5px 0", fontSize: "16px" }}>{game.name}</h3>
    <p
      style={{
        margin: 0,
        color: "#888",
        fontSize: "12px",
        textTransform: "uppercase",
      }}
    >
      {game.core}
    </p>
    {game.description && (
      <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#aaa" }}>
        {game.description}
      </p>
    )}
  </div>
);
