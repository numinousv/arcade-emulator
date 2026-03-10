// /src/components/pacman/MenuScreen.tsx
interface MenuScreenProps {
  onPlay: () => void;
}

export const MenuScreen = ({ onPlay }: MenuScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-black">
      <h1 className="text-6xl font-black text-purple-500">PAC-MAN</h1>
      <button onClick={onPlay} className="mt-10 bg-purple-600 px-4 py-2 rounded">
        Start Game
      </button>
    </div>
  );
};
