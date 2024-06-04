// src/components/Hero.js
import React from 'react';
import { Box, Heading, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import backImage from '../assets/back-1.jpg'; // Asegúrate de importar tu imagen de fondo
import Navbar from './Navbar'; // Asegúrate de importar el Navbar

const Hero = () => {
  const textColor = useColorModeValue('white', 'gray.100');

  return (
    <Box
      w="full"
      h="10vh"
      bgImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backImage})`}
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover"
      color={textColor}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      position="relative"
    >
      <Navbar />
      <VStack spacing={6} maxW="2xl" mt={24}>
        <Heading as="h1" size="2xl" fontWeight="bold">
          Bienvenido a Tu Aplicación de Inversión
        </Heading>
        <Text fontSize="lg" maxW="xl">
          Explora, compara y elige los mejores fondos comunes de inversión. Obtén los datos más recientes y toma decisiones informadas.
        </Text>
        <Button to="/dashboard" colorScheme="teal" size="lg">
          Comienza Ahora
        </Button>
      </VStack>
    </Box>
  );
};

export default Hero;
