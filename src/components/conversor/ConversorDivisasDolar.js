import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { TfiReload } from "react-icons/tfi";

function ConversorDivisasDolar() {
  const [monto, setMonto] = useState("");
  const [tasas, setTasas] = useState([]);
  const [fechaActualizacion, setFechaActualizacion] = useState("");

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares")
      .then((response) => response.json())
      .then((data) => {
        setTasas(data);
        // Asumiendo que todos los objetos tienen la misma fecha de actualización,
        // toma la fecha del primer objeto.
        if (data.length > 0) {
          setFechaActualizacion(data[0].fechaActualizacion);
        }
      });
  }, []);

  // Función para formatear la fecha de actualización
  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
  };

  return (
    <Container maxW="container.xl">
      <HStack mb={4}>
        <Input
          size={"sm"}
          borderRadius={"6px"}
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Ingrese el monto en pesos"
        />
        {/* Si planeas usar el botón, asegúrate de añadir una función o texto */}
        <Button size={"sm"} colorScheme="blue">
          <TfiReload />
        </Button>
      </HStack>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={3}>
        {tasas.map((tasa, index) => (
          <Box key={index} borderRadius={"lg"} bgColor={"#1F2A37"} p={4}>
            <VStack align="start">
                <Heading size="sm">
                  {tasa.nombre} - ${tasa.compra} - ${tasa.venta} 
                </Heading>
                {/* Añade más detalles según los datos disponibles */}
                {monto && (
                  <Text>
                    Convertido a {tasa.nombre}:{" "}
                    ${(monto / tasa.venta).toFixed(2)}
                  </Text>
                )}
              </VStack>
          </Box>
        ))}
      </SimpleGrid>
      {fechaActualizacion && (
        <Text fontSize={"sm"} textAlign={"center"} mt={5}>
          Última actualización: {formatearFecha(fechaActualizacion)}
        </Text>
      )}
    </Container>
  );
}

export default ConversorDivisasDolar;
