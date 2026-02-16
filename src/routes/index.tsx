import { useState } from "react";
import { EmulatorJS } from "react-emulatorjs";
import "react-emulatorjs/style.css"; // Optional: includes default styling
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/')({ component: App })


function App() {
  const [gameFile, setGameFile] = useState(null);
  const [core, setCore] = useState("nes"); // Default core

  // Available cores for selection
  const cores = {
    nes: "nes",
    snes: "snes",
    gba: "gba",
    gb: "gb",
    n64: "n64",
    psx: "ps1",
    sms: "sma",
    genesis: "n64",
  };

  const handleFileSelect = (e:any) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setGameFile(URL.createObjectURL(file));
  };

  // Auto-detect core based on file extension
  const detectCoreFromFile = (filename:any) => {
    const ext = filename.split('.').pop().toLowerCase();
    const extMap = {
      'nes': 'nes',
      'smc': 'snes',
      'sfc': 'snes',
      'gba': 'gba',
      'gb': 'gb',
      'gbc': 'gb',
      'n64': 'n64',
      'z64': 'n64',
      'v64': 'n64',
      'ps1': 'psx',
      'psx': 'psx',
      'iso': 'psx',
      'smd': 'genesis',
      'gen': 'genesis',
      'sms': 'sms'
    };
    return extMap[ext]|| 'nes';
  };

  const handleFileInputChange = (e:any) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const detectedCore = detectCoreFromFile(file.name);
      setCore(detectedCore);
      setGameFile(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🎮 React EmulatorJS</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="file" 
          accept=".nes,.smc,.sfc,.gba,.gb,.gbc,.n64,.z64,.ps1,.psx,.iso,.smd,.gen,.sms"
          onChange={handleFileInputChange}
        />
        
        <select value={core} onChange={(e) => setCore(e.target.value)}>
          {Object.entries(cores).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {gameFile && (
        <div style={{ 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          overflow: 'hidden',
          background: '#000'
        }}>
          <EmulatorJS
            EJS_core={"n64"}
            EJS_gameUrl={gameFile}
            EJS_pathtodata="/data"
            EJS_startOnLoaded={true}
            
          />
        </div>
      )}
    </div>
  );
}
export default App;