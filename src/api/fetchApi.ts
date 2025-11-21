import axios from 'axios';

interface GameIdArgs {
  id: number | string;
}

interface SuggestionArgs {
  type: string;
}

interface FilterArgs {
  platform?: string;
  category?: string;
  sort?: string;
}

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

const apiClient = axios.create({
  baseURL: 'https://free-to-play-games-database.p.rapidapi.com/api',
  headers: {
    'X-RapidAPI-Key': '09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216', // Note: Move this to .env in production
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
  },
});


export const getTradingGames = async (): Promise<Game[]> => {
  try{
    const { data } = await apiClient.get<Game[]>('/games', {
    params: { 'sort-by': 'popularity' },
  });
  return data;
  }
  catch(error){
    console.error("Error fetching trading games:", error);
    return [];
  }
};

export const getRecentGames = async (): Promise<Game[]> => {
  try{
    const { data } = await apiClient.get<Game[]>('/games', {
    params: { 'sort-by': 'release-date' },
  });
  return data;
  }
  catch(error){
    console.error("Error fetching recent games:", error);
    return [];
  }
};

export const getMostPlayedGames = async (): Promise<Game[]> => {
  try{
    const { data } = await apiClient.get<Game[]>('/games', {
    params: { 'sort-by': 'alphabetical' },
  });
  return data;
  }
  catch(error){
    console.error("Error fetching most played games:", error);
    return [];
  }
};

export const getRecommendedGames = async (): Promise<Game[]> => {
  const { data } = await apiClient.get<Game[]>('/games', {
    params: { 'sort-by': 'relevance' },
  });
  return data;
};


// export const getDetails = async ({ id }: GameIdArgs): Promise<Game> => {
//   const { data } = await apiClient.get<Game>('/game', {
//     params: { id },
//   });
//   return data;
// };

// export const getSuggestion = async ({ type }: SuggestionArgs): Promise<Game[]> => {
//   const { data } = await apiClient.get<Game[]>('/games', {
//     params: { category: type },
//   });
//   return data;
// };

// export const getAllGames = async (): Promise<Game[]> => {
//   const { data } = await apiClient.get<Game[]>('/games');
//   return data;
// };

// export const getFilteredGames = async ({ platform, category, sort }: FilterArgs): Promise<Game[]> => {
//   const params: Record<string, string> = {};

//   if (platform) params.platform = platform;
//   if (category) params.category = category;
//   if (sort) params['sort-by'] = sort;

//   const { data } = await apiClient.get<Game[]>('/games', { params });
//   return data;
// };