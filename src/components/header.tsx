// /components/header.tsx
"use client";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { MobileNav } from "@/components/mobile-nav";
import { Link, useLocation } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const navLinks = [
  { label: <Home />, to: "/" },
  { label: "Emulator", to: "/console" },
  { label: "Arcade", to: "/arcade" },
  { label: "Pac-Man", to: "/pacman" },  // Lägger till Pac-Man-länken här
] as const;

export function Header() {
  const scrolled = useScroll(10);
  const location = useLocation();

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
        <div className="flex px-4 place-items-end" aria-label="Theme toggle">
          <AnimatedThemeToggler />
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
