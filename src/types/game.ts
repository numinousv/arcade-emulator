export interface Game {
  fileId: string;
  id: string;
  name: string;
  core: string;
  url: string;
  cover?: string;
  description?: string;
  tags?: string[];
}