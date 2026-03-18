import { useState, useEffect } from 'react'

export function SimpleGame() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)
  const [targetPos, setTargetPos] = useState({ top: '50%', left: '50%' })

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsPlaying(false)
    }
    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setIsPlaying(true)
    moveTarget()
  }

  const moveTarget = () => {
    const randomTop = Math.floor(Math.random() * 80) + 10
    const randomLeft = Math.floor(Math.random() * 80) + 10
    setTargetPos({ top: `${randomTop}%`, left: `${randomLeft}%` })
  }

  const handleHit = () => {
    if (!isPlaying) return
    setScore((prev) => prev + 1)
    moveTarget()
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div aria-live="polite" className="flex justify-between w-[600px] font-bold text-2xl px-4 italic">
        <span className="text-purple-400">POÄNG: {score}</span>
        <span className="text-red-500">TID: {timeLeft}s</span>
      </div>
      
      <div className="relative w-[600px] h-[400px] border-4 border-purple-500 rounded-lg bg-gray-900 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        {!isPlaying && timeLeft === 30 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
            <h2 className="text-4xl font-bold text-white mb-6">Rymdjägaren</h2>
            <p className="text-gray-300 mb-6">Klicka på de lila rutorna så snabbt du kan!</p>
            <button 
              onClick={startGame} 
              autoFocus
              aria-label="Starta spelet Rymdjägaren"
              className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-500 font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-purple-400"
            >
              Starta Spelet
            </button>
          </div>
        )}

        {!isPlaying && timeLeft === 0 && (
          <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
            <h2 className="text-5xl font-black text-red-500 mb-4">TIDEN ÄR UTE!</h2>
            <p className="text-2xl text-white mb-6">Du fick {score} poäng!</p>
            <button 
              onClick={startGame} 
              autoFocus
              aria-label="Spela igen"
              className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-500 font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-purple-400"
            >
              Spela Igen
            </button>
          </div>
        )}

        {isPlaying && (
          <button 
            onClick={handleHit}
            aria-label="Träffa mål"
            className="absolute w-12 h-12 bg-purple-500 cursor-pointer rounded shadow-[0_0_15px_rgba(168,85,247,0.8)] hover:bg-pink-500 transition-colors focus:outline-none focus:ring-4 focus:ring-white"
            style={{ top: targetPos.top, left: targetPos.left, transform: 'translate(-50%, -50%)' }}
          />
        )}
      </div>
    </div>
  )
}