import { Game } from "@/types/game";

// .zip och 7z filer funkar bra, finns en funktion i emulatorjs extractzip() / extract7z() som drar ut filen.
export const GAMES: Game[] = [
  {
    id: "starfox",
    name: "Star Fox",
    core: "n64",
    url: "https://files.catbox.moe/votlhe.z64",
    description: "",
  },
  {
    id: "doa",
    name: "DoA",
    core: "psx",
    url: "https://files.catbox.moe/f6ooqh.zip",
    description: "",
  },
  {
    id: "harmony-of-dissonance",
    name: "Castlevania Harmony of Dissonance",
    core: "gba",
    url: "https://files.catbox.moe/59tz5j.gba",
    description: "",
  },
  {
    id: "turtles-in-time",
    name: "TMNT: Turtles in Time",
    core: "snes",
    url: "https://files.catbox.moe/hr8y21.sfc",
    description: "",
  },
  {
    id: "battletoads-nes",
    name: "Battletoads",
    core: "nes",
    url: "https://files.catbox.moe/6gj1tb.nes",
    description: "",
  },
  {
    id: "battletoads-snes",
    name: "Battletoads in Battlemaniacs",
    core: "snes",
    url: "https://files.catbox.moe/qya8l0.sfc",
    description: "",
  },
  {
    id: "sotn",
    name: "Castlevania: Symphony of the Night",
    core: "psx",
    url: "/api/archive/download/ffta2grim.nds/cstlvnia.zip",
    description: "",
  },
  {
    id: "Final Fantasy Tactics Advance",
    name: "Final Fantasy Tactics Advance",
    core: "gba",
    url: "https://files.catbox.moe/mnn04q.gba",
    description: "",
  },
  {
    id: "ffta2",
    name: "Final Fantasy Tactics A2",
    core: "nds",
    url: "/api/archive/download/ffta2grim.nds/ffta2grim.nds",
    description: "",
  },
];
