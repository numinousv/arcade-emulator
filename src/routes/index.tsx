// routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { GameLibrary } from "../components/GameLibrary";
import { EmulatorContainer } from "../components/EmulatorContainer";
import { useGameStore } from "../stores/gameStore";
import { AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { isPlaying } = useGameStore();

  return (
    <>
      <GameLibrary />
      <AnimatePresence>{isPlaying && <EmulatorContainer />}</AnimatePresence>
    </>
  );
}
