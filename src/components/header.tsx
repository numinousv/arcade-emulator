"use client";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { MobileNav } from "@/components/mobile-nav";
import { Link, useLocation } from "@tanstack/react-router";
import { Home, Clock } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";
import { CONSOLES } from "@/config/consoles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const navLinks = [
  { label: <Home />, to: "/" },
  { label: "Emulator", to: "/console" },
  { label: "Arcade", to: "/arcade" },
  { label: "Pac-Man", to: "/pacman" }, // Lägger till Pac-Man-länken här
] as const;

export function Header() {
  const scrolled = useScroll(10);
  const location = useLocation();

  const { recentGames } = useGameStore();
  const getGameById = (id: string) => {
    // scan through all consoles' games
    for (const console of CONSOLES) {
      const game = console.games.find((g) => g.id === id);
      if (game) return game;
    }
    return null;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-gray-600/7 border-b transition-all",
        scrolled && "border-border bg-background/5 backdrop-blur-sm",
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link
          to="/"
          className="rounded-md p-2 font-semibold hover:bg-muted"
        ></Link>

        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.to}
              size="sm"
              variant={location.pathname === link.to ? "outline" : "outline"}
              asChild
              className="text-primary"
              aria-label={`Navigate to ${typeof link.label === "object" ? "home" : link.label} page`}
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
        </div>

        {recentGames.length > 0 && (
          //recentGames dropdown  for header idk testing
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground"
                aria-label="Recent games"
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="hidden sm:inline">Recent</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {recentGames.map((gameId) => {
                const game = getGameById(gameId);
                if (!game) return null;

                const console = CONSOLES.find((c) =>
                  c.games.some((g) => g.id === gameId),
                );

                return (
                  <DropdownMenuItem key={gameId} asChild>
                    <Link
                      to="/console/$consoleId"
                      params={{ consoleId: console?.id || "" }}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-lg">{console?.icon || "🎮"}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{game.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {game.core.toUpperCase()}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <div className="flex px-4 place-items-end" aria-label="Theme toggle">
          <AnimatedThemeToggler />
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
