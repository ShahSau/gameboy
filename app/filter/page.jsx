/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */

'use client';

import React, { useState } from 'react';
import {
  Flex, Box, Text, Icon, Select, Link, Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { BsFilter } from 'react-icons/bs';
import useAsyncEffect from 'use-async-effect';
import { useSearchParams } from 'next/navigation';
import Card from '../../components/Card';
import { getFilteredGames } from '../api/fetchApi';
import { filterOptions } from '../../utils/filterOptions';

function SearchFilters({
  filters, changeFilter, platform, category, sort,
}) {
  return (
    <Flex p="4" justifyContent="center" flexWrap="wrap" transition="all .2s ease-in-out">
      {filters?.map((filter) => {
        if (filter.page === 'filter' && filter.placeholder === 'Platform') {
          return (
            <Box key={filter.queryName}>
              <Select onChange={(e) => changeFilter(e, [filter.queryName])} placeholder={platform === '' ? filter[0] : platform} bg="whiteAlpha.200" w="fit-content" p="2">
                {filter?.items?.map((item) => (
                  item.value !== platform && (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                  )
                ))}
              </Select>
            </Box>
          );
        }
        if (filter.page === 'filter' && filter.placeholder === 'Favourite Categories') {
          return (
            <Box key={filter.queryName}>
              <Select onChange={(e) => changeFilter(e, [filter.queryName])} placeholder={category === '' ? 'All Categories' : category} bg="whiteAlpha.200" w="fit-content" p="2">
                {filter?.items?.map((item) => (
                  item.value !== category && (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                  )
                ))}
              </Select>
            </Box>
          );
        }
        if (filter.page === 'filter' && filter.placeholder === 'Sorting') {
          return (
            <Box key={filter.queryName}>
              <Select onChange={(e) => changeFilter(e, [filter.queryName])} placeholder={sort === '' ? 'Sorting By' : sort} bg="whiteAlpha.200" w="fit-content" p="2">
                {filter?.items?.map((item) => (
                  item.value !== sort && (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                  )
                ))}
              </Select>
            </Box>
          );
        }
      })}
    </Flex>
  );
}

function Page() {
  const searchname = useSearchParams();
  const [fetchError, setFetchError] = useState(false);
  const [searchFilters, setSearchFilters] = useState(true);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters] = useState(filterOptions);
  const [platform, setPlatform] = useState(searchname.get('platform') ?? '');
  const [category, setCategory] = useState(searchname.get('category') ?? '');
  const [sort, setSort] = useState('');

  useAsyncEffect(async (isActive) => {
    try {
      const data = await getFilteredGames({
        platform, category, sort,
      });
      setGames(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setFetchError(error);
    }

    if (!isActive()) return null;
  }, [sort, platform, category]);

  const changeFilter = (e, queryName) => {
    if (queryName[0] === 'platform') {
      setPlatform(e.target.value);
    }

    if (queryName[0] === 'category') {
      setCategory(e.target.value);
    }

    if (queryName[0] === 'sort') {
      setSort(e.target.value);
    }
  };
  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor="pointer"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Search games By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && (
      <SearchFilters
        filters={filters}
        changeFilter={changeFilter}
        platform={platform}
        category={category}
        sort={sort}
      />
      )}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Games
      </Text>
      <Flex flexWrap="wrap">
        {games.map((game) => <Card key={game.id} details={game} sort={sort} />)}

      </Flex>
      {(games.length === 0 && !loading) && (
        <Flex justifyContent="center" alignItems="center" flexDir="column" marginTop="5" marginBottom="5">
          <Text fontSize="xl" marginTop="3">No Result Found.</Text>
        </Flex>
      )}
      {(fetchError && !loading) && (
        <Flex justifyContent="center" alignItems="center" flexDir="column" marginTop="5" marginBottom="5">
          <Text fontSize="xl" marginTop="3">This was not suppose to happen!</Text>
          <Link as={NextLink} href="/" variant="link" color="white" cursor="pointer" justify="center" alignSelf="center">
            <Button bg="whiteAlpha.300" rounded="full" color="whiteAlpha.700" _hover={{ bg: 'whiteAlpha.500' }}>
              Home page
            </Button>
          </Link>
        </Flex>
      )}
    </Box>
  );
}

export default Page;
