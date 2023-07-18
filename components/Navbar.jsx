/* eslint-disable react/no-array-index-key */

'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { filterOptions } from '../utils/filterOptions';

const Links = ['Platform', 'Popular Categories'];

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters] = useState(filterOptions);
  const pathname = usePathname();

  return (
    <Box px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          backgroundColor="transparent"
          _hover={{ backgroundColor: 'transparent' }}
          _active={{ backgroundColor: 'transparent' }}
          color="white"
        />
        <HStack spacing={8} alignItems="center">
          <Link as={NextLink} href="/" variant="link" color="white" cursor="pointer">
            <Image
              alt="Gameboy Logo"
              className="object-contain"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Nintendo_Game_Boy_Logo.svg/1280px-Nintendo_Game_Boy_Logo.svg.png"
              width={100}
              height={50}
            />
          </Link>
          {pathname !== '/filter' && (
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {Links.map((link) => (
              <Menu key={link}>
                <MenuButton as={Button} variant="link" color="whiteAlpha.700" cursor="pointer" key={link}>
                  {link}
                </MenuButton>
                {link === 'Platform' ? (
                  <MenuList backgroundColor="gray.700" color="white">
                    {filters[0].items.map((item, index) => (
                      <React.Fragment key={index}>
                        <MenuItem backgroundColor="gray.700" key={index}><Link as={NextLink} href={`/filter?platform=${item.value}`} variant="link" cursor="pointer">{item.name}</Link></MenuItem>
                        {index !== filters[0].items.length - 1 && <MenuDivider />}
                      </React.Fragment>
                    ))}
                  </MenuList>
                ) : (
                  <MenuList backgroundColor="gray.700" color="white">
                    {filters[1].items.map((item, index) => (
                      <React.Fragment key={index}>
                        <MenuItem backgroundColor="gray.700" key={index}><Link as={NextLink} href={`/filter?category=${item.value}`} variant="link" cursor="pointer">{item.name}</Link></MenuItem>
                        {index !== filters[1].items.length - 1 && <MenuDivider />}
                      </React.Fragment>
                    ))}
                  </MenuList>
                )}
              </Menu>
            ))}
          </HStack>
          )}
        </HStack>
        <Flex alignItems="center">
          <Link as={NextLink} href="/search" variant="link" color="whiteAlpha.700" cursor="pointer" fontSize="2xl" mr={[0, 6, 12, 12]}>
            <BsSearch />
          </Link>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <VStack as="nav" spacing={4}>
            {Links.map((link) => (
              <Menu key={link}>
                <MenuButton as={Button} variant="link" color="white" cursor="pointer" key={link}>
                  {link}
                </MenuButton>
                {link === 'Platform' ? (
                  <MenuList backgroundColor="gray.700" color="white">
                    {filters[0].items.map((item, index) => (
                      <React.Fragment key={index}>
                        <MenuItem backgroundColor="gray.700" key={index}><Link as={NextLink} href={`/filter?platform=${item.value}`} variant="link" cursor="pointer">{item.name}</Link></MenuItem>
                        {index !== filters[0].items.length - 1 && <MenuDivider />}
                      </React.Fragment>
                    ))}
                  </MenuList>
                ) : (
                  <MenuList backgroundColor="gray.700" color="white">
                    {filters[1].items.map((item, index) => (
                      <React.Fragment key={index}>
                        <MenuItem backgroundColor="gray.700" key={index}><Link as={NextLink} href={`/filter?category=${item.value}`} variant="link" cursor="pointer">{item.name}</Link></MenuItem>
                        {index !== filters[1].items.length - 1 && <MenuDivider />}
                      </React.Fragment>
                    ))}
                  </MenuList>
                )}
              </Menu>
            ))}
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
}

export default Navbar;
