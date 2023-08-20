/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import NextLink from 'next/link';
import {
  Text,
  Spacer,
  Heading,
  Stack,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
} from '@chakra-ui/react';
// import { BsWindows, BsBrowserChrome } from 'react-icons/bs';
import { getRecentGames } from '../app/api/fetchApi';

function RecentlyAdded() {
  const [states, setStates] = useState({
    games: [],
    loading: true,
    error: false,
  });

  useAsyncEffect(async (isActive) => {
    try {
      const data = await getRecentGames();
      const firstSix = data.slice(1, 7);
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
    <>
      {(!states.loading && states.games.length > 0)
        && (
        <>
          <Text color="whiteAlpha.700" fontSize="4xl" fontWeight="medium" mt="4" mb="4">Recently Added</Text>
          {states.games.map((game, index) => (
            <Link
              as={NextLink}
              href={`/game/${game.id}`}
              key={game.id}
              variant="link"
              color="white"
              cursor="pointer"
              _hover={{ textDecoration: 'none' }}
            >
              <Card
                direction={{ base: 'column', sm: 'row' }}
                key={index}
                mb="4"
                bg="whiteAlpha.300"
                border="none"
                color="whiteAlpha.700"
                boxShadow="dark-lg"
                _hover={{ transform: 'scale(1.05)', transition: 'all .2s ease-in-out' }}
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: '100%', sm: '200px' }}
                  src={game.thumbnail}
                  alt="recent Games"
                />
                <Stack>
                  <CardBody>
                    <Heading size="md">{game.title}</Heading>
                    <Text py="2">
                      { game.short_description}
                    </Text>
                  </CardBody>
                  <CardFooter justifyContent="space-between">
                    <Button
                      bg="whiteAlpha.300"
                      rounded="full"
                      color="whiteAlpha.700"
                      _hover={{ bg: 'whiteAlpha.500' }}
                      variant="solid"
                    >
                      {game.genre}
                    </Button>
                    <Spacer />
                    {/*
                    <Text fontWeight="bold" mt="2" fontSize="xl">{game.platform === 'PC (Windows)'
                    ? <BsWindows /> : <BsBrowserChrome /> }</Text>
                    */}
                  </CardFooter>
                </Stack>
              </Card>
            </Link>
          ))}
        </>
        )}
    </>
  );
}

export default RecentlyAdded;
