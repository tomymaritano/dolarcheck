// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Sidebar from '../_common/Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  return (
    <Flex>
      <Sidebar />
      <Box flex="1" bg={bgColor}>
        <Navbar />
        <Box p={4}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
