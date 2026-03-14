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
    url: "/api/archive/download/ffta2grim.nds/cstlvnia.7z", // folder organization + infinite file sizes + ejs extracts zips. need indexeddb caching because redownloading 350mb still
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
  {
    id: "gg-dust-strikers",
    name: "Guilty Gear: Dust Strikers",
    core: "nds",
    url: "/api/archive/download/ffta2grim.nds/ggdvststrikrz.zip",
    description: "",
  },
  {
    id: "virton-cybertroopers",
    name: "Virtual On - Cyber Troopers",
    core: "segaSaturn",
    url: "/api/archive/download/ffta2grim.nds/Virtual%20On%20-%20Cyber%20Troopers%20%28USA%29.7z",
    description: "",
  },
  {
    id: "princess-crown",
    name: "Princess Crown",
    core: "segaSaturn",
    url: "/api/archive/download/princess-crown-english-v-0.95-ex/Princess%20Crown%20%28English%20Patched%20v1.0RC3%20EX%29.7z",
    description: "EN fanTL, old Vanillaware game",
  },
  {
    id: "star-ocean",
    name: "Star Ocean",
    core: "snes",
    url: "/api/archive/download/ffta2grim.nds/Star%20Ocean%20%28tr%29.zip",
    description: "fan TL",
  },
  {
    id: "front-mission-iii",
    name: "Front Mission III",
    core: "psx",
    url: "/api/archive/download/ffta2grim.nds/Front%20Mission%203%20%28USA%29.7z",
    description: "",
  },
  {
    id: "ff-tactics-wotl",
    name: "Final Fantasy Tactics: WOTL",
    core: "psp",
    url: "/api/archive/download/ffta2grim.nds/Final%20Fantasy%20Tactics%20The%20War%20of%20the%20Lions%20%28Wolt%20USA%20fast%20fix%20by%20Nexus%29.iso",
    description: "animation fix ver. - better than the 2025 remake btw", // ofc it doesnt work even though it should wow
  },
  {
    id: "chrono-trigger",
    name: "Chrono Trigger",
    core: "snes",
    url: "/api/archive/download/ffta2grim.nds/Chrono%20Trigger%20%28USA%29.zip",
    description: "++++",
  },
  {
    id: "ff-viii",
    name: "Final Fantasy VIII (DISC 1)",
    core: "psx",
    url: "/api/archive/download/ffta2grim.nds/Final%20Fantasy%20VIII%20%28USA%29%20%28Disc%201%29.7z",
    description: "fin -> export savefile -> load disc 2 -> import save file",
  },
];
