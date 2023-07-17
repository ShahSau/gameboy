/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Stack,
  FormControl,
  Input,
  Heading,
  Text,
  Container,
  Flex,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

function InputBox({ parentFunction }) {
  const [input, setInput] = useState('');
  const [state, setState] = useState('initial');
  const [error, setError] = useState(false);

  return (
    <Flex
      minH="50vh"
      align="center"
      justify="center"
      rounded="xl"
      backgroundImage="url(https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80)"
    >
      <Container
        maxW="lg"
        bg="transparent"
        boxShadow="xl"
        rounded="lg"
        p={6}
        direction="column"
      >
        <Heading
          as="h2"
          fontSize={{ base: 'xl', sm: '2xl' }}
          textAlign="center"
          color="whiteAlpha.700"
          mb={5}
        >
          Discover the best free-to-play games!
        </Heading>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          as="form"
          spacing="12px"
        >
          <FormControl justifyContent="center" alignItems="center">
            <Input
              variant="solid"
              borderWidth={1}
              color="whiteAlpha.700"
              bg="whiteAlpha.300"
              _placeholder={{
                color: 'gray.400',
              }}
              borderColor="whiteAlpha.700"
              id="input"
              type="input"
              placeholder="Search..."
              aria-label="Search"
              value={input}
              disabled={state !== 'initial'}
              onChange={(e) => {
                setInput(e.target.value);
                parentFunction(e.target.value);
              }}
            />
          </FormControl>
        </Stack>
        <Link as={NextLink} href="/filter" variant="link" color="whiteAlpha.700" cursor="pointer">
          <Text
            mt={2}
            textAlign="center"
            color="whiteAlpha.700"
          >
            or search by filters
          </Text>
        </Link>
      </Container>
    </Flex>
  );
}

export default InputBox;
