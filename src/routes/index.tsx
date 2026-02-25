import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MoveLeftIcon } from "lucide-react";
import { GameLibrary } from "@/components/GameLibrary";
import { GAMES } from "../config/games";
import { Emulator } from "../components/Emulator";
import { Button } from "@/components/ui/button";
import AnimatedButton from "@/components/ui/animated-button";
// {
//   Component: HomePage;
// }
export const Route = createFileRoute("/")({
  component: HomePage,
});
function HomePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const game = GAMES.find((g) => g.id === selectedGame);

  return (
    <div className="m-4 flex flex-col items-start gap-4">
      <Button variant="outline">Game Library</Button>

      {!game ? (
        <div className="m-10 flex items-center justify-center h-screen">
          {GAMES.map((g) => (
            <AnimatedButton
              className="flex items-center"
              key={g.id}
              onClick={() => setSelectedGame(g.id)}
            >
              {g.name}
            </AnimatedButton>
          ))}
        </div>
      ) : (
        <div className="m-10 flex items-center">
          <AnimatedButton
            onClick={() => setSelectedGame(null)}
            className="flex items-center"
          >
            {" "}
          </AnimatedButton>
          <MoveLeftIcon>← Back</MoveLeftIcon>
          <div className="w-full">
            <Emulator romUrl={game.url} core={game.core} gameName={game.name} />
          </div>
        </div>
      )}
    </div>
  );
}
