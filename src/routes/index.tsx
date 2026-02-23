import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GAMES } from "../config/games";
import { Emulator } from "../components/Emulator";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const game = GAMES.find((g) => g.id === selectedGame);

  return (
    <div style={{ padding: 20 }}>
      <h1>Game Library</h1>

      {!game ? (
        <div>
          {GAMES.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGame(g.id)}
              style={{
                display: "block",
                padding: 15,
                marginBottom: 10,
                width: "100%",
              }}
            >
              {g.name}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedGame(null)}>← Back</button>
          <Emulator romUrl={game.url} core={game.core} gameName={game.name} />
        </div>
      )}
    </div>
  );
}
