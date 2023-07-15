'use client'
import Bar from '../components/Bar';
import Header from '../components/Header'
import {Text, Grid, GridItem} from '@chakra-ui/react';
import Recommendations from '../components/Recommendations'
import Section from '../components/Section'

const Home=()=> {
  return (
    <div>
      <Header />
      <Text color='whiteAlpha.700' fontSize='4xl' fontWeight='medium'  mt='20'>Top Recommendations</Text>
      <Recommendations />
      <Section />
    </div>
  )
}

export default Home
