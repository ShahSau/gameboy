export const filterOptions = [
  {
    items: [
      { name: 'PC', value: 'pc' },
      { name: 'Browser', value: 'browser' },
    ],
    placeholder: 'Platform',
    queryName: 'platform',
    page: 'Nav',
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
    page: 'Nav',
  },
  {
    items: [
      { name: 'all', value: 'all' },
      { name: 'pc', value: 'pc' },
      { name: 'browser', value: 'browser' },
    ],
    placeholder: 'Platform',
    queryName: 'platform',
    page: 'filter',
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
    page: 'filter',
  },
  {
    items: [
      { name: 'Release Date', value: 'release-date' },
      { name: 'Popularity', value: 'popularity' },
      { name: 'Alphabetical', value: 'alphabetical' },
    ],
    placeholder: 'Sorting',
    queryName: 'sort',
    page: 'filter',
  },
];

export const getFilterValues = (filterValues) => {
  const { platform, category } = filterValues;
  const values = [
    { name: 'Platform', value: platform },
    { name: 'Favourite Categories', value: category },
  ];
  return values;
};
