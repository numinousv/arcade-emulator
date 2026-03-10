import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { MenuScreen } from "../components/pacman/MenuScreen";
import { SimpleGame } from "../components/pacman/SimpleGame";

import { Button } from "@/components/ui/button";

const ArcadeApp = () => {
  const [gameActive, setGameActive] = useState(false);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col">
      {!gameActive ? (
        <MenuScreen onPlay={() => setGameActive(true)} />
      ) : (
        <div className="flex-1 relative">
          <Button
            variant="outline"
            className="absolute top-4 left-4 z-10"
            onClick={() => setGameActive(false)}
          >
            ← Menu
          </Button>

          <SimpleGame />
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute("/pacman")({
  component: ArcadeApp,
});

export default ArcadeApp;