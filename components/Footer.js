'use client'
import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    Button,
  } from '@chakra-ui/react';
  import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
  import { ReactNode } from 'react';
  import Image from 'next/image'
  
  const SocialButton = ({
    children,
    label,
    href,
  }) => {
    return (
      <Button
        bg='transparent'
        color='whiteAlpha.700'
        rounded={'full'}
        size='md'
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </Button>
    );
  };
  
const Footer=()=> {
    return (
      <Box
        bg='transparent'
        >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Image  
            alt='Gameboy Logo'
            className='object-contain'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Nintendo_Game_Boy_Logo.svg/1280px-Nintendo_Game_Boy_Logo.svg.png" 
            width={100} 
            height={50}
          />
          <Text>© {new Date().getFullYear() } GameBoy. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'https://twitter.com/saurov_shahriar'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'Github'} href={'https://github.com/ShahSau'}>
              <FaGithub />
            </SocialButton>
            <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/in/shahriar-saurov/'}>
              <FaLinkedin />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    );
  }

export default Footer;
