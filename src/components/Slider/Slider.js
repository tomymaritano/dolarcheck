import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Button, Flex, Text, VStack } from "@chakra-ui/react";

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
                  <Text textAlign={'center'} color="white">{slide.content}</Text>
                </VStack>
              </motion.div>
            )
        )}
      </AnimatePresence>
      <Button 
      mt={8}
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        sx={{
          textDecoration: "none",
          position: "relative",
          border: "none",
          fontSize: "14px",
          fontFamily: "inherit",
          cursor: "pointer",
          color: "#fff",
          width: "9em",
          height: "3em",
          lineHeight: "2em",
          textAlign: "center",
          background:
            "linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4)",
          backgroundSize: "300%",
          borderRadius: "30px",
          zIndex: 1,
          _hover: {
            animation: "ani 8s linear infinite",
            border: "none",
            "::before": {
              filter: "blur(20px)",
            },
          },
          _active: {
            background:
              "linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4)",
          },
          "::before": {
            content: `""`,
            position: "absolute",
            top: "-5px",
            left: "-5px",
            right: "-5px",
            bottom: "-5px",
            zIndex: "-1",
            background:
              "linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4)",
            backgroundSize: "400%",
            borderRadius: "35px",
            transition: "1s",
          },
          "@keyframes ani": {
            "0%": { backgroundPosition: "0%" },
            "100%": { backgroundPosition: "400%" },
          },
        }}
      >
        Colaborar
      </Button>
    </Flex>
  );
}

export default WelcomeSlider;
