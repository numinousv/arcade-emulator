import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useEffect, useRef } from 'react'

// Det här behövs för routingen
export const Route = createFileRoute('/')({
  component: ArcadeApp,
})

// --- IKONER (Enkla SVG:er) ---
const GameIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 12h4m-2-2v4m11-2h2m-2 0h-2" />
  </svg>
)

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

// --- HUVUDKOMPONENT ---
function ArcadeApp() {
  // State för att hålla koll på om vi spelar eller är i menyn
  const [valtSpel, setValtSpel] = useState<string | null>(null)

  return (
    // Låser skärmen så man inte kan scrolla (h-screen, overflow-hidden)
    <div className="h-screen w-screen bg-gray-900 text-white overflow-hidden flex flex-col font-sans">
      
      {valtSpel ? (
        // Om ett spel är valt, visa spelet
        <SimpleGame onBack={() => setValtSpel(null)} />
      ) : (
        // Annars visa menyn
        <MenuScreen onPlay={(id) => setValtSpel(id)} />
      )}
    
    </div>
  )
}

// --- MENYN ---
function MenuScreen({ onPlay }: { onPlay: (id: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 space-y-8">
      
      {/* Rubrik */}
      <div className="text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          ARCADE
        </h1>
        <p className="text-gray-400 mt-2 tracking-widest">VÄLJ DITT SPEL</p>
      </div>

      {/* Kort-container */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Spel 1 */}
        <div 
          onClick={() => onPlay('space')}
          className="cursor-pointer bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 hover:scale-105 transition-transform w-64 text-center"
        >
          <div className="bg-purple-900/50 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 text-purple-300">
            <GameIcon />
          </div>
          <h2 className="text-xl font-bold mb-2">SPACE SHOOTER</h2>
          <p className="text-sm text-gray-400">Skjut ner fienderna!</p>
          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full font-bold">
            SPELA
          </button>
        </div>

        {/* Spel 2 (Bara för syns skull, leder till samma spel i detta demo) */}
        <div 
          onClick={() => onPlay('race')}
          className="cursor-pointer bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 hover:scale-105 transition-transform w-64 text-center"
        >
          <div className="bg-blue-900/50 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 text-blue-300">
            <GameIcon />
          </div>
          <h2 className="text-xl font-bold mb-2">NEON RACER</h2>
          <p className="text-sm text-gray-400">Kör snabbast i stan.</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-bold">
            SPELA
          </button>
        </div>

      </div>
      
      <p className="text-xs text-gray-600 absolute bottom-4">Tryck på ett kort för att starta</p>
    </div>
  )
}

// --- SPELET ---
function SimpleGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // States för poäng och liv
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  
  // useEffect körs när komponenten laddas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // --- SPELVARIABLER ---
    // Jag använder "let" här för saker som ändras
    let gameRunning = true
    let frameId = 0
    
    // Spelaren
    const player = {
      x: 375, // Mitten ungefär (800 / 2 - 25)
      y: 500,
      width: 50,
      height: 50,
      speed: 5
    }

    // Listor för skott och fiender
    let bullets: any[] = []
    let enemies: any[] = []
    
    // Knappar
    const keys = {
      ArrowLeft: false,
      ArrowRight: false,
      Space: false
    }

    // Lyssna på tangentbordet
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') keys.ArrowLeft = true
      if (e.code === 'ArrowRight') keys.ArrowRight = true
      
      // Skjut bara om man trycker Space och spelet är igång
      if (e.code === 'Space') {
        if (!keys.Space) {
          // Lägg till ett nytt skott i listan
          bullets.push({
            x: player.x + 20, // Centrera skottet
            y: player.y,
            width: 10,
            height: 20
          })
        }
        keys.Space = true
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') keys.ArrowLeft = false
      if (e.code === 'ArrowRight') keys.ArrowRight = false
      if (e.code === 'Space') keys.Space = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Funktion för att skapa fiender då och då
    const enemyInterval = setInterval(() => {
      if (gameRunning) {
        enemies.push({
          x: Math.random() * (canvas.width - 40),
          y: -40,
          width: 40,
          height: 40,
          speed: 2 + Math.random() // Lite olika hastighet
        })
      }
    }, 1000) // Varje sekund

    // --- SPELLOOPEN (Körs 60 gånger i sekunden) ---
    const loop = () => {
      if (!gameRunning) return

      // 1. Rensa skärmen
      ctx.fillStyle = '#111827' // Mörkgrå bakgrund
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 2. Uppdatera spelaren
      if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed
      }
      if (keys.ArrowRight && player.x < canvas.width - player.width) {
        player.x += player.speed
      }

      // Rita spelaren (en enkel fyrkant)
      ctx.fillStyle = '#3b82f6' // Blå färg
      ctx.fillRect(player.x, player.y, player.width, player.height)

      // 3. Hantera skott
      // Jag använder en vanlig for-loop för det är enklare att kontrollera
      for (let i = 0; i < bullets.length; i++) {
        let b = bullets[i]
        b.y -= 7 // Skottets hastighet uppåt
        
        // Rita skottet
        ctx.fillStyle = '#ef4444' // Röd
        ctx.fillRect(b.x, b.y, b.width, b.height)

        // Ta bort skott om de åker utanför
        if (b.y < 0) {
          bullets.splice(i, 1)
          i--
        }
      }

      // 4. Hantera fiender
      for (let i = 0; i < enemies.length; i++) {
        let e = enemies[i]
        e.y += e.speed // Fienden åker neråt
        
        // Rita fienden
        ctx.fillStyle = '#22c55e' // Grön
        ctx.fillRect(e.x, e.y, e.width, e.height)

        // KOLLISION: Skott träffar fiende
        for (let j = 0; j < bullets.length; j++) {
          let b = bullets[j]
          
          // Enkel kollisions-check (rektangel mot rektangel)
          if (
            b.x < e.x + e.width &&
            b.x + b.width > e.x &&
            b.y < e.y + e.height &&
            b.height + b.y > e.y
          ) {
            // Träff! Ta bort både skott och fiende
            enemies.splice(i, 1)
            bullets.splice(j, 1)
            i--
            j--
            // Uppdatera poängen (måste använda callback för state inne i loop)
            setScore(prev => prev + 10)
            break // Hoppa ur inre loopen
          }
        }

        // GAME OVER: Fiende träffar spelaren eller botten
        if (e.y > canvas.height) {
            // Om fienden når botten, ta bort den (eller game over om man vill)
            enemies.splice(i, 1)
            i--
        }
        
        // Om fienden krockar med spelaren
        if (
            player.x < e.x + e.width &&
            player.x + player.width > e.x &&
            player.y < e.y + e.height &&
            player.height + player.y > e.y
        ) {
            gameRunning = false
            setGameOver(true)
        }
      }

      frameId = requestAnimationFrame(loop)
    }

    // Starta spelet
    loop()

    // Städning när man lämnar sidan
    return () => {
      cancelAnimationFrame(frameId)
      clearInterval(enemyInterval)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, []) // Tom array betyder att detta körs en gång vid start

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black relative">
      
      {/* Tillbaka knapp */}
      <button 
        onClick={onBack} 
        className="absolute top-4 left-4 text-white hover:text-gray-300 flex items-center gap-2"
      >
        <BackIcon /> MENY
      </button>

      {/* Poängräknare */}
      <div className="absolute top-4 text-white font-mono text-xl border border-white/20 px-4 py-2 rounded bg-black/50">
        Poäng: {score}
      </div>

      {/* Spelplanen */}
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="bg-gray-800 rounded-lg shadow-2xl max-w-full h-auto border-4 border-gray-700"
      />

      {/* Game Over Ruta */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
          <h1 className="text-5xl text-red-500 font-bold mb-4">GAME OVER</h1>
          <p className="text-white text-xl mb-6">Du fick {score} poäng</p>
          <button 
            onClick={onBack}
            className="bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200"
          >
            FÖRSÖK IGEN
          </button>
        </div>
      )}

      <p className="text-gray-500 mt-4 text-sm">Använd pilarna för att styra och Mellanslag för att skjuta</p>
    </div>
  )
}