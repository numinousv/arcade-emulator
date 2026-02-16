import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      {/* ARCADE CABINET */}
      <div className="relative flex flex-col items-center w-[320px] h-[500px] !bg-[#1a4da1] border-[6px] border-black rounded-xl shadow-[15px_15px_0px_#d32f2f] overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-center w-full h-[70px] !bg-[#ffeb3b] border-b-[6px] border-black">
          <h1 className="text-3xl font-black !text-[#d32f2f] tracking-widest drop-shadow-[3px_3px_0_#000] font-sans">
            DOPE MAN
          </h1>
        </div>

        {/* SCREEN */}
        <div className="flex flex-col items-center justify-center w-[80%] mt-8 bg-black border-[8px] border-[#333] rounded h-[200px] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
          <div className="relative w-[100px] h-[60px] border-2 border-[#2196f3] mb-4">
            <div className="absolute top-4 left-2 text-xl !text-yellow-400 font-bold">
              ᗧ • •
            </div>
          </div>

          <div className="font-mono text-sm font-bold text-white mb-2">
            HIGH SCORE: 9999
          </div>
          <div className="font-mono text-sm font-bold !text-[#ffff00] animate-pulse">
            INSERT COIN
          </div>
        </div>

        {/* CONTROLS */}
        <div className="absolute bottom-0 flex items-center justify-around w-full h-[140px] !bg-[#0d347a] border-t-[6px] border-black pb-4">
          
          {/* JOYSTICK (SPAKEN) - Nu klickbar! */}
          <button 
            type="button"
            className="group relative flex justify-center items-end w-16 h-16 outline-none focus:outline-none"
            onClick={() => console.log('Joystick dragen!')}
          >
            {/* Behållaren som roterar när man trycker */}
            <div className="relative w-full h-full transition-transform duration-100 origin-bottom group-active:-rotate-12 group-active:-translate-x-1">
              
              {/* Grå pinnen */}
              <div className="w-3 h-10 !bg-[#999999] border-2 border-black absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"></div>
              
              {/* Röda bollen */}
              <div className="absolute bottom-4 w-9 h-9 !bg-[#d32f2f] border-[3px] border-black rounded-full z-20 left-1/2 -translate-x-1/2 pointer-events-none"></div>
            
            </div>
          </button>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <button 
              className="w-10 h-10 !bg-[#ffeb3b] border-4 border-black rounded-full shadow-[2px_4px_0_#000] active:shadow-none active:translate-y-1 transition-all"
              onClick={() => console.log('Gul knapp!')}
            ></button>
            <button 
              className="w-10 h-10 !bg-[#d32f2f] border-4 border-black rounded-full shadow-[2px_4px_0_#000] active:shadow-none active:translate-y-1 transition-all"
              onClick={() => console.log('Röd knapp!')}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
