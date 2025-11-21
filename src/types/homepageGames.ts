export interface HomePageGames {
  id: number;
  title: string;
  thumbnail: string;
  platform: string;
  release_date: string;
  short_description: string;
  genre: string;
  onClick?: () => void;
}