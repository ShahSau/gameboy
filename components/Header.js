'use client'
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link'

const Header = () => {
    return(
        <Flex
            w={'full'}
            h={'300px'}
            backgroundImage={
                'url(https://www.freetogame.com/assets/images/paladins.png)'
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Text
                        color={'whiteAlpha.700'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        Browse the best free to play games
                    </Text>
                    <Link as={NextLink} href='/search' variant='link' color='white' cursor='pointer' justify={'center'} alignSelf={'center'}>
                        <Button
                            bg={'whiteAlpha.300'}
                            rounded={'full'}
                            color={'whiteAlpha.700'}
                            _hover={{ bg: 'whiteAlpha.500' }}>
                            Browse Games
                        </Button>
                    </Link>
                </Stack>
            </VStack>
        </Flex>
    )

}

export default Header;