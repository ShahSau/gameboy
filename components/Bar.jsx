'use client';

import React from 'react';
import {
  Stack, Text, Button, Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

function Bar() {
  return (
    <Stack p="4" boxShadow="dark-lg" m="4" borderRadius="sm">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: 'sm' }} textAlign="left" maxW="4xl">
          Get details of games numbers of free to play games.
          Track what you have played and search for what to play next!
          {' '}
          <br />
          The game data is provides by
          {' '}
          <Link href="https://rapidapi.com/digiwalls/api/free-to-play-games-database"> Free-to-Play Games Database </Link>
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }}>
          <Link as={NextLink} href="/search" variant="link" color="white" cursor="pointer" justify="center" alignSelf="center">
            <Button bg="whiteAlpha.300" rounded="full" color="whiteAlpha.700" _hover={{ bg: 'whiteAlpha.500' }}>
              More games
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Bar;
