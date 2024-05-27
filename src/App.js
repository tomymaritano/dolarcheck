import React from 'react';
import { ChakraProvider, Box, Grid, GridItem, Image, VStack, Button, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Flex } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo from "./components/assets/LOGO.png";
import DashboardDivisas from './components/_common/DashboardDivisas';
import HistoricoDolar from './components/_common/HistoricoDolar';
import InflacionHistorico from './components/_common/InflacionHistorico';

const Sidebar = ({ onClose }) => {
  return (
    <Box
      as="nav"
      display={{ base: 'none', md: 'block' }}
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      w="200px"
      bg="gray.800"
      color="white"
      p={4}
    >
      <VStack spacing={4} align="start">
        <Box>
          <Image width={10} src={logo} />
        </Box>
        <Button variant="ghost" colorScheme="whiteAlpha" onClick={onClose}>Dashboard</Button>
        <Button variant="ghost" colorScheme="whiteAlpha" onClick={onClose}>Configuraciones</Button>
        <Button variant="ghost" colorScheme="whiteAlpha" onClick={onClose}>Perfil</Button>
        <Button variant="ghost" colorScheme="whiteAlpha" onClick={onClose}>Salir</Button>
      </VStack>
    </Box>
  );
};

const MobileNavbar = ({ onOpen }) => {
  return (
    <Flex
      as="header"
      pos="fixed"
      top="0"
      left="0"
      right="0"
      bg="gray.800"
      color="white"
      justifyContent="space-between"
      alignItems="center"
      p={4}
      display={{ base: 'flex', md: 'none' }}
      zIndex="1000"
    >
      <Image width={8} src={logo} />
      <IconButton
      size={'sm'}
        icon={<HamburgerIcon />}
        onClick={onOpen}
        variant="outline"
        colorScheme="whiteAlpha"
      />
    </Flex>
  );
};

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Image width={10} src={logo} />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Button variant="ghost" colorScheme="gray" onClick={onClose}>Dashboard</Button>
              <Button variant="ghost" colorScheme="gray" onClick={onClose}>Configuraciones</Button>
              <Button variant="ghost" colorScheme="gray" onClick={onClose}>Perfil</Button>
              <Button variant="ghost" colorScheme="gray" onClick={onClose}>Salir</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <MobileNavbar onOpen={onOpen} />
      <Sidebar onClose={onClose} />
      <MobileSidebar isOpen={isOpen} onClose={onClose} />
      <Box ml={{ base: 0, md: '200px' }} mt={{ base: '60px', md: 0 }} p={2}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(1, 1fr)' }}
          gap={3}
        >
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <Box bg="gray.50" p={4} borderRadius="md">
              <DashboardDivisas />
            </Box>
          </GridItem>
          <GridItem colSpan={1}>
            <Box bg="gray.50" p={4} borderRadius="md">
              <HistoricoDolar />
            </Box>
          </GridItem>
          <GridItem colSpan={1}>
            <Box bg="gray.100" p={4} borderRadius="md" boxShadow="md">
             <InflacionHistorico />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <Box bg="gray.100" p={4} borderRadius="md" boxShadow="md">
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;
