'use client'
import React from 'react';
import { Stack, Text, Button,  Link, } from '@chakra-ui/react';
import NextLink from 'next/link'
const Bar = () => {
  return (
    <Stack p="4" boxShadow="dark-lg" m="4" borderRadius="sm" >
        <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between">
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
            
            but also the leap into electronic typesetting, remaining essentially 
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop 
            publishing software like Aldus.

            
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }}>
        <Link as={NextLink} href='/search' variant='link' color='white' cursor='pointer' justify={'center'} alignSelf={'center'}>
            <Button bg={'whiteAlpha.300'} rounded={'full'} color={'whiteAlpha.700'} _hover={{ bg: 'whiteAlpha.500' }}>
                More games
            </Button>
        </Link>
        </Stack>
        </Stack>
    </Stack>
  )
}

export default Bar