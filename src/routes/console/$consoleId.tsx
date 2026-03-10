import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { MoveLeftIcon } from "lucide-react";
import { CONSOLES } from "@/config/consoles";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Button8 } from "@/components/ui/8bit/button";

// lazy load for the emulator
const Emulator = lazy(() =>
  import("@/components/Emulator").then((module) => ({
    default: module.Emulator,
  })),
);

export const Route = createFileRoute("/console/$consoleId")({
  component: ConsolePage,
});

// Memoized Game Card component
const GameCard = memo(
  ({
    game,
    onSelect,
    color,
  }: {
    game: any;
    onSelect: (id: string) => void;
    color: string;
  }) => (
    <Card
      key={game.id}
      aria-
      className={`
      relative overflow-hidden cursor-pointer group
      border-2 hover:border-primary transition-all
      bg-linear-to-br w-full max-w-6xl mx-auto ${color}
    `}
      onClick={() => onSelect(game.id)}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && onSelect(game.id)
      }
      tabIndex={0}
      role="button"
      aria-label={`Play ${game.name} on ${game.core}`}
    >
      <CardHeader>
        <CardTitle className="text-lg">{game.name}</CardTitle>
        <CardDescription>{game.core}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          {game.description || "Click to play"}
        </p>
      </CardContent>
    </Card>
  ),
);

GameCard.displayName = "GameCard";

function ConsolePage() {
  const { consoleId } = Route.useParams();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const console = CONSOLES.find((c) => c.id === consoleId);
  const game = console?.games.find((g) => g.id === selectedGame);

  if (!console) {
    return (
      <div className="relative min-h-screen w-full">
        <Particles
          className="absolute inset-0"
          color="#666666"
          ease={20}
          quantity={120}
        />
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
      <Particles
        className="absolute inset-0"
        color="#666666"
        ease={20}
        quantity={120}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 container mx-auto px-4 pt-24 pb-8"
      >
        {!game ? (
          // game selec view
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Link to="/console">
                <Button8
                  variant="outline"
                  className="flex items-center text-muted-foreground mx-auto"
                  aria-label="Back to all consoles"
                >
                  <MoveLeftIcon className="h-4 w-4 border-t-foreground" /> All
                  Consoles
                </Button8>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-orange-300">
                  {console.name}
                </h1>
                <p className="text-muted-foreground text-sm">
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
                  onSelect={setSelectedGame}
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
              <h2 className="text-muted-foreground max-w-2xl mx-auto">
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
                  <div className="animate-pulse text-muted-foreground">
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
