import { memo } from "react";
import { Game } from "@/types/game";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GameCardProps {
  game: Game;
  onSelect: (id: string) => void;
  color?: string;
}
//memoization for optimization moved from consoleId to components
export const GameCard = memo(
  ({ game, onSelect, color = "" }: GameCardProps) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(game.id);
      }
    };

    return (
      <Card
        className={`
        relative overflow-hidden cursor-pointer group
        border-2 hover:border-primary transition-all
        bg-linear-to-br w-full max-w-6xl mx-auto ${color}
      `}
        onClick={() => onSelect(game.id)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Play ${game.name} on ${game.core}`}
      >
        <CardHeader>
          <CardTitle className="text-lg">{game.name}</CardTitle>
          <CardDescription>{game.core}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {game.description || "Click to play!"}
          </p>
        </CardContent>
      </Card>
    );
  },
);

GameCard.displayName = "GameCard";
