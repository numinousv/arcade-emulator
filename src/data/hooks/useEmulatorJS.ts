// // hooks/useEmulatorJS.ts
// import { useState, useEffect } from 'react';

// interface EmulatorConfig {
//   romUrl: string;
//   core: string;
//   gameName: string;
// }

// export const useEmulatorJS = (config: EmulatorConfig) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!config.romUrl) return;

//     try {
//       // Remove existing scripts
//       const existingScripts = document.querySelectorAll('script[data-emulatorjs]');
//       existingScripts.forEach(s => s.remove());

//       // Set globals
//       window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
//       window.EJS_gameUrl = config.romUrl;
//       window.EJS_core = config.core;
//       window.EJS_player = '#game';
//       window.EJS_gameName = config.gameName;
//       window.EJS_startOnLoaded = true;
//       window.EJS_disableAutoLang = true;
//       window.EJS_language = 'en-US';
//       window.EJS_cheats = [];
//       window.EJS_GameID = config.gameName.replace(/\s+/g, '_');

//       // Inject script
//       const script = document.createElement('script');
//       script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
//       script.async = true;
//       script.setAttribute('data-emulatorjs', 'true');
      
//       script.onload = () => setIsLoaded(true);
//       script.onerror = () => setError('Failed to load EmulatorJS');
      
//       document.body.appendChild(script);
      
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Unknown error');
//     }
//   }, [config.romUrl, config.core, config.gameName]);

//   return { isLoaded, error };
// };