import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GAMES } from "../config/games";
import { Emulator } from "../components/Emulator";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const game = GAMES.find((g) => g.id === selectedGame);

  return (
    <div className="m-2.5 flex flex-col items-start gap-4">
      <Button>Game Library</Button>

      {!game ? (
        <div className="w-full space-y-2.5">
          {GAMES.map((g) => (
            <Button
              key={g.id}
              onClick={() => setSelectedGame(g.id)}
              className="block w-full p-4"
            >
              {g.name}
            </Button>
          ))}
        </div>
      ) : (
        <div className="w-full space-y-2.5">
          <Button onClick={() => setSelectedGame(null)} className="mb-2.5">
            ← Back
          </Button>
          <div className="w-full">
            <Emulator romUrl={game.url} core={game.core} gameName={game.name} />
          </div>
        </div>
      )}
    </div>
  );
}
