export interface Game {
  id: string;
  name: string;
  core: string;
  url: string;
  cover: string;
}

export const GAMES: Game[] = [
  {
    id: "starfox",
    name: "Star Fox",
    core: "n64",
    url: "https://files.catbox.moe/votlhe.z64",
    cover: "https://upload.wikimedia.org/wikipedia/en/1/11/Star_Fox_Cover.png",
  },
  // banjo--> https://files.catbox.moe/qewlxt.z64
  {
    id: "DoA",
    name: "DoA",
    core: "psx",
    url: "https://files.catbox.moe/8widzu.bin",
    // url: "https://litter.catbox.moe/6t0taj3kgjwxfkmf.bin",
    // url: (
    //   "https://archive.org/download/gameboycollection/Gameboy%20Megapack%20roms/Nintendo%20-%20Game%20Boy%20Advance/Golden%20Sun%20%28USA%2C%20Europe%29.gba",
    // ),
    cover:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.nintendolife.com",
  },
  {
    id: "harmony-of-dissonance",
    name: "Castlevania Harmony of Dissonance",
    core: "gba",
    url: "https://files.catbox.moe/59tz5j.gba",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/ff/Castlevania_HoD_NA_Cover.jpg",
  },
  {
    id: "Turtles in Time",
    name: "TMNT: Turtles in Time",
    core: "snes",
    url: "https://files.catbox.moe/hr8y21.sfc",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/ff/Castlevania_HoD_NA_Cover.jpg",
  },
  {
    id: "Battletoads",
    name: "Battletoads",
    core: "nes",
    url: "https://files.catbox.moe/6gj1tb.nes",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/ff/Castlevania_HoD_NA_Cover.jpg",
  },
  // url: "https://files.catbox.moe/qya8l0.nes", (SNES battletoads)
  {
    id: "Battletoads in Battlemaniacs",
    name: "Battletoads (SNES)",
    core: "snes",
    url: "https://files.catbox.moe/qya8l0.nes",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/ff/Castlevania_HoD_NA_Cover.jpg",
  },
  {
    id: "Symphony of the Night",
    name: "Castlevania: Symphony of the Night",
    core: "psx",
    url: "https://litter.catbox.moe/5d3if6a7iqvunarg.bin",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/ff/Castlevania_HoD_NA_Cover.jpg",
  },
];

//https://litter.catbox.moe/5d3if6a7iqvunarg.bin
