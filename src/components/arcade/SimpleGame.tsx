import { useState, useEffect, useRef } from 'react'

export function SimpleGame() {
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
        if (b.y < 0) { bullets.splice(i, 1); i-- }
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
        if (player.x < e.x + e.width && player.x + player.width > e.x && player.y < e.y + e.height && player.y + player.height > e.y) {
          gameRunning = false
          setGameOver(true)
        }
        for (let j = 0; j < bullets.length; j++) {
          let b = bullets[j]
          if (b.x < e.x + e.width && b.x + b.width > e.x && b.y < e.y + e.height && b.y + b.height > e.y) {
            enemies.splice(i, 1)
            bullets.splice(j, 1)
            setScore(s => s + 10)
            i--
            break
          }
        }
        if (e.y > canvas.height) { enemies.splice(i, 1); i-- }
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
      <div className="relative border-4 border-gray-800 rounded-lg">
        <canvas ref={canvasRef} width={800} height={600} className="bg-[#111]" />
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <h2 className="text-6xl font-black text-red-600 mb-4">GAME OVER</h2>
            <button onClick={() => window.location.reload()} className="bg-purple-600 px-8 py-3 rounded-full">Försök igen</button>
          </div>
        )}
      </div>
    </div>
  )
}