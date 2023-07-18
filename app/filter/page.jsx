/* eslint-disable consistent-return */

'use client';

import React, { useState } from 'react';
// import Image from 'next/image';
import {
  Flex, Box, Text, Icon,
} from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
import useAsyncEffect from 'use-async-effect';
// import SearchFilters from '../../components/SearchFilters';
// import Property from '../../components/Property';
// import noresult from '../../assets/images/noresult.svg';
import { useSearchParams } from 'next/navigation';
import Card from '../../components/Card';
import { getFilteredGames } from '../api/fetchApi';

function Page() {
  const [searchFilters, setSearchFilters] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchname = useSearchParams();

  const platform = searchname.get('platform') ?? '';
  const category = searchname.get('category') ?? '';
  const sort = '';

  useAsyncEffect(async (isActive) => {
    try {
      const data = await getFilteredGames({
        platform, category, sort,
      });
      setGames(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

    if (!isActive()) return null;
  }, [games]);

  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {/* {searchFilters && <SearchFilters />} */}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties for sale
      </Text>
      <Flex flexWrap="wrap">
        {games.map((game) => <Card key={game.id} details={game} />)}

      </Flex>
      {(games.length === 0 && !loading) && (
        <Flex justifyContent="center" alignItems="center" flexDir="column" marginTop="5" marginBottom="5">
          <Text fontSize="xl" marginTop="3">No Result Found.</Text>
        </Flex>
      )}
    </Box>
  );
}

export default Page;
