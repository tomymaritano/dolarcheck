import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { FaHandPaper } from "react-icons/fa";


// Asegúrate de tener tus slides definidos
const slides = [
  {
    id: 1,
    title: "Bienvenidos a Dolar Gaucho",
    content:
      "La mejor herramienta para seguir el valor del dólar en Argentina.",
  },
  {
    id: 2,
    title: "Cotizaciones en tiempo real",
    content:
      "Accede a las últimas cotizaciones del mercado y mantente siempre informado.",
  },
  {
    id: 3,
    title: "Análisis y Predicciones",
    content:
      "Explora análisis de tendencias y predicciones para tomar las mejores decisiones.",
  },
];

function WelcomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Ajusta este valor según lo rápido que quieras que cambien los slides
    return () => clearInterval(interval);
  }, []);

  const slideAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  };

  return (
    <Flex
      direction="column"
      h="70vh"
      align="center"
      justify="center"
      w="full"
      p={4}
    >
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            currentSlide === index && (
              <motion.div
                key={slide.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideAnimation}
                transition={{ duration: 0.5 }}
              >
                <VStack spacing={4}>
                  <Text color="white" fontSize="2xl" fontWeight="bold">
                    {slide.title}
                  </Text>
                  <Text textAlign={"center"} color="white">
                    {slide.content}
                  </Text>
                </VStack>
              </motion.div>
            )
        )}
      </AnimatePresence>
      <Button
      rightIcon={<FaHandPaper color="#fbd38d"/>}
        mt={8}
        size={'sm'}
      >
        Quiero colaborar
      </Button>
    </Flex>
  );
}

export default WelcomeSlider;
