/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

'use client';

import React, { useState } from 'react';
import { Stack, Spinner } from '@chakra-ui/react';
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

  // showing first 50 games on initial load
  if (states.input === '') {
    states.games = states.games.slice(0, 50);
  }

  return (
    <>
      {(!states.loading && states.games.length !== 0)
    && (
    <>
      <InputBox />
      {/* <Text fontSize='xl' marginBottom='2'
       marginTop='10' fontWeight='bold' color='whiteAlpha.700' >Search Results: </Text> */}
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap="0"
        flexWrap="wrap"
        mt="10"
      >
        {states.games.map((data, index) => (
          <Card key={index} details={data} />
        ))}
      </Stack>
    </>
    )}
      {states.loading && <Spinner size="xl" m="44" color="whiteAlpha.700" thickness="4px" />}
    </>
  );
}

export default Page;
