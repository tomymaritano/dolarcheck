import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction="column" minH="100vh">
      <Header onToggleSidebar={onOpen} />
      <Flex mt={{ base: '0', md: '60px' }}>
        <Sidebar isOpen={isOpen} onClose={onClose} />
        <Box ml={{ base: 0, md: '200px' }} p={4} flex="1">
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
