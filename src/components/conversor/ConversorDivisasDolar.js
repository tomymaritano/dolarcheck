import React, { useState, useEffect } from "react";
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
import { TfiReload } from "react-icons/tfi";

function ConversorDivisasDolar() {
  const [monto, setMonto] = useState("");
  const [tasas, setTasas] = useState([]);
  const [fechaActualizacion, setFechaActualizacion] = useState("");

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const tasasConCambio = data.map((tasa) => {
            const claveValorAnterior = `${tasa.nombre}_valorAnteriorVenta`;
            const valorAnterior = parseFloat(localStorage.getItem(claveValorAnterior)) || tasa.venta;
            const cambioPorcentual = ((tasa.venta - valorAnterior) / valorAnterior) * 100;

            // Actualizar localStorage con el valor actual para futuras referencias
            localStorage.setItem(claveValorAnterior, tasa.venta);

            return { ...tasa, cambioPorcentual: cambioPorcentual.toFixed(2) };
          });

          setTasas(tasasConCambio);
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
        {/* Implementa una funcionalidad para este botón si es necesario */}
        <Button size={"sm"} colorScheme="blue">
          <TfiReload />
        </Button>
      </HStack>

      <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }} spacing={5}>
        {tasas.map((tasa, index) => (
          <Box key={index} borderRadius="lg" bgColor="#1F2A37" p={4}>
            <VStack align="start">
              <Heading size="sm">
                {tasa.nombre} - ARS
                <Text as="span" color="green.500">
                  {tasa.compra}
                </Text>{" "}
                - ARS
                <Text as="span" color="red.500">
                  {tasa.venta}
                </Text>
              </Heading>
              {monto && (
                <Text>
                  Convertido a {tasa.nombre}: ${((monto / tasa.venta) || 0).toFixed(2)}
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
