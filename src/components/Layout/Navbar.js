// src/components/Navbar.js
import React from 'react';
import { Box, Flex, IconButton, Stack, Collapse, useColorModeValue, useDisclosure, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';
import logo from '../assets/LOGO.png';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box width="100%" position="fixed" top="0" zIndex="1000">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        w="full"
        justify="space-between"
      >
        <Flex align="center">
          <Image src={logo} w={'30px'} />
        </Flex>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          <DesktopNav />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <NavLink key={navItem.label} to={navItem.href}>
          {navItem.label}
        </NavLink>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <NavLink key={navItem.label} to={navItem.href}>
          {navItem.label}
        </NavLink>
      ))}
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Inicio',
    href: '/home',
  },
  {
    label: 'Servicios',
    href: '/services',
  },
  {
    label: 'Nosotros',
    href: '/about',
  },
  {
    label: 'Contacto',
    href: '/contact',
  },
];

export default Navbar;
