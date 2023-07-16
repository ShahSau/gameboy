/* eslint-disable no-return-await */
export const getRecommendedGames = async () => {
  const myHeaders = new Headers();
  myHeaders.append('X-RapidAPI-Key', '09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216');
  myHeaders.append('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance', requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getTodayGames = async () => {
  const myHeaders = new Headers();
  myHeaders.append('X-RapidAPI-Key', '09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216');
  myHeaders.append('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity', requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getRecentGames = async () => {
  const myHeaders = new Headers();
  myHeaders.append('X-RapidAPI-Key', '09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216');
  myHeaders.append('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date', requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getDetails = async ({ id }) => {
  const myHeaders = new Headers();
  myHeaders.append('X-RapidAPI-Key', '09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216');
  myHeaders.append('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getSuggestion = async ({ type }) => {
  const myHeaders = new Headers();
  myHeaders.append('X-RapidAPI-Key', '09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216');
  myHeaders.append('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${type}`, requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};

export const getAllGames = async () => {
  const myHeaders = new Headers();
  myHeaders.append('X-RapidAPI-Key', '09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216');
  myHeaders.append('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', requestOptions);

  if (!res.ok) {
    throw (await res.json());
  }

  return await res.json();
};
