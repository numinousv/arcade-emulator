import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { MoveLeftIcon } from "lucide-react";
import { GAMES } from "../config/games";
import { Emulator } from "../components/Emulator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Button8 } from "@/components/ui/8bit/button";
export const Route = createFileRoute("/emupage")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const game = GAMES.find((g) => g.id === selectedGame);

  return (
    <div className="relative min-h-screen w-full">
      <Particles
        className="absolute inset-0"
        color="#666666"
        ease={20}
        quantity={120}
      />
      {/* Content - centered with padding for header */}
      <motion.div
        initial={{ opacity: 0 }} // start invisible
        animate={{ opacity: 1 }} // fade in
        transition={{ duration: 1 }} // duration
        className="relative z-10 container mx-auto px-4 pt-24 pb-8"
      >
        {!game ? (
          /* Game Selection View */
          <motion.div className="flex flex-col items-center justify-center">
            <Button8 className="text-2xl font-bold mb-8 text-center">
              Select a Game
            </Button8>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {GAMES.map((g) => (
                <Card
                  key={g.id}
                  className="w-full cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedGame(g.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{g.name}</CardTitle>
                    <CardDescription>{g.core}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {g.description || "Click to play"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Game Play View */
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <div className="w-full mb-4 flex items-center gap-4">
              <Button8
                variant="outline"
                onClick={() => setSelectedGame(null)}
                className="flex items-center gap-2"
              >
                <MoveLeftIcon className="h-4 w-4" /> Back to Library
              </Button8>
              <Button variant="default">
                <h2 className="text-xl font-semibold flex-1 text-center">
                  Now Playing: {game.name}
                </h2>
              </Button>
            </div>

            <div className="w-full bg-black/20 rounded-lg p-4">
              <Emulator
                romUrl={game.url}
                core={game.core}
                gameName={game.name}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
