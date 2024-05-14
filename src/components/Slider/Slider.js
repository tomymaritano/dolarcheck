import React, { useState } from "react";
import { Flex, Text, VStack,  IconButton } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Bienvenidos a Dolar Gaucho",
    content: "La mejor herramienta para seguir el valor del dólar en Argentina.",
  },
  {
    id: 2,
    title: "Cotizaciones en tiempo real",
    content: "Accede a las últimas cotizaciones del mercado y mantente siempre informado.",
  },
  {
    id: 3,
    title: "Análisis y Predicciones",
    content: "Explora análisis de tendencias y predicciones para tomar las mejores decisiones.",
  },
];

function WelcomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Flex
      direction="column"
      bg={'transparent'}
      h="100vh"
      align="center"
      justify="center"
      w="full"
    >
      <VStack spacing={5} align="stretch" w="50%">
        <Text fontSize="xl" fontWeight="bold" color="#94dcae" textAlign="center">
          {slides[currentSlide].title}
        </Text>
        <Text fontSize="lg" color="white" textAlign="center">
          {slides[currentSlide].content}
        </Text>
        <Flex justify="center" mt={6}>
          <IconButton
          size={'sm'}
            icon={<FaArrowLeft />}
            isRound
            onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            m={2}
          />
          <IconButton
          size={'sm'}
            icon={<FaArrowRight />}
            isRound
            onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
            aria-label="Next slide"
            m={2}
          />
        </Flex>
      </VStack>
    </Flex>
  );
}

export default WelcomeSlider;
