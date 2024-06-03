import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Button,
  Icon,
} from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { FaChartLine, FaUniversity, FaRegMoneyBillAlt } from 'react-icons/fa';

const features = [
  {
    title: 'Información Financiera',
    description: 'Accede a datos actualizados sobre la inflación, tasas de interés y cotizaciones de divisas.',
    icon: FaChartLine,
  },
  {
    title: 'Educación Financiera',
    description: 'Aprende sobre conceptos financieros clave para tomar mejores decisiones económicas.',
    icon: FaUniversity,
  },
  {
    title: 'Control Financiero',
    description: 'Utiliza nuestras herramientas para llevar un mejor control de tus finanzas personales.',
    icon: FaRegMoneyBillAlt,
  },
];

const Home = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const bgColor = useColorModeValue('white', 'gray.100');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const iconColor = useColorModeValue('teal.500', 'teal.300');

  return (
    <Box>
      <Box
        w="full"
        h="90vh"
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
          <Heading fontSize="4xl">Bienvenido a DolarGaucho</Heading>
          <Text fontSize="lg">Tu fuente confiable de información financiera en Argentina.</Text>
          <Button size="lg" colorScheme="teal">Explorar Ahora</Button>
        </VStack>
      </Box>

      <Container maxW="container.xl" py={10}>
        <Stack spacing={4} textAlign="center">
          <Heading>¿Qué es DolarGaucho?</Heading>
          <Text color={textColor}>
            DolarGaucho es un proyecto personal con el objetivo de democratizar la educación financiera en Argentina.
            Todos los datos son obtenidos de ArgentinaAPI y se actualizan diariamente.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={10} ref={sectionRef}>
          {features.map((feature, index) => (
            <VStack
              key={index}
              p={5}
              bg={bgColor}
              borderRadius="md"
              boxShadow="lg"
              opacity={sectionInView ? 1 : 0}
              transform={sectionInView ? 'translateY(0)' : 'translateY(20px)'}
              transition="all 0.5s"
              align="start"
            >
              <Icon as={feature.icon} w={10} h={10} color={iconColor} />
              <Heading size="md">{feature.title}</Heading>
              <Text color={textColor}>{feature.description}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Home;
