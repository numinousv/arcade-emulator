export interface Game {
  id: string;
  name: string;
  core: string;
  url: string;
  cover: string;
}

export const GAMES: Game[] = [
  {
    id: "banjo",
    name: "Banjo-Kazooie",
    core: "n64",
    url: "https://files.catbox.moe/qewlxt.z64",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/1/11/Banjo_Kazooie_Cover.png",
  },
  {
    id: "golden-sun",
    name: "Golden Sun",
    core: "gba",
    url: "https://deadarchivelinkkeklmaoyes.org",
    // url: (
    //   "https://archive.org/download/gameboycollection/Gameboy%20Megapack%20roms/Nintendo%20-%20Game%20Boy%20Advance/Golden%20Sun%20%28USA%2C%20Europe%29.gba",
    // ),
    cover:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.nintendolife.com",
  },
];
