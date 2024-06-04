// src/components/Footer.js
import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  SimpleGrid,
  Heading,
  VStack,
  HStack,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
    zIndex={1}
      bg={useColorModeValue('gray.800', 'gray.900')}
      color={useColorModeValue('gray.200', 'gray.200')}
      py={10}
    >
      <Container as={Stack} maxW="6xl" spacing={10}>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={8}>
          <Stack align="flex-start">
            <Heading fontSize="lg" mb={2}>
              DolarGaucho
            </Heading>
            <Link href="#">Inicio</Link>
            <Link href="#">Servicios</Link>
            <Link href="#">Nosotros</Link>
            <Link href="#">Contacto</Link>
          </Stack>

          <Stack align="flex-start">
            <Heading fontSize="lg" mb={2}>
              Recursos
            </Heading>
            <Link href="#">Blog</Link>
            <Link href="#">Documentación</Link>
            <Link href="#">API</Link>
            <Link href="#">Soporte</Link>
          </Stack>

          <Stack align="flex-start">
            <Heading fontSize="lg" mb={2}>
              Legal
            </Heading>
            <Link href="#">Política de Privacidad</Link>
            <Link href="#">Términos de Servicio</Link>
            <Link href="#">Cookies</Link>
          </Stack>

          <Stack align="flex-start">
            <Heading fontSize="lg" mb={2}>
              Síguenos
            </Heading>
            <HStack>
              <IconButton
                as="a"
                href="https://github.com/tomymaritano"
                aria-label="GitHub"
                icon={<FaGithub />}
                size="lg"
                variant="ghost"
                color="current"
              />
              <IconButton
                as="a"
                href="https://twitter.com/tomymaritano"
                aria-label="Twitter"
                icon={<FaTwitter />}
                size="lg"
                variant="ghost"
                color="current"
              />
              <IconButton
                as="a"
                href="https://instagram.com/tomymaritano"
                aria-label="Instagram"
                icon={<FaInstagram />}
                size="lg"
                variant="ghost"
                color="current"
              />
            </HStack>
          </Stack>
        </SimpleGrid>

        <Divider />

        <VStack spacing={4} align="center">
          <Text fontSize="sm">
            DolarGaucho es un proyecto personal dedicado a democratizar la educación financiera en Argentina.
            Los datos son obtenidos de ArgentinaAPI y se actualizan diariamente.
          </Text>
          <Text fontSize="sm">© {new Date().getFullYear()} DolarGaucho. Todos los derechos reservados.</Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
