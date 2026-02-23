import { useState } from "react";

interface EmulatorProps {
  romUrl: string;
  core: string;
  gameName: string;
}

export function Emulator({ romUrl, core, gameName }: EmulatorProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const startGame = async () => {
    try {
      setStatus("loading");

      const response = await fetch(romUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const arrayBuffer = await response.arrayBuffer();
      console.log("ROM size:", arrayBuffer.byteLength);

      // DEBUG: Check if it's HTML instead of binary
      const firstBytes = new Uint8Array(arrayBuffer.slice(0, 20));
      const text = new TextDecoder().decode(firstBytes);
      console.log("First 20 chars:", text);

      if (text.trim().startsWith("<")) {
        const fullText = new TextDecoder().decode(arrayBuffer);
        console.error("PROXY RETURNED HTML:", fullText.substring(0, 500));
        throw new Error("Proxy returned HTML error page instead of ROM");
      }

      // Check for valid N64 header (should start with 0x80 or similar)
      const isValidN64 =
        firstBytes[0] === 0x80 ||
        firstBytes[0] === 0x37 ||
        firstBytes[0] === 0x40;
      console.log(
        "Valid N64 header?",
        isValidN64,
        "First byte:",
        firstBytes[0].toString(16),
      );

      if (!isValidN64 || arrayBuffer.byteLength < 1000000) {
        throw new Error(
          `Invalid ROM: ${arrayBuffer.byteLength} bytes, header: 0x${firstBytes[0].toString(16)}`,
        );
      }

      const blob = new Blob([arrayBuffer], {
        type: "application/octet-stream",
      });
      const objectUrl = URL.createObjectURL(blob);

      // Set EmulatorJS globals
      window.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
      window.EJS_gameUrl = objectUrl;
      window.EJS_core = core;
      window.EJS_player = "#game";
      window.EJS_gameName = gameName;
      window.EJS_startOnLoaded = true;
      window.EJS_disableAutoLang = true;
      window.EJS_language = "en-US";
      window.EJS_cheats = [];

      // Inject loader script
      const script = document.createElement("script");
      script.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
      script.async = true;

      script.onload = () => {
        setStatus("ready");
        console.log("Emulator loaded");
      };

      script.onerror = () => {
        setStatus("error");
        setErrorMsg("Failed to load emulator script");
      };

      document.body.appendChild(script);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      console.error(err);
    }
  };

  if (status === "error") {
    return (
      <div style={{ color: "red", padding: 20 }}>
        <p>Error: {errorMsg}</p>
        <button onClick={() => setStatus("idle")}>Retry</button>
      </div>
    );
  }

  if (status === "idle") {
    return (
      <button
        onClick={startGame}
        style={{
          padding: "20px 40px",
          fontSize: "20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ▶ Play {gameName}
      </button>
    );
  }

  if (status === "loading") {
    return <div style={{ padding: 20 }}>Loading game...</div>;
  }

  return (
    <div>
      <div
        id="game"
        style={{ width: "100%", height: "600px", background: "#000" }}
      />
    </div>
  );
}
