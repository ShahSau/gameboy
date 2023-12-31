/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */

'use client';

import React from 'react';
import {
  Box, Text, Stack, Image, Heading, Link,
} from '@chakra-ui/react';
import { BsWindows, BsBrowserChrome } from 'react-icons/bs';
import NextLink from 'next/link';

function Card({ details }) {
  return (
    <Link
      as={NextLink}
      href={`/game/${details.id}`}
      key={details.id}
      variant="link"
      color="white"
      cursor="pointer"
      _hover={{ textDecoration: 'none', transform: 'scale(1.05)', transition: 'all .2s ease-in-out' }}
    >
      <Box
        role="group"
        p={6}
        ml={[6, 20, 22, 0]}
        mr={[0, 0, 8, 0]}
        mt="12"
        maxW={['320px', '350px', '360px', '320px']}
        w="full"
        boxShadow="2xl"
        rounded="lg"
        pos="relative"
        zIndex={1}
      >
        <Box
          rounded="lg"
          mt={-12}
          pos="relative"
          height="230px"
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${details.thumbnail})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded="lg"
            height={230}
            width={282}
            objectFit="cover"
            src={details.thumbnail}
            alt="image"
          />
        </Box>
        <Stack pt={10} align="center">
          <Text color="gray.500" fontSize="sm" textTransform="">
            {details.short_description.length > 30 ? `${details.short_description.substring(0, 30)}...` : details.short_description}
          </Text>
          <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
            {details.title}
          </Heading>
          <Stack direction="row" align="center">
            <Text fontWeight={800} fontSize="xl">
              { details.platform === 'PC (Windows), Web Browser'
                ? (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >
                    <BsWindows />
                    {' '}
                    <BsBrowserChrome />
                  </Stack>
                )
                : details.platform === 'PC (Windows)' ? <BsWindows /> : <BsBrowserChrome />}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Link>
  );
}

export default Card;
