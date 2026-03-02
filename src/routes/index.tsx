import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useEffect, useRef } from 'react'

const GameIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
    <path d="m6 12 4-9 4 9H6Z"/><path d="M6 12c.38 2.56 1.88 4.5 4 4.5s3.62-1.94 4-4.5H6Z"/><path d="M9 16.5V21h2v-4.5"/><path d="M13 16.5V21h2v-4.5"/><path d="M5 9c-1.5 1.5-3 1-3 1"/><path d="M19 9c1.5 1.5 3 1 3 1"/>
  </svg>
)

export const Route = createFileRoute('/')({
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

function MenuScreen({ onPlay }: { onPlay: (id: string) => void }) {
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

function SimpleGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let gameRunning = true
    let frameId: number
    
    const player = { x: 375, y: 500, width: 50, height: 50, speed: 7 }
    const keys = { ArrowLeft: false, ArrowRight: false, Space: false }
    let bullets: any[] = []
    let enemies: any[] = []
    let lastShot = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code in keys) keys[e.code as keyof typeof keys] = true
      if (e.code === 'Space') {
        const now = Date.now()
        if (now - lastShot > 250) {
          bullets.push({ x: player.x + 20, y: player.y, width: 10, height: 20 })
          lastShot = now
        }
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code in keys) keys[e.code as keyof typeof keys] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    const enemyInterval = setInterval(() => {
      if (gameRunning) {
        enemies.push({
          x: Math.random() * (canvas.width - 40),
          y: -40,
          width: 40,
          height: 40,
          speed: 2 + Math.random() * 2
        })
      }
    }, 1000)

    const loop = () => {
      if (!gameRunning) return

      ctx.fillStyle = '#111'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (keys.ArrowLeft && player.x > 0) player.x -= player.speed
      if (keys.ArrowRight && player.x < canvas.width - player.width) player.x += player.speed

      ctx.fillStyle = '#a855f7'
      ctx.fillRect(player.x, player.y, player.width, player.height)

      for (let i = 0; i < bullets.length; i++) {
        let b = bullets[i]
        b.y -= 10
        ctx.fillStyle = '#f472b6'
        ctx.fillRect(b.x, b.y, b.width, b.height)
        if (b.y < 0) {
          bullets.splice(i, 1)
          i--
        }
      }

      for (let i = 0; i < enemies.length; i++) {
        let e = enemies[i]
        e.y += e.speed
        ctx.fillStyle = '#ef4444'
        ctx.beginPath()
        ctx.moveTo(e.x + 20, e.y + 40)
        ctx.lineTo(e.x, e.y)
        ctx.lineTo(e.x + 40, e.y)
        ctx.fill()

        if (
          player.x < e.x + e.width &&
          player.x + player.width > e.x &&
          player.y < e.y + e.height &&
          player.y + player.height > e.y
        ) {
          gameRunning = false
          setGameOver(true)
        }

        for (let j = 0; j < bullets.length; j++) {
          let b = bullets[j]
          if (
            b.x < e.x + e.width &&
            b.x + b.width > e.x &&
            b.y < e.y + e.height &&
            b.y + b.height > e.y
          ) {
            enemies.splice(i, 1)
            bullets.splice(j, 1)
            setScore(s => s + 10)
            i--
            break
          }
        }

        if (e.y > canvas.height) {
          enemies.splice(i, 1)
          i--
        }
      }

      frameId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      clearInterval(enemyInterval)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex justify-between w-[800px] font-bold text-xl px-4 italic">
        <span className="text-purple-400">SCORE: {score}</span>
        <span className="text-red-500">LIFE: 01</span>
      </div>
      
      <div className="relative border-4 border-gray-800 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={600} 
          className="bg-[#111]"
        />
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <h2 className="text-6xl font-black text-red-600 mb-4 italic animate-pulse">GAME OVER</h2>
            <p className="text-2xl mb-8">FINAL SCORE: {score}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-full font-bold transition-transform hover:scale-110 uppercase tracking-tighter"
            >
              Försök igen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}