/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-await */
const myHeaders = new Headers();
myHeaders.append('X-RapidAPI-Key', '09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216');
myHeaders.append('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

export const getRecommendedGames = async () => {
  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance', requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getTodayGames = async () => {
  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity', requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getRecentGames = async () => {
  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date', requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getDetails = async ({ id }) => {
  const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getSuggestion = async ({ type }) => {
  const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${type}`, requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getAllGames = async () => {
  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getFilteredGames = async ({ platform, category, sort }) => {
  const newrequestOptions = {
    method: 'GET',
    headers: myHeaders,
    params: {},
  };
  let url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?';

  if (platform !== '') {
    url += `&platform=${platform}`;
  }
  if (category !== '') {
    url += `&category=${category}`;
  }
  if (sort !== '') {
    url += `&sort-by=${sort}`;
  }

  const res = await fetch(url, newrequestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};
