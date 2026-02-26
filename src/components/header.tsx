// /components/header.tsx (minimal but complete, swap for something nicer later maybe)
"use client";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { MobileNav } from "@/components/mobile-nav";
import { Link, useLocation } from "@tanstack/react-router";

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Emulator", to: "/about" },
  { label: "idk", to: "/idk" },
] as const;

export function Header() {
  const scrolled = useScroll(10);
  const location = useLocation();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        scrolled && "border-border bg-background/95 backdrop-blur-sm",
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link
          to="/"
          className="rounded-md p-2 font-semibold hover:bg-muted"
        ></Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              size="sm"
              variant={location.pathname === link.to ? "outline" : "outline"}
              asChild
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
          <AnimatedThemeToggler h-4 />
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
