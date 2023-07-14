'use client'
import { Box } from '@chakra-ui/layout';

const year = new Date().getFullYear();
const Footer = () => (

  <Box textAlign='center' p='5' color='white.600' borderTop='1px' borderColor='gray.100'>
    Made with ❤️ from Finland. <br /> © {year} Gameboy
  </Box>
);

export default Footer;