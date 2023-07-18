/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */

'use client';

import React, { useState } from 'react';
import {
  Box, Flex, Text, Stat, Stack, StatNumber, StatLabel, useColorModeValue, SimpleGrid, Link, Button,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import useAsyncEffect from 'use-async-effect';
import Carousel from '../../../components/Carousels';
import { getDetails, getSuggestion } from '../../api/fetchApi';
import Card from '../../../components/Card';

const randomNum = (min, max) => {
  const n = [];
  for (let i = 0; i < 6; i++) {
    n.push(Math.floor(Math.random() * max) + min);
  }
  return n;
};

function Info({ role, data }) {
  return (
    <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="whiteAlpha.700" p="3">
      <Text>{role}</Text>
      <Text fontWeight="bold">{data}</Text>
    </Flex>
  );
}
function StatsCard({ title, stat }) {
  stat = stat === '?' ? 'unknown' : stat;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py="5"
      shadow="xl"
      border="1px solid"
      bg="whiteAlpha.200"
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded="lg"
    >
      <StatLabel fontSize="lg" isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize="lg" fontWeight="bold">
        {stat}
      </StatNumber>
    </Stat>
  );
}

function Page() {
  const [suggestion, setSuggestion] = useState([]);
  const [states, setStates] = useState({
    details: [],
    genre: 'shooter',
    loading: true,
    error: false,
  });

  const pathname = usePathname();
  const id = pathname.split('/')[2];

  const dataDetails = [
    {
      role: 'Developer',
      data: states.details.developer,
    },
    {
      role: 'Publisher',
      data: states.details.publisher,
    },
    {
      role: 'Status',
      data: states.details.status,
    },
    {
      role: 'Genre',
      data: states.details.genre,
    },
    {
      role: 'Platform',
      data: states.details.platform,
    },
    {
      role: 'Released on',
      data: states.details.release_date,
    },
  ];

  useAsyncEffect(async (isActive) => {
    try {
      const data = await getDetails({ id });
      setStates({
        ...states,
        details: data,
        genre: data.genre,
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

  useAsyncEffect(async (isActive) => {
    try {
      const type = states.genre;
      const data = await getSuggestion({ type });
      const numbers = randomNum(0, data.length);
      const uniqueNumbers = [...new Set(numbers)];
      setSuggestion([]);
      uniqueNumbers.map((num) => {
        setSuggestion((prevState) => [...prevState, data[num]]);
      });
    } catch (error) {
      setStates({
        ...states,
        loading: false,
        error: true,
      });
    }

    if (!isActive()) return null;
  }, [states.genre]);
  return (
    <>
      {states.details.length !== 0
        && (
        <Box maxWidth="1000px" margin="auto" p="4">
          <Carousel cards={states.details.screenshots} />
          <Box w="full" p="1">
            <Flex paddingTop="3" alignItems="center">
              <Text fontWeight="bold" fontSize="2xl" color="whiteAlpha.700" lineHeight="110%">{states.details.title}</Text>
            </Flex>
          </Box>
          <Box marginTop="4">
            <Text fontSize="lg" marginBottom="2" fontWeight="bold" color="whiteAlpha.700">
              About
              {states.details.title}
              :
            </Text>
            <Text lineHeight="2" color="whiteAlpha.700">{states.details.description}</Text>
          </Box>
          <Text fontSize="lg" marginBottom="2" marginTop="10" fontWeight="bold" color="whiteAlpha.700">Additional Info:</Text>
          <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between" color="whiteAlpha.700">
            {dataDetails.map((data, index) => (
              <Info key={index} role={data.role} data={data.data} />
            ))}
          </Flex>
          {states.details?.minimum_system_requirements && <Text fontSize="lg" marginBottom="2" marginTop="10" fontWeight="bold" color="whiteAlpha.700">Minimum System Requirements:</Text>}
          <Box maxW="7xl" mx="auto" pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
              {states.details?.minimum_system_requirements
              && Object.entries(states.details?.minimum_system_requirements).map((data, index) => (
                <StatsCard title={data[0]} stat={data[1]} key={index} />
              ))}
            </SimpleGrid>
          </Box>
          <Text fontSize="lg" marginBottom="2" marginTop="10" fontWeight="bold" color="whiteAlpha.700">People also viewd:</Text>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            gap="0"
            flexWrap="wrap"
          >
            {suggestion.map((data, index) => (
              <Card key={index} details={data} />
            ))}
          </Stack>
        </Box>
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
