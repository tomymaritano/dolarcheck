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
  Divider,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, InfoIcon } from '@chakra-ui/icons';
import { IoMdHome } from "react-icons/io";
import { MdAttachMoney, MdHelp } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { FaChartLine, FaChartPie } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { RiAccountBoxFill, RiBankLine } from "react-icons/ri";
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
    fontSize: 'sm',
    fontWeight: '600',
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

  const CustomChakraLink = ({ to, children, ...props }) => (
    <ChakraLink as={ReactRouterLink} to={to} onClick={onClose} {...props}>
      {children}
    </ChakraLink>
  );

  return (
    <>
      <Box
        as="nav"
        bg="gray.700"
        color="white"
        w="200px"
        h="full"
        position="fixed"
        zIndex={1}
        top="60px"
        left={0}
        display={{ base: 'none', md: 'block' }}
        pt={4}
      >
        <VStack align="start" spacing={2}>
          <CustomChakraLink to="/" {...(location.pathname === '/' ? activeLinkStyles : linkStyles)}>
            <Icon as={IoMdHome} mr={2} />
            Inicio
          </CustomChakraLink>
          <CustomChakraLink to="/about" {...(location.pathname === '/about' ? activeLinkStyles : linkStyles)}>
            <Icon as={InfoIcon} mr={2} />
            Acerca
          </CustomChakraLink>
          <Divider />
          <CustomChakraLink to="/dolar" {...(location.pathname === '/dolar' ? activeLinkStyles : linkStyles)}>
            <Icon as={MdAttachMoney} mr={2} />
            Dolar Hoy
          </CustomChakraLink>
          <CustomChakraLink to="/d-historico" {...(location.pathname === '/d-historico' ? activeLinkStyles : linkStyles)}>
            <Icon as={LuClipboardList} mr={2} />
            Historico Dolar
          </CustomChakraLink>
          <CustomChakraLink to="/conversor" {...(location.pathname === '/conversor' ? activeLinkStyles : linkStyles)}>
            <Icon as={TfiReload} mr={2} />
            Conversor
          </CustomChakraLink>
          <CustomChakraLink to="/inflacion" {...(location.pathname === '/inflacion' ? activeLinkStyles : linkStyles)}>
            <Icon as={FaChartLine} mr={2} />
            Inflacion
          </CustomChakraLink>
          <CustomChakraLink to="/tasas" {...(location.pathname === '/tasas' ? activeLinkStyles : linkStyles)}>
            <Icon as={FaChartPie} mr={2} />
            Tasas
          </CustomChakraLink>
          <Divider />
          <CustomChakraLink to="/fci" {...(location.pathname === '/fci' ? activeLinkStyles : linkStyles)}>
            <Icon as={RiBankLine} mr={2} />
            FCI
          </CustomChakraLink>
          <CustomChakraLink to="/rendimientos" {...(location.pathname === '/rendimientos' ? activeLinkStyles : linkStyles)}>
            <Icon as={RiAccountBoxFill} mr={2} />
            Rendimientos
          </CustomChakraLink>
          <Divider />
          <CustomChakraLink to="/faq" {...(location.pathname === '/faq' ? activeLinkStyles : linkStyles)}>
            <Icon as={MdHelp} mr={2} />
            FAQ
          </CustomChakraLink>
        </VStack>
      </Box>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        position="fixed"
        top="10px" // Adjust the position to be at the top
        left={4}
        icon={<HamburgerIcon />}
        onClick={onOpen}
        aria-label="Open menu"
        bg="gray.50"
        _hover={{ bg: 'gray.100' }}
        zIndex={2} // Ensure it stays above other elements
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.700" color="white">
            <DrawerCloseButton />
            <DrawerHeader>Navegación</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={2}>
                <CustomChakraLink to="/" {...(location.pathname === '/' ? activeLinkStyles : linkStyles)}>
                  <Icon as={IoMdHome} mr={2} />
                  Inicio
                </CustomChakraLink>
                <CustomChakraLink to="/about" {...(location.pathname === '/about' ? activeLinkStyles : linkStyles)}>
                  <Icon as={InfoIcon} mr={2} />
                  Acerca
                </CustomChakraLink>
                <Divider />
                <CustomChakraLink to="/dolar" {...(location.pathname === '/dolar' ? activeLinkStyles : linkStyles)}>
                  <Icon as={MdAttachMoney} mr={2} />
                  Dolar Hoy
                </CustomChakraLink>
                <CustomChakraLink to="/d-historico" {...(location.pathname === '/d-historico' ? activeLinkStyles : linkStyles)}>
                  <Icon as={LuClipboardList} mr={2} />
                  Historico Dolar
                </CustomChakraLink>
                <CustomChakraLink to="/conversor" {...(location.pathname === '/conversor' ? activeLinkStyles : linkStyles)}>
                  <Icon as={TfiReload} mr={2} />
                  Conversor
                </CustomChakraLink>
                <CustomChakraLink to="/inflacion" {...(location.pathname === '/inflacion' ? activeLinkStyles : linkStyles)}>
                  <Icon as={FaChartLine} mr={2} />
                  Inflacion
                </CustomChakraLink>
                <CustomChakraLink to="/tasas" {...(location.pathname === '/tasas' ? activeLinkStyles : linkStyles)}>
                  <Icon as={FaChartPie} mr={2} />
                  Tasas
                </CustomChakraLink>
                <Divider />
                <CustomChakraLink to="/fci" {...(location.pathname === '/fci' ? activeLinkStyles : linkStyles)}>
                  <Icon as={RiBankLine} mr={2} />
                  FCI
                </CustomChakraLink>
                <CustomChakraLink to="/rendimientos" {...(location.pathname === '/rendimientos' ? activeLinkStyles : linkStyles)}>
                  <Icon as={RiAccountBoxFill} mr={2} />
                  Rendimientos
                </CustomChakraLink>
                <Divider />
                <CustomChakraLink to="/faq" {...(location.pathname === '/faq' ? activeLinkStyles : linkStyles)}>
                  <Icon as={MdHelp} mr={2} />
                  FAQ
                </CustomChakraLink>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Sidebar;
