import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { MoveLeftIcon } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { CONSOLES } from "@/config/consoles";
import { Button8 } from "@/components/ui/8bit/button";
import { useGameStore } from "@/stores/gameStore";

// lazy load for the emulator
const Emulator = lazy(() =>
  import("@/components/Emulator").then((module) => ({
    default: module.Emulator,
  })),
);

export const Route = createFileRoute("/console/$consoleId")({
  component: ConsolePage,
});

function ConsolePage() {
  const { consoleId } = Route.useParams();
  const { selectedGameId, setSelectedGame, addRecentGame } = useGameStore();

  const console = CONSOLES.find((c) => c.id === consoleId);
  const game = console?.games.find((g) => g.id === selectedGameId);

  const handleGameSelect = (id: string) => {
    setSelectedGame(id);
    addRecentGame(id);
  };

  if (!console) {
    return (
      <div className="relative min-h-screen w-full">
        <Particles className="absolute inset-0" quantity={120} />
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-8 text-center">
          <h1 className="text-2xl font-bold text-red-500">Console not found</h1>
          <Link to="/console" className="mt-4 inline-block">
            <Button8 variant="outline">Return to Consoles</Button8>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full">
      <Particles className="absolute inset-0" quantity={120} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 container mx-auto px-4 pt-24 pb-8"
      >
        {!game ? (
          // game selec view
          <div>
            <div className="flex items-center gap-4 mb-8 text-muted-foreground">
              <Link to="/console">
                <Button8
                  variant="outline"
                  className="flex items-center text-muted-foreground mx-auto"
                  aria-label="Back to all consoles"
                >
                  <MoveLeftIcon className="h-4 w-4 text-muted-foreground border-t-foreground" />{" "}
                  All Consoles
                </Button8>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-orange-300 retro">
                  {console.name}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {console.description}
                </p>
              </div>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              role="grid"
              aria-label={`${console.name} games`}
            >
              {console.games.map((g) => (
                <GameCard
                  key={g.id}
                  game={g}
                  onSelect={handleGameSelect}
                  color={console.color}
                />
              ))}
            </div>
          </div>
        ) : (
          /* suspense for gameplay view */
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <div className="w-full mb-4 flex items-center gap-4">
              <Button8
                variant="outline"
                onClick={() => setSelectedGame(null)}
                className="flex items-center text-muted-foreground mx-auto"
                aria-label={`Back to ${console.name} games`}
              >
                <MoveLeftIcon className="h-4 w-4" /> Back to {console.name}{" "}
                Games
              </Button8>
              <h2 className="text-amber-600 max-w-4xl mx-auto retro">
                Now Playing: {game.name}
              </h2>
            </div>

            <Suspense
              fallback={
                <div
                  className="w-full bg-black/20 rounded-lg p-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="animate-pulse bg-linear-to-r">
                    Loading emulator...
                  </div>
                </div>
              }
            >
              <div className="w-full bg-black/20 rounded-lg p-4">
                <Emulator
                  romUrl={game.url}
                  core={game.core}
                  gameName={game.name}
                />
              </div>
            </Suspense>
          </div>
        )}
      </motion.div>
    </div>
  );
}
