// src/Noticias.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Image,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { obtenerNoticias } from "./newApiService";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FiRefreshCcw } from "react-icons/fi";

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const noticiasPorPagina = 5; // Configura la cantidad de noticias por página

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const articulos = await obtenerNoticias(terminoBusqueda); // Asegúrate de que tu función admita este parámetro
        setNoticias(articulos);
        console.log(articulos);
      } catch (error) {
        console.error("Error al obtener noticias:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchNoticias();
  }, [terminoBusqueda]);

  const contieneTerminoBusqueda = (texto, terminoBusqueda) => {
    // Verifica primero si texto es null o undefined y, en ese caso, usa una cadena vacía
    const textoSeguro = texto ?? "";
    return textoSeguro.toLowerCase().includes(terminoBusqueda.toLowerCase());
  };

  // Filtro de noticias en el frontend (opcional, dependiendo de tu implementación de obtenerNoticias)
  const noticiasFiltradas = noticias.filter(
    (noticia) =>
      contieneTerminoBusqueda(noticia.title, terminoBusqueda) ||
      contieneTerminoBusqueda(noticia.description, terminoBusqueda)
  );

  const truncarTexto = (texto, longitudMaxima) => {
    if (texto.length > longitudMaxima) {
      return texto.substring(0, longitudMaxima) + "...";
    } else {
      return texto;
    }
  };

  // Reemplazo de imágenes nulas
  const obtenerImagenNoticia = (urlToImage) =>
    urlToImage ||
    "https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png";

  // Paginación
  const indiceUltimaNoticia = paginaActual * noticiasPorPagina;
  const indicePrimeraNoticia = indiceUltimaNoticia - noticiasPorPagina;
  const noticiasActuales = noticiasFiltradas.slice(
    indicePrimeraNoticia,
    indiceUltimaNoticia
  );

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
  const totalPaginas = Math.ceil(noticiasFiltradas.length / noticiasPorPagina);

  if (cargando) {
    return <Box>Cargando noticias...</Box>;
  }

  return (
    <Box mt={10}>
      <Box>
        <Heading color={"white"}>Popular post</Heading>
        <Text color={"white"}>Informacion reciente.</Text>
        <Breadcrumb
          mt={4}
          fontSize={"14px"}
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink color={"white"} href="#">
              Inicio
            </BreadcrumbLink>{" "}
            {/* Ajusta según tu ruta */}
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink color={"white"} href="#">
              Politica
            </BreadcrumbLink>{" "}
            {/* Ajusta según tu ruta */}
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink color={"white"} href="#">
              Negocios
            </BreadcrumbLink>{" "}
            {/* Ajusta según tu ruta */}
          </BreadcrumbItem>
          {/* Agrega más BreadcrumbItems según sea necesario */}
        </Breadcrumb>
      </Box>
      <HStack
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={2}
      >
        <Input
          color={"white"}
          size={"sm"}
          borderRadius={"6px"}
          placeholder="Buscar noticias"
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          value={terminoBusqueda}
        />
        <IconButton colorScheme="purple" size={"sm"}>
          <FiRefreshCcw />
        </IconButton>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {noticiasActuales.map((noticia, index) => (
          <Box
            bgColor={"rgb(255, 255, 255, 0.1)"}
            backdropFilter="blur(20px)"
            key={index}
            display={"flex"}
            flexDir={"column"}
            href={noticia.url}
            target="_blank"
            rel="noopener noreferrer"
            pb={4}
            mt={4}
            borderRadius={"6px"}
          >
            <Box textAlign={"start"}>
              <Image
                borderRadius={"6px"}
                border={0}
                objectFit="cover"
                w="100%"
                h="150px"
                src={obtenerImagenNoticia(noticia.urlToImage)}
                alt="Imagen de noticia"
              />
              <Heading p={3} as={"h2"} size={"sm"} color={"white"}>
                {truncarTexto(noticia.title, 52)}
              </Heading>
              <Stack pr={3} pl={3}>
                <Text fontSize={"sm"} color="white">
                  {noticia.description}
                </Text>
                {/* <Text fontSize={"sm"} color={"white"}>
            Por: {noticia.author || "Autor desconocido"}
          </Text> */}
                {/* <Button
            width={"80px"}
            colorScheme="blue"
            as={"a"}
            mt={1}
            size={"sm"}
            href={noticia.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visitar
          </Button> */}
              </Stack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Stack direction="row" spacing={3} align="center" justifyContent="center">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <Button
            mt={4}
            colorScheme="purple"
            variant="solid"
            size="sm"
            key={i}
            onClick={() => cambiarPagina(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Noticias;
