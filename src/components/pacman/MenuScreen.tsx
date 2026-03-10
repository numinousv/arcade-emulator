import { Button } from "@/components/ui/button";

interface MenuScreenProps {
  onPlay: () => void;
}

export const MenuScreen = ({ onPlay }: MenuScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-black gap-8">
      <h1 className="text-6xl font-black text-yellow-400 tracking-widest">
        PAC-MAN
      </h1>

      <Button size="lg" onClick={onPlay}>
        Start Game
      </Button>
    </div>
  );
};