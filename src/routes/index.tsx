import { createFileRoute } from '@tanstack/react-router'
// n
import { ChangeEvent, useState } from "react";
import { EmulatorJS } from "react-emulatorjs";

export const Route = createFileRoute('/')({ component: App })


function App() {
  const [romUrl, setRomUrl] = useState();

  const onFileSelect = (e) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setRomUrl(URL.createObjectURL(file));
  };

  return (
    <div>
      <input type="file" onChange={onFileSelect} />
      {romUrl && (
        <EmulatorJS
          EJS_core="nes"
          EJS_gameUrl={romUrl}
          EJS_pathtodata="/data" // Points to the folder in your /public directory
        />
      )}
    </div>
  );
}

export default App;
