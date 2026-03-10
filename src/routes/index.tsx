// /src/routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Button8 } from "@/components/ui/8bit/button";
import { CONSOLES } from "../config/consoles";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      <Particles
        className="absolute inset-0"
        color="#666666"
        ease={20}
        quantity={120}
      />

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl">
          {/* hero */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              RETRO ARCADE
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Dive into a collection of classic games from your favorite retro
              consoles. No downloads, no setup—just click and play.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button8
                size="lg"
                className="px-8 py-6 text-lg bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-400"
                asChild
              >
                <Link to="/console">🎮 Launch Emulator</Link>
              </Button8>

              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-2 text-muted-foreground"
                asChild
              >
                <Link to="/arcade">🕹️ Arcade Mode</Link>
              </Button>

              <Button
                size="icon"
                variant="outline"
                className="rounded-full h-14 w-14 border-2"
                asChild
              >
                <a
                  href="https://github.com/numinousv/arcade-emulator"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source on GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-muted-foreground border-b pb-2">
              Available Consoles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONSOLES.map((console) => (
                <Link
                  key={console.id}
                  to="/console/$consoleId"
                  params={{ consoleId: console.id }}
                  className="block"
                >
                  <div className="border-2 border-border text-muted-foreground rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1 bg-card">
                    <div className="text-4xl mb-3">{console.icon}</div>
                    <h3 className="text-xl font-semibold text-muted-foreground mb-1">
                      {console.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {console.games?.length || 0} games
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {console.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
