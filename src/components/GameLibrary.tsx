// components/GameLibrary.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../stores/gameStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Gamepad2, Star } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function GameLibrary() {
  const { games, searchQuery, selectedCore, selectGame } = useGameStore();

  // Filter games
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCore = selectedCore ? game.core === selectedCore : true;
    return matchesSearch && matchesCore;
  });

  // Group by core for display
  const cores = [...new Set(games.map((g) => g.core))];

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      {/* Core filter chips */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Badge
          variant={selectedCore === null ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => useGameStore.getState().setSelectedCore(null)}
        >
          All
        </Badge>
        {cores.map((core) => (
          <Badge
            key={core}
            variant={selectedCore === core ? "default" : "secondary"}
            className="cursor-pointer uppercase"
            onClick={() => useGameStore.getState().setSelectedCore(core)}
          >
            {core}
          </Badge>
        ))}
      </div>

      {/* Game grid */}
      <ScrollArea className="h-[calc(100vh-200px)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <AnimatePresence>
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                variants={itemVariants}
                layout
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden bg-gradient-to-br from-card to-card/50 border-2 border-transparent hover:border-primary/50 transition-colors"
                  onClick={() => selectGame(game)}
                >
                  <CardContent className="p-0">
                    {/* Cover image */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      {game.cover ? (
                        <img
                          src={game.cover}
                          alt={game.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                          <Gamepad2 className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      )}

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1.1 }}
                          className="bg-primary text-primary-foreground rounded-full p-3"
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold truncate">{game.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs uppercase">
                          {game.core}
                        </Badge>
                        {game.description && (
                          <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                            {game.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </ScrollArea>
    </div>
  );
}
