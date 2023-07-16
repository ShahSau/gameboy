'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { Flex, Box, Text, Icon,Stack,    Spinner, } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import { Input } from '@chakra-ui/react';
import InputBox from '../../components/Input'
import {getAllGames} from '../api/fetchApi'
import useAsyncEffect from 'use-async-effect'
import Card from '../../components/Card';

const Page = () => {
  const [states, setStates] = useState({
    games: [],
    loading: true,
    error: false,
    input: '',
  });
  useAsyncEffect(
    async isActive =>{
      try{
        const data = await getAllGames()

        setStates({
            ...states,
            games: data,
            loading: false,
        })
      }catch(error){
        setStates({
            ...states,
            loading: false,
            error: true,
        })
      }

      if (!isActive()) return;
    },[]  
  )

  // showing first 50 games on initial load
  if(states.input==''){
    states.games = states.games.slice(0, 50)
  }

  return (
    <>
    {(!states.loading && states.games.length!==0) &&
    <>
      <InputBox/>
      {/* <Text fontSize='xl' marginBottom='2' marginTop='10' fontWeight='bold' color='whiteAlpha.700' >Search Results: </Text> */}
      <Stack 
        direction={{ base: 'column', md: 'row' }}
        gap='0'
        flexWrap='wrap'
        mt='10'
      >
        {states.games.map((data, index) =>(
          <Card key={index} details={data}/>
        ))}
      </Stack>
    </>
    }
    {states.loading && <Spinner size='xl' m='44' color='whiteAlpha.700' thickness='4px' />}
    </>
  )
}

export default Page