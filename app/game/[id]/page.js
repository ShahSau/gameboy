'use client'
import React, {useState} from 'react'
import { Box, Flex, Spacer, Text, Stat, StatNumber,StatLabel, Spinner,useColorModeValue,SimpleGrid} from '@chakra-ui/react';
import { BsWindows,BsBrowserChrome } from 'react-icons/bs';
import { Avatar } from '@chakra-ui/avatar';
import { usePathname } from 'next/navigation';
import Carousel from '../../../components/Carousels';
import {getDetails,getSuggestion} from '../../../app/api/fetchApi'
import useAsyncEffect from 'use-async-effect'
import Card from '../../../components/Card';

const randomNum=(min, max)=> { 
    let n = []; 
    for(var i=0;i<6;i++){ 
    n.push(Math.floor(Math.random() * max) + min); 
    } 
    return n; 
}

const Info = ({role, data}) =>{
    return(
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='whiteAlpha.700' p='3'>
            <Text>{role}</Text>
            <Text fontWeight='bold'>{data}</Text>
        </Flex>
    )
}
const StatsCard=({ title, stat })=> {
    stat = stat === '?' ? 'unknown' : stat
    return (
      <Stat
        px={{ base: 4, md: 8 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        bg='whiteAlpha.200'
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <StatLabel fontSize={'lg'} isTruncated>
          {title}
        </StatLabel>
        <StatNumber fontSize={'lg'} fontWeight='bold'>
          {stat}
        </StatNumber>
      </Stat>
    );
  }

const Page =() =>{
    const [suggestion, setSuggestion] = useState([])

    const [states, setStates] = useState({
        details: [],
        genre: 'shooter',
        loading: true,
        error: false,
    });

    const pathname = usePathname()
    const id = pathname.split('/')[2]

    const dataDetails = [
        {
            role: 'Developer',
            data: states.details.developer
        },
        {
            role: 'Publisher',
            data: states.details.publisher
        },
        {
            role: 'Status',
            data: states.details.status
        },
        {
            role: 'Genre',
            data: states.details.genre
        },
        {
            role: 'Platform',
            data: states.details.platform
        },
        {
            role: 'Released on',
            data: states.details.release_date
        },
    ]

    useAsyncEffect(
        async isActive =>{
          try{
            const data = await getDetails({id})
            setStates({
                ...states,
                details: data,
                genre: data.genre,
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

    useAsyncEffect(
        async isActive =>{
          try{
            const type = states.genre
            const data = await getSuggestion({type})
            let numbers = randomNum(0, data.length)
            let uniqueNumbers = [...new Set(numbers)];
            setSuggestion([])
            uniqueNumbers.map((num)=>{
                setSuggestion(prevState => [...prevState, data[num]])
                
            })
          }catch(error){
            console.log(error)
          }
    
          if (!isActive()) return;
        },[states.genre]  
    )
    return(
        <>
        {states.details.length !== 0 && 
        <Box maxWidth='1000px' margin='auto' p='4'>
            <Carousel cards={states.details.screenshots}/>
            <Box w='full' p='1'>
                <Flex paddingTop='3' alignItems='center'>
                    <Text fontWeight='bold' fontSize='2xl' color='whiteAlpha.700' lineHeight='110%'>{states.details.title}</Text>
                    {/* <Spacer />
                    <Avatar size='xl' src={states.details.thumbnail} alt='logo'></Avatar> */}
                </Flex>
            </Box>
            <Box marginTop='4'>
                <Text fontSize='lg' marginBottom='2' fontWeight='bold' color='whiteAlpha.700'>About {states.details.title}:</Text>
                <Text lineHeight='2' color='whiteAlpha.700'>{states.details.description}</Text>
            </Box>
            <Text fontSize='lg' marginBottom='2' marginTop='10' fontWeight='bold' color='whiteAlpha.700'>Additional Info:</Text>
            <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between' color='whiteAlpha.700'>
                {dataDetails.map((data, index) =>(
                    <Info key={index} role={data.role} data={data.data} />
                ))}
            </Flex>
            <Text fontSize='lg' marginBottom='2' marginTop='10' fontWeight='bold' color='whiteAlpha.700'>Minimum System Requirements:</Text>
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            {states.details?.minimum_system_requirements && Object.entries(states.details?.minimum_system_requirements).map((data, index) =>(
                    <StatsCard title={data[0]} stat={data[1]} key={index}/>
            ))}
            </SimpleGrid>
            </Box>
            <Text fontSize='lg' marginBottom='2' marginTop='10' fontWeight='bold' color='whiteAlpha.700'>People also viewd:</Text>
            <Flex flexWrap='wrap' mt='3'>
                {suggestion.map((data, index) =>(
                    <Card key={index} details={data}/>
                ))}
            </Flex>
        </Box>
        }
        {states.loading && 
        <Box margin='auto' p='44' alignItems='center' justifyContent='center'>
        <Spinner size='xl' color='whiteAlpha.700' thickness='4px' />
        </Box>
        }
        
        </>
    )

}
export default Page