/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

'use client';

import React from 'react';
import { Text } from '@chakra-ui/react';
import Header from '../components/Header';
import Recommendations from '../components/Recommendations';
import Section from '../components/Section';

function Home() {
  return (
    <div>
      <Header />
      <Text color="whiteAlpha.700" fontSize="4xl" fontWeight="medium" mt="20">Top Recommendations</Text>
      <Recommendations />
      <Section />
    </div>
  );
}

export default Home;
