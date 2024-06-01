import React from 'react';
import theme from './theme'; // Asegúrate de que la ruta es correcta
import { ChakraProvider, Box, Grid, GridItem } from '@chakra-ui/react';
// import { ArrowRightIcon, AtSignIcon, CloseIcon, HamburgerIcon, InfoIcon, RepeatIcon, SettingsIcon, StarIcon } from '@chakra-ui/icons';
// import logo from "./components/assets/LOGO.png";
import DashboardDivisas from './components/_common/DashboardDivisas';
import HistoricoDolar from './components/_common/HistoricoDolar';
import InflacionHistorico from './components/_common/InflacionHistorico';
// import { IoIosArrowForward } from "react-icons/io";
import UvaIndex from './components/_common/UvaIndex';
import PlazoFijoRates from './components/_common/PlazoFijo';
import Depositos30DiasChart from './components/_common/PlazoAdias';
import RendimientosEntidadesList from './components/_common/RendimientoEnt';
import FCICombinedTable from './components/_common/FCICombinedTabled';
import Hero from './components/Layout/Hero';


// const Sidebar = ({ onClose }) => {

//   const bgColor = useColorModeValue('white', 'gray.50');
//   const color = useColorModeValue('white', 'gray.200');

//   return (
//      <Box
//       as="nav"
//       display={{ base: 'none', md: 'block' }}
//       pos="fixed"
//       top="0"
//       left="0"
//       h="100vh"
//       w="200px"
//       bg={bgColor}
//       color={color}
//       p={4}
//       zIndex="1000"
//     >
//       <VStack spacing={8} align="start">
//         <Box display="flex" justifyContent="space-evenly" width="100%">
//           <Image width={10} src={logo} />
//           <IconButton
//             display={{ md: 'none' }}
//             icon={<CloseIcon />}
//             onClick={onClose}
//             variant="outline"
//             size="sm"
//           />
//         </Box>
//         <Button as={Link} to="/inicio" variant="link" leftIcon={<IoIosArrowForward />}  onClick={onClose}>
//           Inicio
//         </Button>
//         <Button as={Link} to="/dolar" variant="link" leftIcon={<IoIosArrowForward />}  onClick={onClose}>
//           Dólar
//         </Button>
//         <Button as={Link} to="/otras" variant="link" leftIcon={<IoIosArrowForward />}  onClick={onClose}>
//           Otras divisas
//         </Button>
//         <Button as={Link} to="/tasas" variant="link" leftIcon={<IoIosArrowForward />}  onClick={onClose}>
//           Tasas
//         </Button>
//         <Button as={Link} to="/rendimientos" variant="link" leftIcon={<IoIosArrowForward />}  onClick={onClose}>
//           Rendimientos
//         </Button>
//         <Button as={Link} to="/fci" variant="link" leftIcon={<IoIosArrowForward />} onClick={onClose}>
//           FCI
//         </Button>
//       </VStack>
//     </Box>
//   );
// };

// const MobileNavbar = ({ onOpen }) => {
//   return (
//     <Flex
//       as="header"
//       pos="fixed"
//       top="0"
//       left="0"
//       right="0"
//       bg="gray.900"
//       color="white"
//       justifyContent="space-between"
//       alignItems="center"
//       p={4}
//       display={{ base: 'flex', md: 'none' }}
//       zIndex="1000"
//       shadow="md"
//     >
//       <Image width={8} src={logo} />
//       <IconButton
//         size="sm"
//         icon={<HamburgerIcon />}
//         onClick={onOpen}
//         variant="outline"
//         colorScheme="teal"
//       />
//     </Flex>
//   );
// };

// const MobileSidebar = ({ isOpen, onClose }) => {
//   return (
//     <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//       <DrawerOverlay>
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>
//             <Image width={10} src={logo} />
//           </DrawerHeader>
//           <DrawerBody>
//             <VStack spacing={4} align="stretch">
//               <Button as={Link} to="/inicio" variant="ghost" leftIcon={<AtSignIcon />} colorScheme="teal" onClick={onClose}>
//                 Inicio
//               </Button>
//               <Button as={Link} to="/dolar" variant="ghost" leftIcon={<RepeatIcon />} colorScheme="teal" onClick={onClose}>
//                 Dólar
//               </Button>
//               <Button as={Link} to="/otras" variant="ghost" leftIcon={<InfoIcon />} colorScheme="teal" onClick={onClose}>
//                 Otras divisas
//               </Button>
//               <Button as={Link} to="/tasas" variant="ghost" leftIcon={<ArrowRightIcon />} colorScheme="teal" onClick={onClose}>
//                 Tasas
//               </Button>
//               <Button as={Link} to="/rendimientos" variant="ghost" leftIcon={<StarIcon />} colorScheme="teal" onClick={onClose}>
//                 Rendimientos
//               </Button>
//               <Button as={Link} to="/fci" variant="ghost" leftIcon={<SettingsIcon />} colorScheme="teal" onClick={onClose}>
//                 FCI
//               </Button>
//             </VStack>
//           </DrawerBody>
//         </DrawerContent>
//       </DrawerOverlay>
//     </Drawer>
//   );
// };

const App = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      {/* <MobileNavbar onOpen={onOpen} />
      <Sidebar onClose={onClose} />
      <MobileSidebar isOpen={isOpen} onClose={onClose} /> */}
      {/* <Box ml={{ base: 0, md: '200px' }} mt={{ base: '60px', md: 0 }} p={2}> */}
      <Box p={2}>
        <Hero />
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)' }}
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
            <Box bg="gray.50" p={4} borderRadius="md">
              <InflacionHistorico />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <Box bg="gray.50" p={4} borderRadius="md">
              <UvaIndex />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <Box bg="gray.50" p={4} borderRadius="md">
              <PlazoFijoRates />
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <Box bg="gray.50" p={4} borderRadius="md">
              <Depositos30DiasChart />
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <Box bg="gray.50" p={4} borderRadius="md">
              <RendimientosEntidadesList />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <Box bg="gray.50" p={4} borderRadius="md">
              <FCICombinedTable />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;


