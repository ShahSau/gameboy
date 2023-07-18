/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */

'use client';

import React from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// const styles = {
//   global: () => ({
//     body: {
//       colors: {
//         white: 'gray.800',
//       },
//     },
//   }),
// };
// const theme = extendTheme({
//   styles,
// });
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
const theme = extendTheme({ config });
const ChakraUiProvider = ({ children }) => (
  <CacheProvider theme={theme}>
    <ChakraProvider>{children}</ChakraProvider>
  </CacheProvider>
);

export default ChakraUiProvider;
