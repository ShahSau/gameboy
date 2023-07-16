

export const getRecommendedGames = async () => {
    let myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Key", "09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216");
    myHeaders.append("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    };

    const res = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance", requestOptions)

    if(!res.ok){
        throw (await res.json())
      }
     
    return await res.json()

}

export const getTodayGames = async () => {
    let myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Key", "09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216");
    myHeaders.append("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    };

    const res = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity", requestOptions)

    if(!res.ok){
        throw (await res.json())
      }
     
    return await res.json()

}

export const getRecentGames = async () => {
    let myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Key", "09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216");
    myHeaders.append("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    };

    const res = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date", requestOptions)

    if(!res.ok){
        throw (await res.json())
      }
     
    return await res.json()

}


export const getDetails = async ({id}) => {
  let myHeaders = new Headers();
  myHeaders.append("X-RapidAPI-Key", "09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216");
  myHeaders.append("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");

  let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  };

  const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, requestOptions)

  if(!res.ok){
      throw (await res.json())
    }
   
  return await res.json()

}

export const getSuggestion = async ({type}) => {
  let myHeaders = new Headers();
  myHeaders.append("X-RapidAPI-Key", "09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216");
  myHeaders.append("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");

  let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  };

  const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${type}`, requestOptions)

  if(!res.ok){
      throw (await res.json())
    }
   
  return await res.json()

}

export const getAllGames = async () => {
  let myHeaders = new Headers();
  myHeaders.append("X-RapidAPI-Key", "09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216");
  myHeaders.append("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");

  let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  };

  const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games`, requestOptions)

  if(!res.ok){
      throw (await res.json())
    }
   
  return await res.json()

}