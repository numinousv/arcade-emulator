
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MenuScreen } from '../components/arcade/MenuScreen'
import { SimpleGame } from '../components/arcade/SimpleGame'

export const Route = createFileRoute('/arcade')({
  component: ArcadeApp,
})

function ArcadeApp() {
  const [valtSpel, setValtSpel] = useState<string | null>(null)

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden font-mono flex flex-col">
      {!valtSpel ? (
        <MenuScreen onPlay={(id) => setValtSpel(id)} />
      ) : (
        <div className="relative flex-1">
          <button 
            onClick={() => setValtSpel(null)}
            className="absolute top-4 left-4 z-10 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm border border-gray-600 transition-colors"
          >
            ← MENY
          </button>
          <SimpleGame />
        </div>
      )}
    </div>
  )
}