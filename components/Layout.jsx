/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */

'use client';

import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>GameBoy</title>
      </Head>
      <Box maxWidth="1280px" m="auto">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
}

export default Layout;
