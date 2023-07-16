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

function InputBox() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('initial');
  // eslint-disable-next-line no-unused-vars
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
        // bg={useColorModeValue('white', 'whiteAlpha.100')}
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
          onSubmit={(e) => {
            e.preventDefault();
            setError(false);
            setState('submitting');

            // remove this code and implement your submit logic right here
            // setTimeout(() => {
            //   if (email === 'fail@example.com') {
            //     setError(true);
            //     setState('initial');
            //     return;
            //   }

            //   setState('success');
            // }, 1000);
          }}
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
              id="email"
              type="email"
              // focusBorderColor='red'
              placeholder="Search..."
              aria-label="Search"
              value={email}
              disabled={state !== 'initial'}
              onChange={(e) => {
                setEmail(e.target.value);
                // console.log(e.target.value);
              }}
            />
          </FormControl>
          {/* <FormControl w={{ base: '100%', md: '40%' }}> */}
          {/* <Button
              colorScheme={state === 'success' ? 'green' : 'blue'}
              isLoading={state === 'submitting'}
              w="100%"
              type={state === 'success' ? 'button' : 'submit'}>
              {state === 'success' ? 'check' : 'Submit'}
            </Button> */}
          {/* </FormControl> */}
        </Stack>
        {/* <Text
          mt={2}
          textAlign={'center'}
          color={error ? 'red.500' : 'gray.500'}>
          {error
            ? 'Oh no an error occured! 😢 Please try again later.'
            : "You won't receive any spam! ✌️"}
        </Text> */}
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
