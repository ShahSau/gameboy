export const filterOptions = [
    {
      items: [
        { name: 'PC', value: 'pc' },
        { name: 'Browser', value: 'browser' },
      ],
      placeholder: 'Platform',
      queryName: 'platform',
    },
    {
      items: [
        { name: 'Mmorpg', value: 'mmorpg' },
        { name: 'Shooter', value: 'shooter' },
        { name: 'Strategy', value: 'strategy' },
        { name: 'Racing', value: 'racing' },
        { name: 'SciFi', value: 'sci-fi' },
        { name: 'Anime', value: 'anime' },
        { name: 'Fantasy', value: 'fantasy' },
        { name: 'Sports', value: 'sports' },
        { name: 'Social', value: 'social' },
      ],
      placeholder: 'Favourite Categories',
      queryName: 'category',
    },
  ];


  export const getFilterValues = (filterValues) => {
    const { platform, category } = filterValues;
    const values =[
        { name: 'Platform', value: platform },
        { name: 'Favourite Categories', value: category },
    ]
    return values;
    }



