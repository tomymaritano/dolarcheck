// src/components/Pages/About.js
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

const teamMembers = [
  {
    name: 'Tomas Maritano',
    role: 'Fundador',
    image: 'https://media.licdn.com/dms/image/D4D03AQH0MyoFc_QYOw/profile-displayphoto-shrink_200_200/0/1706897249816?e=1722470400&v=beta&t=U0KEYZrL3mEX71rqNSpJTABcA4dPn0HKkUNOo5kNPYg',
  },
  {
    name: 'Eric Maritano',
    role: 'CFO',
    image: 'https://media.licdn.com/dms/image/D4D03AQGesX6M7OC2kg/profile-displayphoto-shrink_200_200/0/1676953875337?e=1722470400&v=beta&t=euYlGSHWFL5qbhs7L87hX7POhy14KcfG3s6QqPWAdyU',
  },
  {
    name: 'Matias Maritano',
    role: 'Mercado de Capitales',
    image: 'https://media.licdn.com/dms/image/D4E03AQGrX40Nags6Ow/profile-displayphoto-shrink_200_200/0/1681477487803?e=1722470400&v=beta&t=qA574J-R-un1CTy88g_O_2QG816eXdSvNdVB7F7seu8',
  },
];

const About = () => {
  const bgColor = useColorModeValue('white', 'gray.100');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box>
      <Box
        w="full"
        h="60vh"
        bgImage="url('https://source.unsplash.com/1600x900/?about')"
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
          <Heading fontSize="4xl">Sobre Nosotros</Heading>
          <Text fontSize="lg">Conoce más sobre el equipo detrás de DolarGaucho.</Text>
        </VStack>
      </Box>

      <Container maxW="container.xl" py={10}>
        <Stack spacing={4} textAlign="center">
          <Heading>¿Quiénes Somos?</Heading>
          <Text color={textColor}>
            DolarGaucho es un proyecto personal con el objetivo de democratizar la educación financiera en Argentina.
            Todos los datos son obtenidos de ArgentinaAPI y se actualizan diariamente. Nuestro equipo está compuesto por
            apasionados de la tecnología y las finanzas, dedicados a brindar la mejor información y herramientas para
            ayudarte a tomar decisiones financieras informadas.
          </Text>
        </Stack>

        <Heading as="h2" size="lg" textAlign="center" mt={10} mb={6}>
          Nuestro Equipo
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {teamMembers.map((member, index) => (
            <VStack key={index} p={5} bg={bgColor} borderRadius="md" boxShadow="lg" align="center">
              <Image borderRadius="full" boxSize="150px" src={member.image} alt={member.name} mb={4} />
              <Heading size="md">{member.name}</Heading>
              <Text color={textColor}>{member.role}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default About;
