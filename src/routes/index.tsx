//Please dont forget to make an 'import local ROM if server fails' button you forgetful donkey akram >:(
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Particles } from "@/components/ui/particles";
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
    <div className="relative w-full md:h-screen md:overflow-hidden">
      <Particles
        className="absolute inset-0"
        color="#666666"
        ease={20}
        quantity={120}
      />
      <div className="m-4 flex flex-col items-start gap-4">
        <Button variant="outline">Game Library</Button>

        {!game ? (
          <div className="m-10 flex items-center justify-center h-screen">
            {GAMES.map((g) => (
              <AnimatedButton
                className="h-9 px-4 py-2 px-3 flex items-center"
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
              <Emulator
                romUrl={game.url}
                core={game.core}
                gameName={game.name}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
