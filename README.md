# 🎮 _*Retro Emulator & Arcade games på webben: Emulator-TS Retro Library*_ 👾

En modern webbaserad retrospelplattform som låter dig spela klassiska konsol och arkadspel direkt i din webbläsare. Byggd med React, TypeScript, TanStack Router och EmulatorJS.

## Content-Table - Kurskrav först

- [🎯 Översikt](#översikt) <span style="color:red;"> ! Kursmål !</span>
- [📁 Projektets Struktur](#struktur) <span style="color:red;"> ! Kursmål !</span>
- [♿ Implementation av tillgänglighet](#aria-labels) <span style="color:red;"> ! Kursmål !</span>
- [✨ Features](#färg-kontrast)
- [🐱📦 Installation](#installation)
- [🧩 Komponentarkitektur](#kärnkomponenter)
- [⚡ Optimering](#exempel---lazy-loading)
- [👾 API Integration](#rom-fetching)
- [👥 Contributing](#fmw25)

# 🎯 Översikt

Emulator-TS Retro Library är en single-page application (SPA) som låter användare bläddra bland och spela klassiska konsol och typescript skrivna arkadspel direkt i webben. Användare kan välja mellan olika konsoler (N64, GBA, SNES, etc.) och starta spel direkt i webbläsaren med hjälp av [EmulatorJS](https://emulatorjs.org/), som i sin tur använder RetroArch's emulator arkitektur.

# 📁 Projektets Struktur

Inte särskilt annorlunda från typiska tanstack router projekt som utiliserar vite istället för start i dess struktur. En HTML-fil som en shell för projektet, en container. /src/router som en configuration för tanstack-router, /src/main.tsx - react's entreè som fetchar router, renderar <RouterProvider> och /src/routes mappen för fil-baserad routing. /src/components för återanvändbara komponenter som exporteras, och sedan importeras i antingen en annan komponent tills den i slutänden importeras i en fil som sitter i /src/route.
/src/components/ui är för shadcn importering.

```bash
src/
├── components/          # Återanvändbara UI komponenter
│    └─── arcade/        # Komponenter för arcade routen
│    └── pacman/         # Komponenter för pacman routen
│    └─── ui/            # shadcn komponenter
│   ├── GameCard.tsx     # Memoized game card
│   ├── Emulator.tsx     # EmulatorJS wrapper
│   └── header.tsx       # navbar/navigation header, layout
├── hooks/               # Custom React hooks
│    └── use-scroll.ts   # scrollhook för navbaren, förhindrar flickering, används för att byta opacitet m. blur
├── stores/              # Zustand state management
│     └── gameStore.ts   # Game selection & recent
├── types/               # definitioner för ts
│   ├── game.ts          # Game interface
│   └── emulatorjs.d.ts  # emulatorJS types, *obligatorisk*
├── config/              # statisk data
│   ├── games.ts         # Games array
│   └── consoles.ts      # Konsoler från games, kan använda nya från eJS's cdn. Beräknar även antalet spel
├── routes/              # TanStack Router
├── pacman.tsx           # pacman sidan/routen
│   ├── arcade.tsx       # arcade sidan/routen
│   ├── __root.tsx       # root layout, m.m globala saker
│   ├── index.tsx        # hem sidan/landing sidan
│   └── console/
│      ├── index.tsx       # rendering av konsolkarusellen och dens kort
│      └── $consoleId.tsx  # dynamisk konsol sida, rendering av emulatorjs
├── lib/                   # utiliteter/utilities
│   └── utils.ts           # Helper funktioner
└── styles.css             # globala styles
```

---

# ♿ Implementation av tillgänglighet

## ARIA Labels

Interaktiva element har element som ger dem en deskriptiv flagga

```typescript
// src/components/index.tsx

<Button aria-label="View source on GitHub (opens in new tab)" size="icon">
  <Github />
</Button>
```

```typescript
// src/components/GameCard.tsx

  onClick={() => onSelect(game.id)}
  onKeyDown={handleKeyDown}
  tabIndex={0}
  role="button"
  aria-label={`Play ${game.name} on ${game.core}`}
      >
</Card>
```

## Semantisk HTML

- Korrekt heading hierarchy (h1 -> h2 -> h3)

- Navigation med `<nav>` elements

- Buttons använder `<Button>` och inte `<div>`

## Focus Management

- Fokusindikatorer är synliga
- Logisk tabbordning
- Fokus fångat i modaler (mobilmeny)

## aria-live sektioner

```typescript
                  // /src/routes/console/$consoleId.tsx

                <MoveLeftIcon className="h-4 w-4" /> Back to {console.name}{" "}
                Games
              </Button8>
            </div>

            <Suspense
              fallback={
                <div
                  className="w-full bg-black/20 rounded-lg p-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="animate-pulse bg-linear-to-r">
                    Loading emulator...
                  </div>
                </div>
              }
            >
```

```typescript
      // /src/components/pacman/SimpleGame.tsx

      {/* Score */}
      <h2
        className="text-xl font-bold"
        aria-live="polite"
        aria-label={`Current score ${score}`}
      >
        Score: {score}
      </h2>
```

## Färg Kontrast

- Stöd för mörkt läge med tillräcklig kontrast
- Visuella indikatorer är inte enbart beroende av färg

# ✨ Features

- Konsolkarusell: Bläddra bland tillgängliga spelsystem med en interaktiv karusell

- Spelval: Visa alla spel för en vald konsol i ett responsiv grid

- Emulation i webbläsaren: Spela spel direkt med EmulatorJS

- Senaste spelen: Spåra nyligen spelade spel (Zustand-butik)

- Responsiv design: Funkar bra på mobiler - anpassningsbar layout

- Mörkt läge: Temaväxling med fin animation

- Stöd för skärmläsare: ARIA-labels och semantisk HTML

# 🛠️ Verktyg

- Ramverk: React med TypeScript

- Routing: TanStack Router

- Styling: Tailwind CSS med shadcn/ui-komponenter

- Tillståndshantering: Zustand (lätt, minimal standard)

- Animationer: Framer Motion

- Emulator: EmulatorJS (webb-baserad konsol-emulation)

- Build Tool: Vite

## 🚀 Komma igång

# Installation

- Klona repot

```bash
git clone https://github.com/numinousv/arcade-emulator.git
```

- Installera beroenden

```bash
npm install
```

- Starta en dev server

```bash
npm run dev
```

- Bygg för produktion

```bash
npm run build
```

# 🧩 Komponentarkitektur

## Kärnkomponenter

```typescript
GameCard (Memoized)
tsx

// Återanvändbar, memoiserad spelkortskomponent
<GameCard
key={g.id}
game={g}
onSelect={handleGameSelect}
color={console.color}
/>
```

## Emulator

Wrappar in EmulatorJS:

- Hämtar ROM-filer

- Hanterar laddnings-/fel-/klartillstånd

- Injicerar EmulatorJS-skript dynamiskt

## Header

- Clean navigering med:

- Responsiv design (mobilmeny)

- Temaväxling

- Aktiv rutt indikation
- Send feedback
- Translation results available

# ⚡ Optimering

- Code Splitting genom Lazy loading Emulator med användning av React.lazy() - Minskar initiella bundle storleken
- Memoization memo() på GameCard - Förhindrar onödiga re-renders
- Route-baserad Caching - Automatisk caching av metadata

# Exempel - Lazy Loading:

```typescript
const Emulator = lazy(() =>
  import("@/components/Emulator").then((module) => ({
    default: module.Emulator,
  })),
);
<Suspense
              fallback={
                <div
                  className="w-full bg-black/20 rounded-lg p-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="animate-pulse bg-linear-to-r">
                    Loading emulator...
                  </div>
                </div>
              }
            >


```

# 👾 API Integration - EmulatorJS

## ROM Fetching

```typescript
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

      ...
      ...

      // Set EmulatorJS globals
window.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
window.EJS_gameUrl = objectUrl;
window.EJS_core = core;

// Inject loader script
const script = document.createElement("script");
script.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
document.body.appendChild(script);
```

# 🐱📦 Catbox 🐱📦 som host och användning av emulatorjs' egen CDN antyder varken ROMs eller Emulator delar är hostade localt

```typescript
import { Game } from "@/types/game";

export const GAMES: Game[] = [
  {
    id: "starfox",
    name: "Star Fox",
    core: "n64",
    url: "https://files.catbox.moe/votlhe.z64",
    description: "",
  },
```

# 👥 Team Contributions

## FMW25

[Akram] - Component architecture, routing, state management, documentation, API - implementering av logik för emujs

[Ramz] - Arcade-mode, planering, layout ideèr, documentation

[Chippe] - Documentation, UI design, Pacman spel, tillgänglighet

[Laiba] - Accessibility, testing
