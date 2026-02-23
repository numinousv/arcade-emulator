// components/EmulatorContainer.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../stores/gameStore";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";

export function EmulatorContainer() {
  const { selectedGame, stopGame, setEmulatorReady, isFullscreen } =
    useGameStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!selectedGame) return;

    const loadEmulator = async () => {
      try {
        setStatus("loading");

        // Fetch ROM
        const response = await fetch(selectedGame.url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const arrayBuffer = await response.arrayBuffer();
        console.log("ROM loaded:", arrayBuffer.byteLength, "bytes");

        // Create blob URL
        const blob = new Blob([arrayBuffer], {
          type: "application/octet-stream",
        });
        const objectUrl = URL.createObjectURL(blob);

        // Set EmulatorJS globals
        window.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
        window.EJS_gameUrl = objectUrl;
        window.EJS_core = selectedGame.core;
        window.EJS_player = "#game";
        window.EJS_gameName = selectedGame.name;
        window.EJS_startOnLoaded = true;
        window.EJS_disableAutoLang = true;
        window.EJS_language = "en-US";
        window.EJS_cheats = [];

        // Inject script
        const script = document.createElement("script");
        script.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
        script.async = true;

        script.onload = () => {
          setStatus("ready");
          setEmulatorReady(true);
        };

        script.onerror = () => {
          setStatus("error");
          setErrorMsg("Failed to load emulator");
        };

        document.body.appendChild(script);
      } catch (err) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      }
    };

    loadEmulator();
  }, [selectedGame, setEmulatorReady]);

  if (!selectedGame) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed inset-0 z-40 bg-black flex items-center justify-center p-4 ${
        isFullscreen ? "p-0" : ""
      }`}
    >
      {/* Back button */}
      <Button
        variant="outline"
        size="sm"
        onClick={stopGame}
        className="absolute top-4 left-4 z-50 bg-background/80 backdrop-blur"
      >
        ← Back to Library
      </Button>

      {/* Loading state */}
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="h-12 w-12 animate-spin" />
          <p className="text-lg">Loading {selectedGame.name}...</p>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div className="flex flex-col items-center gap-4 text-red-500">
          <AlertCircle className="h-12 w-12" />
          <p>Error: {errorMsg}</p>
          <Button onClick={stopGame} variant="outline">
            Go Back
          </Button>
        </div>
      )}

      {/* Emulator container with fixed aspect ratio */}
      {status === "ready" && (
        <div
          ref={containerRef}
          className={`relative bg-black rounded-lg overflow-hidden shadow-2xl ${
            isFullscreen ? "w-full h-full" : "w-full max-w-5xl aspect-[4/3]"
          }`}
        >
          <div
            id="game"
            className="w-full h-full"
            style={{
              imageRendering: "pixelated",
              // Force 4:3 aspect ratio for retro games
              aspectRatio: "4/3",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
