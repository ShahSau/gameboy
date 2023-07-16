/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import Image from 'next/image';
import NextLink from 'next/link';
import {
  Link,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { getTodayGames } from '../app/api/fetchApi';

function MostPlayed() {
  const [states, setStates] = useState({
    games: [],
    loading: true,
    error: false,
  });
  useAsyncEffect(async (isActive) => {
    try {
      const data = await getTodayGames();
      const firstSix = data.slice(0, 6);
      setStates({
        ...states,
        games: firstSix,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      setStates({
        ...states,
        loading: false,
        error: true,
      });
    }

    if (!isActive()) return null;
  }, []);
  return (
    <>
      {(!states.loading && states.games.length > 0)
        && (
        <>
          <Text color="whiteAlpha.700" fontSize="4xl" fontWeight="medium" mt="6">Most Played Today</Text>
          <Box w="full">
            <Flex flexWrap="wrap" mt="6" justify="center" w="full" boxShadow="sm">
              {states.games.map((game, index) => (
                <Link
                  as={NextLink}
                  href={`/game/${game.id}`}
                  key={game.id}
                  variant="link"
                  color="white"
                  cursor="pointer"
                  marginBottom="4"
                  _hover={{ textDecoration: 'none', transform: 'scale(1.05)', transition: 'all .2s ease-in-out' }}
                >
                  {/* eslint-disable-next-line react/no-array-index-key */}
                  <Image src={game.thumbnail} width={400} height={260} alt="todayGames" key={index} />
                </Link>
              ))}

            </Flex>
          </Box>
        </>
        )}
    </>
  );
}

export default MostPlayed;
