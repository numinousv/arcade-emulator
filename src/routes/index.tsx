import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GAMES } from "../config/games";
import { Emulator } from "../components/Emulator";
import { Button } from "@/components/ui/button";
// import CreepyButton from "@/components/ui/creepy-button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const game = GAMES.find((g) => g.id === selectedGame);

  return (
    <div className="m-2.5 flex items-center">
      <Button>Game Library</Button>

      {!game ? (
        <div className="w-full">
          {GAMES.map((g) => (
            //Was creepy button
            <Button
              key={g.id}
              onClick={() => setSelectedGame(g.id)}
              className="block w-full mb-2.5 p-4"
            >
              {g.name}
            </Button>
          ))}
        </div>
      ) : (
        <div className="w-full">
          //Was creepy button
          <Button onClick={() => setSelectedGame(null)} className="mb-2.5">
            ← Back
          </Button>
          <Button className="w-full">
            <Emulator romUrl={game.url} core={game.core} gameName={game.name} />
          </Button>
        </div>
      )}
    </div>
  );
}
