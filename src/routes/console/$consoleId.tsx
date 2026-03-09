import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { MoveLeftIcon } from "lucide-react";
import { CONSOLES } from "@/config/consoles";
import { Emulator } from "@/components/Emulator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Button8 } from "@/components/ui/8bit/button";

export const Route = createFileRoute("/console/$consoleId")({
  component: ConsolePage,
});

function ConsolePage() {
  // ts automatically knows consoleId is a string, routeparams
  const { consoleId } = Route.useParams();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const console = CONSOLES.find((c) => c.id === consoleId);
  const game = console?.games.find((g) => g.id === selectedGame);

  if (!console) {
    return <div>Console not found</div>;
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
          // game selec
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Link to="/console/idk">
                <Button8
                  variant="outline"
                  className="flex items-center text-muted-foreground mx-auto"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {console.games.map((g) => (
                <Card
                  key={g.id}
                  className={`
                  relative overflow-hidden cursor-pointer group
                  border-2 hover:border-primary transition-all
                  bg-gradient-to-br w-full max-w-6xl mx-auto ${console.color}
                `}
                  onClick={() => setSelectedGame(g.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{g.name}</CardTitle>
                    <CardDescription>{g.core}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                      {g.description || "Click to play"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Game Play View */
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <div className="w-full mb-4 flex items-center gap-4">
              <Button8
                variant="outline"
                onClick={() => setSelectedGame(null)}
                className="flex items-center text-muted-foreground mx-auto"
              >
                <MoveLeftIcon className="h-4 w-4" /> Back to {console.name}{" "}
                Games
              </Button8>
              <h2 className="text-muted-foreground max-w-2xl mx-auto">
                Now Playing: {game.name}
              </h2>
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
