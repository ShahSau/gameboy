/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { useState } from 'react';
import { Box, SimpleGrid, GridItem } from '@chakra-ui/react';
import MostPlayed from './MostPlayed';
import RecentlyAdded from './RecentlyAdded';
import Bar from './Bar';

function Section() {
  const [showBar, setShowBar] = useState(false);

  setTimeout(() => {
    setShowBar(true);
  }, 1000);
  return (
    <Box
      bg="transparent"
      p={10}
    >
      <SimpleGrid
        display={{
          base: 'initial',
          md: 'grid',
        }}
        columns={{
          md: 3,
        }}
        spacing={{
          md: 6,
        }}
      >
        <GridItem
          colSpan={{
            md: 1,
          }}
        >
          <Box px={[4, 0]}>
            <MostPlayed />
          </Box>
        </GridItem>
        <GridItem
          mt={[5, null, 0]}
          colSpan={{
            md: 2,
          }}
        >
          <Box
            px={{
              base: 4,
              sm: 6,
            }}
            py={3}
          >
            <RecentlyAdded />
          </Box>
        </GridItem>
      </SimpleGrid>

      {showBar && <Bar />}
    </Box>

  );
}

export default Section;
