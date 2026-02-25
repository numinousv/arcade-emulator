import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GAMES } from "../config/games";
import { Emulator } from "../components/Emulator";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@components/ui/animated-button";
{ Component:any "HomePage";
};

function HomePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const game = GAMES.find((g) => g.id === selectedGame);

  return (
    <div className="m-2.5 flex flex-col items-start gap-4">
      <Button>Game Library</Button>

      {!game ? (
        <div className="m-2.5 flex bg-center">
          {GAMES.map((g) => (
            <AnimatedButton
              key={g.id}
              onClick={() => setSelectedGame(g.id)}
              className="m-2.5 flex bg-center"
            >
              {g.name}
            </AnimatedButton>
          ))}
        </div>
      ) : (
        <div className="m-2.5 flex bg-center">
          <AnimatedButton
            onClick={() => setSelectedGame(null)}
            className="w-full bg-center"
          >     </AnimatedButton>
            ← Back
          <div className="w-full">
            <Emulator romUrl={game.url} core={game.core} gameName={game.name} />
          </div>
        </div>
      )}
    </div>
  );
}
