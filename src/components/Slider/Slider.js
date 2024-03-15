import React, { useState } from 'react';
import {  Button, Flex, Text, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const slides = [
  {
    id: 1,
    title: 'Bienvenidos a Dolar Gaucho',
    content: 'La mejor herramienta para seguir el valor del dólar en Argentina.',
  },
  {
    id: 2,
    title: 'Cotizaciones en tiempo real',
    content: 'Accede a las últimas cotizaciones del mercado y mantente siempre informado.',
  },
  {
    id: 3,
    title: 'Análisis y Predicciones',
    content: 'Explora análisis de tendencias y predicciones para tomar las mejores decisiones.',
  },
];

function WelcomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <Flex direction="column" h={'100vh'} align="center" justify="center" w="full" p={4}>
      <VStack spacing={4}>
        <Text color="white" fontSize="2xl" fontWeight="bold">{slides[currentSlide].title}</Text>
        <Text color="white" textAlign="center">{slides[currentSlide].content}</Text>
      </VStack>
      <Flex mt={6}>
        <Button colorScheme='blue' size={'sm'} onClick={prevSlide} leftIcon={<ChevronLeftIcon />} mr={2}>
          Anterior
        </Button>
        <Button colorScheme='blue' size={'sm'} onClick={nextSlide} rightIcon={<ChevronRightIcon />}>
          Siguiente
        </Button>
      </Flex>
    </Flex>
  );
}

export default WelcomeSlider;
