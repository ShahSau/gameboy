/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

'use client';

import React, { useState } from 'react';
import {
  Stack, Text, Link, Button, Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import useAsyncEffect from 'use-async-effect';
import InputBox from '../../components/Input';
import { getAllGames } from '../api/fetchApi';
import Card from '../../components/Card';

function Page() {
  const [states, setStates] = useState({
    games: [],
    loading: true,
    error: false,
    input: '',
  });
  useAsyncEffect(async (isActive) => {
    try {
      const data = await getAllGames();

      setStates({
        ...states,
        games: data,
        loading: false,
      });
    } catch (error) {
      setStates({
        ...states,
        loading: false,
        error: true,
      });
    }

    if (!isActive()) return null;
  }, []);

  const handleSearch = (e) => {
    const input = e;
    setStates({
      ...states,
      input,
    });
  };
  const filterData = (data) => {
    const filteredData = data.filter((game) => (
      game.title.toLowerCase().includes(states.input.toLowerCase())
    ));
    return filteredData;
  };
  return (
    <>
      {(!states.loading && states.games.length !== 0)
    && (
    <>
      <InputBox parentFunction={handleSearch} />
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap="0"
        flexWrap="wrap"
        mt="10"
      >
        {filterData(states.games).length !== 0
          ? filterData(states.games).map((data, index) => (
            <Card key={index} details={data} />
          ))
          : (
            <Text
              mt={2}
              mb={20}
              textAlign="center"
              color="white"
              fontWeight={700}
              lineHeight={1.2}
              fontSize="3xl"
            >
              Oops.. No results found
            </Text>
          )}
      </Stack>
    </>
    )}
      {(states.error && !states.loading) && (
      <Flex justifyContent="center" alignItems="center" flexDir="column" marginTop="5" marginBottom="5">
        <Text fontSize="xl" marginTop="3">This was not suppose to happen!</Text>
        <Link as={NextLink} href="/" variant="link" color="white" cursor="pointer" justify="center" alignSelf="center">
          <Button bg="whiteAlpha.300" rounded="full" color="whiteAlpha.700" _hover={{ bg: 'whiteAlpha.500' }}>
            Home page
          </Button>
        </Link>
      </Flex>
      )}
    </>
  );
}

export default Page;
