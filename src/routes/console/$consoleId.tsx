/*// src/routes/console/$consoleId.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { MoveLeftIcon } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { CONSOLES } from "@/config/consoles";
import { Button8 } from "@/components/ui/8bit/button";
import { useGameStore } from "@/stores/gameStore";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

// lazy load for the emulator
const Emulator = lazy(() =>
  import("@/components/Emulator").then((module) => ({
    default: module.Emulator,
  }))
);

export const Route = createFileRoute("/console/$consoleId")({
  component: ConsolePage,
});

export function ConsolePage() {
  const { consoleId } = Route.useParams();
  const { selectedGameId, setSelectedGame, addRecentGame } = useGameStore();

  const [ratings, setRatings] = useState<{ [key: string]: number }>(() => {
    const stored = localStorage.getItem("game-ratings");
    return stored ? JSON.parse(stored) : {};
  });

  const rateGame = (gameId: string, value: number) => {
    const updated = { ...ratings, [gameId]: value };
    setRatings(updated);
    localStorage.setItem("game-ratings", JSON.stringify(updated));
  };

  const consoleData = CONSOLES.find((c) => c.id === consoleId);
  const game = consoleData?.games.find((g) => g.id === selectedGameId);

  const handleGameSelect = (id: string) => {
    setSelectedGame(id);
    addRecentGame(id);
  };

  if (!consoleData) {
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
          <div>
            <div className="flex items-center gap-4 mb-8 text-muted-foreground">
              <Link to="/console">
                <Button8
                  variant="outline"
                  className="flex items-center text-muted-foreground mx-auto"
                  aria-label="Back to all consoles"
                >
                  <MoveLeftIcon className="h-4 w-4 text-muted-foreground" /> All Consoles
                </Button8>
              </Link>

              <div>
                <h1 className="text-2xl font-bold text-orange-300 retro">
                  {consoleData.name}
                </h1>
                <p className="text-muted-foreground text-lg">{consoleData.description}</p>
              </div>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              role="grid"
              aria-label={`${consoleData.name} games`}
            >
              {consoleData.games.map((g) => (
                <Card
                  key={g.id}
                  className={`relative overflow-hidden cursor-pointer group border-2 hover:border-primary transition-all bg-gradient-to-br ${consoleData.color}`}
                  onClick={() => handleGameSelect(g.id)}
                >
                  <CardHeader>
                    <CardTitle>{g.name}</CardTitle>
                    <CardDescription>{g.core}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                      {g.description || "Click to play"}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          onClick={(e) => {
                            e.stopPropagation();
                            rateGame(g.id, n);
                          }}
                          className={`cursor-pointer text-xl ${
                            n <= (ratings[g.id] || 0) ? "text-yellow-400" : "text-gray-600"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-7xl mx-auto">
            <div className="w-full mb-4 flex items-center gap-4">
              <Button8
                variant="outline"
                onClick={() => setSelectedGame(null)}
                className="flex items-center text-muted-foreground mx-auto"
                aria-label={`Back to ${consoleData.name} games`}
              >
                <MoveLeftIcon className="h-4 w-4" /> Back to {consoleData.name} Games
              </Button8>
            </div>

            <Suspense
              fallback={
                <div
                  className="w-full bg-black/20 rounded-lg p-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="animate-pulse bg-linear-to-r">Loading emulator...</div>
                </div>
              }
            >
              <div className="w-full bg-black/20 rounded-lg p-4">
                <Emulator romUrl={game.url} core={game.core} gameName={game.name} />
              </div>
            </Suspense>
          </div>
        )}
      </motion.div>
    </div>
  );
}*/







// src/routes/console/$consoleId.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { MoveLeftIcon } from "lucide-react";
import { CONSOLES } from "@/config/consoles";
import { Button8 } from "@/components/ui/8bit/button";
import { useGameStore } from "@/stores/gameStore";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";

// Lazy load for the emulator
const Emulator = lazy(() =>
  import("@/components/Emulator").then((module) => ({
    default: module.Emulator,
  }))
);

export const Route = createFileRoute("/console/$consoleId")({
  component: ConsolePage,
});

export function ConsolePage() {
  const { consoleId } = Route.useParams();
  const { selectedGameId, setSelectedGame, addRecentGame } = useGameStore();

  const [ratings, setRatings] = useState<{ [key: string]: number }>(() => {
    const stored = localStorage.getItem("game-ratings");
    return stored ? JSON.parse(stored) : {};
  });

  const rateGame = (gameId: string, value: number) => {
    const updated = { ...ratings, [gameId]: value };
    setRatings(updated);
    localStorage.setItem("game-ratings", JSON.stringify(updated));
  };

  const consoleData = CONSOLES.find((c) => c.id === consoleId);
  const game = consoleData?.games.find((g) => g.id === selectedGameId);

  const handleGameSelect = (id: string) => {
    setSelectedGame(id);
    addRecentGame(id);
  };

  if (!consoleData) {
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
          <div>
            {/* Game selection view */}
            <div className="flex items-center gap-4 mb-8 text-muted-foreground">
              <Link to="/console">
                <Button8
                  variant="outline"
                  className="flex items-center text-muted-foreground mx-auto"
                  aria-label="Back to all consoles"
                >
                  <MoveLeftIcon className="h-4 w-4 text-muted-foreground" /> All Consoles
                </Button8>
              </Link>

              <div>
                <h1 className="text-2xl font-bold text-orange-300 retro">{consoleData.name}</h1>
                <p className="text-muted-foreground text-lg">{consoleData.description}</p>
              </div>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              role="grid"
              aria-label={`${consoleData.name} games`}
            >
              {consoleData.games.map((g) => (
                <Card
                  key={g.id}
                  className={`relative overflow-hidden cursor-pointer group border-2 hover:border-primary transition-all bg-gradient-to-br ${consoleData.color}`}
                  onClick={() => handleGameSelect(g.id)}
                >
                  <CardHeader>
                    <CardTitle>{g.name}</CardTitle>
                    <CardDescription>{g.core}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                      {g.description || "Click to play"}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          onClick={(e) => {
                            e.stopPropagation();
                            rateGame(g.id, n);
                          }}
                          className={`cursor-pointer text-xl ${
                            n <= (ratings[g.id] || 0) ? "text-yellow-400" : "text-gray-600"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-7xl mx-auto">
            {/* Game play view */}
            <div className="w-full mb-4 flex items-center gap-4">
              <Button8
                variant="outline"
                onClick={() => setSelectedGame(null)}
                className="flex items-center text-muted-foreground mx-auto"
                aria-label={`Back to ${consoleData.name} games`}
              >
                <MoveLeftIcon className="h-4 w-4" /> Back to {consoleData.name} Games
              </Button8>
            </div>

            <Suspense
              fallback={
                <div
                  className="w-full bg-black/20 rounded-lg p-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="animate-pulse bg-linear-to-r">Loading emulator...</div>
                </div>
              }
            >
              <div className="w-full bg-black/20 rounded-lg p-4">
                <Emulator romUrl={game.url} core={game.core} gameName={game.name} />
              </div>
            </Suspense>
          </div>
        )}
      </motion.div>
    </div>
  );
}