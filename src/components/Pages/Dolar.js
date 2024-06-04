// src/components/Pages/Dolar.js
import React from 'react';
import {
  Box,
  Container,
  // Stack,
  Heading,
  // Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import DashboardDivisas from '../_common/DashboardDivisas';

const Dolar = () => {
  const bgColor = useColorModeValue('white', 'gray.100');
  // const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box>
      <Box
        w="full"
        h="60vh"
        bgImage="url('https://source.unsplash.com/1600x900/?finance')"
        bgPosition="center"
        bgSize="cover"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          w: 'full',
          h: 'full',
          bg: 'blackAlpha.600',
          zIndex: 1,
        }}
      >
        <VStack spacing={6} zIndex={2} textAlign="center" color="white">
          <Heading fontSize="4xl">Conversor de Compra y Venta</Heading>
        </VStack>
      </Box>

      <Container maxW="container.xl" >
        <Box mt={10} bg={bgColor} p={4} borderRadius="md">
          <DashboardDivisas />
        </Box>
      </Container>
    </Box>
  );
};

export default Dolar;
