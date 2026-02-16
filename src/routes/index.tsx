import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect, useRef, useCallback } from "react";

export const Route = createFileRoute("/")({ component: App });

// --- LJUDMOTOR (Synth) ---
const playArcadeSound = (type: 'move' | 'jump' | 'start' | 'coin' | 'die') => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;

  if (type === 'move') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  } else if (type === 'coin') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.setValueAtTime(1800, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (type === 'die') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(50, now + 0.5);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.5);
    osc.start(now);
    osc.stop(now + 0.5);
  } else if (type === 'start') {
    const playNote = (f: number, t: number) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.type = 'square';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.1, t);
      g.gain.linearRampToValueAtTime(0, t + 0.1);
      o.start(t);
      o.stop(t + 0.1);
    };
    playNote(440, now);
    playNote(554, now + 0.15);
    playNote(660, now + 0.30);
  }
};

// Hjälpfunktion för kollision
const checkCollision = (p1: {x: number, y: number}, p2: {x: number, y: number}, threshold: number = 5) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy) < threshold;
};

function App() {
  const [gameState, setGameState] = useState<'DEMO' | 'PLAYING' | 'GAMEOVER'>('DEMO');
  const [score, setScore] = useState(0);
  
  // Positioner (0-100%)
  const [player, setPlayer] = useState({ x: 50, y: 50 });
  const [enemy, setEnemy] = useState({ x: 10, y: 10 });
  const [coins, setCoins] = useState<{id: number, x: number, y: number}[]>([]);
  const [facing, setFacing] = useState(1);

  // Joystick state
  const [joystickVec, setJoystickVec] = useState({ x: 0, y: 0 }); // För visuell lutning
  const joystickRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // --- SPEL-LOOP ---
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const interval = setInterval(() => {
      setPlayer((p) => {
        let newX = p.x;
        let newY = p.y;
        
        // Flytta baserat på joystick-vektor (om man drar) eller tangentbord (om implementerat separat)
        // Här använder vi joystickVec som "input" för rörelse
        if (Math.abs(joystickVec.x) > 5) newX += joystickVec.x * 0.05;
        if (Math.abs(joystickVec.y) > 5) newY += joystickVec.y * 0.05;

        // Gränser
        return {
          x: Math.max(0, Math.min(92, newX)),
          y: Math.max(0, Math.min(92, newY))
        };
      });

      // Fiende AI (Jagar spelaren långsamt)
      setEnemy((e) => {
        // Vi behöver 'player' här inne, men state är asynkront. 
        // Vi gör en enkel tracking inuti setState callbacken genom att läsa av en ref eller
        // acceptera att fienden "laggar" en frame.
        return e; 
      });

    }, 50);

    return () => clearInterval(interval);
  }, [gameState, joystickVec]);

  // --- SEPARAT LOOP FÖR LOGIK SOM KRÄVER UPPDATERAD STATE (Kollisioner & AI) ---
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const gameLogic = setInterval(() => {
      // 1. Flytta fienden mot spelaren
      setEnemy(e => {
        const dx = player.x - e.x;
        const dy = player.y - e.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const speed = 0.8; // Fiendens hastighet
        
        if (dist < 1) return e; // Stå still om nära
        return {
          x: e.x + (dx / dist) * speed,
          y: e.y + (dy / dist) * speed
        };
      });

      // 2. Kolla kollision med Fiende (DÖD)
      if (checkCollision(player, enemy, 4)) {
        playArcadeSound('die');
        setGameState('GAMEOVER');
      }

      // 3. Kolla kollision med Mynt (POÄNG)
      setCoins(currentCoins => {
        const remaining = currentCoins.filter(c => {
          const hit = checkCollision(player, c, 5);
          if (hit) {
            playArcadeSound('coin');
            setScore(s => s + 100);
          }
          return !hit;
        });
        
        // Om alla mynt är slut, skapa nya!
        if (remaining.length === 0) {
          return Array.from({length: 5}).map((_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
          }));
        }
        return remaining;
      });

    }, 50);

    return () => clearInterval(gameLogic);
  }, [gameState, player, enemy]);


  // --- TANGENTBORD ---
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING') return;
      
      // Vi simulerar joystick-rörelse med tangenter
      const speed = 20; 
      if (e.key === 'ArrowUp') setJoystickVec({x: 0, y: -speed});
      if (e.key === 'ArrowDown') setJoystickVec({x: 0, y: speed});
      if (e.key === 'ArrowLeft') { setJoystickVec({x: -speed, y: 0}); setFacing(-1); }
      if (e.key === 'ArrowRight') { setJoystickVec({x: speed, y: 0}); setFacing(1); }
    };
    
    const stopKey = () => setJoystickVec({x:0, y:0});

    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', stopKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('keyup', stopKey);
    };
  }, [gameState]);


  // --- JOYSTICK TOUCH/MOUSE LOGIC ---
  const handleJoystickStart = (e: React.PointerEvent) => {
    e.preventDefault(); // Stoppa scrolling
    setIsDragging(true);
    updateJoystick(e);
  };

  const handleJoystickMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateJoystick(e);
  };

  const handleJoystickEnd = () => {
    setIsDragging(false);
    setJoystickVec({ x: 0, y: 0 }); // Snäpp tillbaka till mitten
  };

  const updateJoystick = (e: React.PointerEvent) => {
    if (!joystickRef.current) return;
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Räkna ut avstånd från mitten
    let dx = e.clientX - centerX;
    let dy = e.clientY - centerY;
    
    // Begränsa hur långt man kan dra (max 40px)
    const distance = Math.sqrt(dx*dx + dy*dy);
    const maxDist = 40;
    if (distance > maxDist) {
      dx = (dx / distance) * maxDist;
      dy = (dy / distance) * maxDist;
    }

    setJoystickVec({ x: dx, y: dy });
    
    // Uppdatera vilket håll gubben tittar
    if (dx < -10) setFacing(-1);
    if (dx > 10) setFacing(1);
    
    // Spela ljud ibland när man rör sig
    if (gameState === 'PLAYING' && Math.random() > 0.9) playArcadeSound('move');
  };


  const startGame = () => {
    setScore(0);
    setPlayer({ x: 50, y: 50 });
    setEnemy({ x: 5, y: 5 });
    setCoins(Array.from({length: 3}).map((_, i) => ({
      id: i, x: Math.random() * 80 + 10, y: Math.random() * 80 + 10
    })));
    setGameState('PLAYING');
    playArcadeSound('start');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 overflow-hidden font-sans select-none touch-none">
      
      {/* ARCADE CABINET */}
      <div className="relative flex flex-col items-center h-[95vh] aspect-[3/4] max-h-[900px] max-w-[600px] !bg-[#1a4da1] border-[8px] border-black rounded-2xl shadow-[20px_20px_0px_#d32f2f]">
        
        {/* HEADER */}
        <div className="flex items-center justify-center w-full h-[12%] !bg-[#ffeb3b] border-b-[8px] border-black shrink-0">
          <h1 className="text-[4vh] font-black !text-[#d32f2f] tracking-widest drop-shadow-[4px_4px_0_#000]">
            DOPE MAN
          </h1>
        </div>

        {/* SCREEN */}
        <div className="flex-1 w-full flex items-center justify-center p-4 bg-[#111]">
          <div className={`relative w-full h-full border-[8px] border-[#333] rounded-lg shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] overflow-hidden transition-colors duration-200 ${gameState === 'GAMEOVER' ? '!bg-[#330000]' : gameState === 'PLAYING' ? '!bg-[#001100]' : '!bg-black'}`}>
            
            {/* SCANLINES */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none"></div>

            {/* UI LAGER */}
            <div className="absolute top-2 left-4 text-white font-mono text-[2vh] z-30">SCORE: {score}</div>
            {gameState === 'PLAYING' && (
               <div className="absolute top-2 right-4 text-white font-mono text-[2vh] z-30">ENEMY: 👾</div>
            )}

            {/* SPELLAGER */}
            {gameState === 'PLAYING' && (
              <>
                {/* SPELARE */}
                <div 
                  className="absolute text-[4vh] z-20 transition-transform duration-75"
                  style={{ left: `${player.x}%`, top: `${player.y}%`, transform: `translate(-50%, -50%) scaleX(${facing})` }}
                >
                  👻
                </div>

                {/* FIENDE */}
                <div 
                  className="absolute text-[4vh] z-20 transition-all duration-300 ease-linear"
                  style={{ left: `${enemy.x}%`, top: `${enemy.y}%`, transform: `translate(-50%, -50%)` }}
                >
                  👾
                </div>

                {/* MYNT */}
                {coins.map(c => (
                  <div 
                    key={c.id}
                    className="absolute text-[2vh] z-15 animate-bounce"
                    style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  >
                    🪙
                  </div>
                ))}
              </>
            )}

            {/* MENYER */}
            {gameState === 'DEMO' && (
              <div className="flex flex-col items-center justify-center h-full z-30 relative">
                <div className="text-[5vh] animate-bounce">👻</div>
                <div className="text-[3vh] font-bold !text-yellow-400 mb-2 mt-4">PRESS START</div>
                <div className="text-[1.5vh] text-white/70">USE JOYSTICK TO MOVE</div>
              </div>
            )}

            {gameState === 'GAMEOVER' && (
               <div className="flex flex-col items-center justify-center h-full z-30 relative bg-black/50 w-full">
                <div className="text-[5vh] font-bold !text-red-600 mb-2">GAME OVER</div>
                <div className="text-[3vh] text-white mb-6">SCORE: {score}</div>
                <button 
                  onClick={startGame}
                  className="px-6 py-2 bg-yellow-400 border-4 border-black font-bold text-xl hover:bg-white cursor-pointer pointer-events-auto"
                >
                  TRY AGAIN
                </button>
              </div>
            )}
          </div>
        </div>

        {/* KONTROLLPANEL */}
        <div className="flex items-center justify-around w-full h-[25%] !bg-[#0d347a] border-t-[8px] border-black shrink-0 px-4 pb-4 select-none">
          
          {/* INTERAKTIV JOYSTICK (DRAGBAR) */}
          <div 
            ref={joystickRef}
            className="relative w-[18vh] h-[18vh] bg-black/30 rounded-full border-4 border-black/50 touch-none cursor-grab active:cursor-grabbing"
            onPointerDown={handleJoystickStart}
            onPointerMove={handleJoystickMove}
            onPointerUp={handleJoystickEnd}
            onPointerLeave={handleJoystickEnd}
          >
            {/* Själva spaken som rör sig */}
            <div 
              className="absolute w-[6vh] h-[6vh] !bg-[#d32f2f] rounded-full border-[3px] border-black shadow-lg z-50 pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${joystickVec.x}px), calc(-50% + ${joystickVec.y}px))`
              }}
            >
              {/* Glans på bollen */}
              <div className="absolute top-1 left-2 w-3 h-3 bg-white/40 rounded-full"></div>
            </div>
            {/* Pinnen under (visuell) */}
            <div 
              className="absolute w-4 h-[50%] bg-gray-500 bottom-[50%] left-[50%] -translate-x-1/2 origin-bottom pointer-events-none -z-10"
              style={{
                transform: `rotate(${joystickVec.x * 0.5}deg)`
              }}
            ></div>
          </div>

          {/* ACTION KNAPPAR */}
          <div className="flex gap-6 items-center">
            <button 
              onPointerDown={() => { if(gameState==='DEMO') startGame(); }}
              className="w-[10vh] h-[10vh] !bg-[#ffeb3b] border-[5px] border-black rounded-full shadow-[0_6px_0_#000] active:shadow-none active:translate-y-2 transition-all active:!bg-[#e6d600]"
            ></button>
            
            <button 
              onPointerDown={() => { if(gameState==='DEMO') startGame(); }}
              className="w-[10vh] h-[10vh] !bg-[#d32f2f] border-[5px] border-black rounded-full shadow-[0_6px_0_#000] active:shadow-none active:translate-y-2 transition-all active:!bg-[#b71c1c]"
            ></button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
