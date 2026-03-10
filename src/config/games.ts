export interface Game {
  id: string;
  name: string;
  core: string;
  url: string;
}

export const GAMES: Game[] = [
  {
    id: "starfox",
    name: "Star Fox",
    core: "n64",
    url: "https://files.catbox.moe/votlhe.z64",
  },
  // banjo--> https://files.catbox.moe/qewlxt.z64
  {
    id: "DoA",
    name: "DoA",
    core: "psx",
    url: "https://files.catbox.moe/8widzu.bin",
  },
  {
    id: "harmony-of-dissonance",
    name: "Castlevania Harmony of Dissonance",
    core: "gba",
    url: "https://files.catbox.moe/59tz5j.gba",
  },
  {
    id: "Turtles in Time",
    name: "TMNT: Turtles in Time",
    core: "snes",
    url: "https://files.catbox.moe/hr8y21.sfc",
  },
  {
    id: "Battletoads",
    name: "Battletoads",
    core: "nes",
    url: "https://files.catbox.moe/6gj1tb.nes",
  },
  {
    id: "Battletoads in Battlemaniacs",
    name: "Battletoads (SNES)",
    core: "snes",
    url: "https://files.catbox.moe/qya8l0.nes",
  },
  {
    id: "Symphony of the Night",
    name: "Castlevania: Symphony of the Night",
    core: "psx",
    url: "https://litter.catbox.moe/5d3if6a7iqvunarg.bin",
  },
];
