/* eslint-disable consistent-return */
import React, { useState } from 'react';
import {
  Link,
  Box,
  Flex,
  Text,
  Spacer,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import useAsyncEffect from 'use-async-effect';
import { getRecommendedGames } from '../app/api/fetchApi';

function Recommendations() {
  const [states, setStates] = useState({
    games: [],
    loading: true,
    error: false,
  });

  useAsyncEffect(async (isActive) => {
    try {
      const data = await getRecommendedGames();
      const firstSix = data.slice(0, 6);
      setStates({
        ...states,
        games: firstSix,
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
  return (
    <Flex flexWrap="wrap" mt="6" justify="center" w="full">
      {(!states.loading && states.games.length > 0) && states.games.map((game) => (
        <Link
          as={NextLink}
          href={`/game/${game.id}`}
          key={game.id}
          variant="link"
          color="white"
          cursor="pointer"
          justify="center"
          alignSelf="center"
          p="3"
          _hover={{ textDecoration: 'none', transform: 'scale(1.05)', transition: 'all .2s ease-in-out' }}
        >
          <Flex flexWrap="wrap" w="400px" pb="5" justifyContent="flex-start" bg="whiteAlpha.300" color="whiteAlpha.700">
            <Box>
              <Image src={game.thumbnail} width={400} height={260} alt="image" />
            </Box>
            <Box ml={[6, 2, 2, 2]} w="full" mr="6">
              <Text fontSize="md" pt="2">
                {game.short_description.length > 40 ? `${game.short_description.substring(0, 40)}...` : game.short_description}
              </Text>
              <Text fontWeight="bold" fontSize="lg">{game.title}</Text>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontWeight="bold" fontSize="lg">{game.release_date}</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize="lg">{game.publisher}</Text>
              </Flex>
            </Box>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
}

export default Recommendations;
