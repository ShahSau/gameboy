/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */

'use client';

import React from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

const ChakraUiProvider = ({ children }) => (
  <CacheProvider>
    <ChakraProvider>{children}</ChakraProvider>
  </CacheProvider>
);

export default ChakraUiProvider;
