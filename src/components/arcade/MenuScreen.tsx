import { GameIcon } from './GameIcon'

interface MenuScreenProps {
  onPlay: (id: string) => void
}

export function MenuScreen({ onPlay }: MenuScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black">
      <h1 className="text-6xl font-black mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 italic">
        ARCADE_OS
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div 
          onClick={() => onPlay('space')}
          className="group cursor-pointer bg-gray-900 border-2 border-gray-800 hover:border-purple-500 p-8 rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          role="button"
          tabIndex={0}
        >
          <div className="mb-4 flex justify-between items-start">
            <GameIcon />
            <span className="text-xs bg-purple-900 text-purple-200 px-2 py-1 rounded">V.1.0</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">SPACE_SHOOTER</h2>
          <p className="text-gray-400 text-sm leading-relaxed">Försvara galaxen mot fallande trianglar. Klassisk arkad-action.</p>
          <div className="mt-6 flex items-center text-purple-500 font-bold text-sm uppercase tracking-widest">
            Spela nu <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </div>
      </div>
    </div>
  )
}