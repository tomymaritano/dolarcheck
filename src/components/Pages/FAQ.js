// src/components/Pages/FAQ.js
import React from 'react';
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const faqs = [
  {
    question: '¿Cómo se obtienen los datos?',
    answer: 'Los datos son obtenidos a través de ArgentinaAPI y se actualizan diariamente.',
  },
  {
    question: '¿Es DolarGaucho gratuito?',
    answer: 'Sí, es un proyecto personal y es completamente gratuito para los usuarios.',
  },
  {
    question: '¿Qué tipo de información puedo encontrar en DolarGaucho?',
    answer: 'Puedes encontrar datos financieros actualizados, incluyendo tasas de cambio, índices de inflación, rendimientos de inversiones y más.',
  },
  {
    question: '¿Cómo puedo contactar con el equipo de DolarGaucho?',
    answer: 'Puedes contactarnos a través de nuestras redes sociales o enviando un correo electrónico a contacto@dolgargaucho.com.',
  },
  {
    question: '¿Cómo se financia DolarGaucho?',
    answer: 'DolarGaucho es un proyecto personal sin fines de lucro, financiado por el creador para democratizar la educación financiera en Argentina.',
  },
];

const FAQ = () => {
  // const bgColor = useColorModeValue('white', 'gray.100');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box>
      <Box
        w="full"
        h="60vh"
        bgImage="url('https://source.unsplash.com/1600x900/?help')"
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
          <Heading fontSize="4xl">Centro de Ayuda</Heading>
          <Text fontSize="lg">Encuentra respuestas a las preguntas más comunes sobre DolarGaucho.</Text>
        </VStack>
      </Box>

      <Container maxW="container.xl" py={10}>
        <Stack spacing={4} textAlign="center">
          <Heading>Preguntas Frecuentes</Heading>
          <Text color={textColor}>
            Aquí puedes encontrar respuestas a las preguntas más comunes sobre DolarGaucho y cómo funciona. Si tienes alguna otra pregunta, no dudes en contactarnos.
          </Text>
        </Stack>

        <Accordion allowToggle mt={10}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {faq.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
};

export default FAQ;
