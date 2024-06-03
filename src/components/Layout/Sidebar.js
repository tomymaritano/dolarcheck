// src/components/Layout/Sidebar.js
import React from 'react';
import {
  Box,
  VStack,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon, InfoIcon, AtSignIcon, SettingsIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const linkStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    width: '100%',
    borderRadius: 'md',
    fontSize: 'md',
    fontWeight: 'bold',
    transition: 'background 0.3s, color 0.3s',
    _hover: {
      background: 'gray.50',
      color: 'black',
      textDecoration: 'none',
    },
    _focus: {
      boxShadow: 'outline',
    },
  };

  const activeLinkStyles = {
    ...linkStyles,
    background: 'teal.100',
    color: 'black',
  };

  const menuItemStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    width: '100%',
    borderRadius: 'md',
    fontSize: 'md',
    fontWeight: 'bold',
    transition: 'background 0.3s, color 0.3s',
    _hover: {
      background: 'gray.50',
      color: 'black',
      textDecoration: 'none',
    },
  };

  return (
    <>
      <Box as="nav" bg="gray.900" color="white" w="200px" h="full" position="fixed" zIndex={0} top="60px" left={0} display={{ base: 'none', md: 'block' }}>
        <VStack align="start" p={4} spacing={2}>
          <ChakraLink as={ReactRouterLink} to="/" {...(location.pathname === '/' ? activeLinkStyles : linkStyles)}>
            <Icon as={AtSignIcon} mr={2} />
            Inicio
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/about" {...(location.pathname === '/about' ? activeLinkStyles : linkStyles)}>
            <Icon as={InfoIcon} mr={2} />
            Acerca
          </ChakraLink>
          <Menu>
            <MenuButton as={ChakraLink} {...linkStyles} rightIcon={<ChevronDownIcon />}>
              <Icon as={SettingsIcon} mr={2} />
              Divisas
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup color={'black'} type="checkbox">
                <MenuItemOption color={'black'} value="dolar">Dólar</MenuItemOption>
                <MenuItemOption color={'black'} value="euro">Euro</MenuItemOption>
                <MenuItemOption color={'black'} value="real">Real</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <ChakraLink as={ReactRouterLink} to="/faq" {...(location.pathname === '/faq' ? activeLinkStyles : linkStyles)}>
            <Icon as={SettingsIcon} mr={2} />
            FAQ
          </ChakraLink>
        </VStack>
      </Box>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        position="fixed"
        top="60px"
        left={4}
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navegación</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={2}>
                <ChakraLink as={ReactRouterLink} to="/" onClick={onClose} {...(location.pathname === '/' ? activeLinkStyles : linkStyles)}>
                  <Icon as={AtSignIcon} mr={2} />
                  Home
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to="/about" onClick={onClose} {...(location.pathname === '/about' ? activeLinkStyles : linkStyles)}>
                  <Icon as={InfoIcon} mr={2} />
                  About
                </ChakraLink>
                <Menu closeOnSelect={false}>
                  <MenuButton as={ChakraLink} {...linkStyles} rightIcon={<ChevronDownIcon />}>
                    <Icon as={SettingsIcon} mr={2} />
                    Divisas
                  </MenuButton>
                  <MenuList minWidth="240px">
                    <MenuOptionGroup title="Divisas" type="checkbox">
                      <MenuItemOption as={ReactRouterLink} to="/divisas/dolar" onClick={onClose} value="dolar">Dólar</MenuItemOption>
                      <MenuItemOption as={ReactRouterLink} to="/divisas/euro" onClick={onClose} value="euro">Euro</MenuItemOption>
                      <MenuItemOption as={ReactRouterLink} to="/divisas/real" onClick={onClose} value="real">Real</MenuItemOption>
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
                <ChakraLink as={ReactRouterLink} to="/dashboard" onClick={onClose} {...(location.pathname === '/faq' ? activeLinkStyles : linkStyles)}>
                  <Icon as={SettingsIcon} mr={2} />
                  FAQ
                </ChakraLink>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Sidebar;