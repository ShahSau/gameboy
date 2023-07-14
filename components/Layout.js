'use client'
import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import Footer from './Footer';
// import Navbar from './Navbar';

const  Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>GameBoy</title>
      </Head>
      <Box maxWidth='1280px' m='auto'>
        <header>
          {/* <Navbar /> */}
          Navbar
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