import React from 'react';
import { Box, Grid, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Grid
      templateAreas={{
        base: `"header" "main" "footer"`,
        md: `"header header" "sidebar main" "footer footer"`
      }}
      gridTemplateRows={{ base: 'auto 1fr auto', md: '60px 1fr auto' }}
      gridTemplateColumns={{ base: '1fr', md: '200px 1fr' }}
      minH="100vh"
      bg={bgColor}
    >
      <Box gridArea="header">
        <Header onToggleSidebar={onOpen} />
      </Box>
      <Box
        gridArea="sidebar"
        display={{ base: 'none', md: 'block' }}
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        w="200px"
      >
        <Sidebar isOpen={isOpen} onClose={onClose} />
      </Box>
      <Box gridArea="main" p={4}>
        {children}
      </Box>
      <Box gridArea="footer">
        <Footer />
      </Box>
    </Grid>
  );
};

export default MainLayout;
