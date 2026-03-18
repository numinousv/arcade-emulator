import { useState } from 'react'
import { GameIcon } from '../assets/GameIcon'
import { Leaderboard } from './Leaderboard'

interface MenuScreenProps {
  onPlay: (id: string) => void
}

export function MenuScreen({ onPlay }: MenuScreenProps) {
  const [showRules, setShowRules] = useState(false)

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black relative">
      <h1 className="text-6xl font-black mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 italic">
        ARCADE_OS
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="flex flex-col gap-4">
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

          <button 
            onClick={() => setShowRules(true)}
            className="border border-purple-500 text-purple-400 py-2 rounded-lg hover:bg-purple-900/50 transition-colors"
          >
            Hur spelar man?
          </button>
        </div>

        <Leaderboard />
      </div>

      {showRules && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-purple-500 p-8 rounded-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Spelregler</h2>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Använd <strong>Musen</strong> för att klicka på de lila rutorna så snabbt du kan.</li>
              <li>För tangentbord: Tryck <strong>Tab</strong> för att sikta och <strong>Enter/Space</strong> för att skjuta.</li>
              <li>Du har 30 sekunder på dig att samla så många poäng som möjligt!</li>
            </ul>
            <button 
              onClick={() => setShowRules(false)}
              className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-500"
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}