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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { TfiReload } from "react-icons/tfi";

function ConversorDivisasDolar() {
  const [monto, setMonto] = useState("");
  const [tasas, setTasas] = useState([]);
  const [fechaActualizacion, setFechaActualizacion] = useState("");
  const [cambioPorcentual, setCambioPorcentual] = useState(0);

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares")
      .then((response) => response.json())
      .then((data) => {
        // Suponiendo que `data` es un array de tasas y que `fechaActualizacion` es un atributo de cada tasa
        if (data.length > 0) {
          const valorActualDolar = data.find(tasa => tasa.nombre === "Oficial").venta;
          const valorAnteriorDolar = localStorage.getItem("valorDolar") || valorActualDolar;
          const cambioPorcentual = ((valorActualDolar - valorAnteriorDolar) / valorAnteriorDolar) * 100;
          
          setTasas(data);
          setFechaActualizacion(data[0].fechaActualizacion);
          // Guardar el nuevo valor y fecha de actualización en LocalStorage
          localStorage.setItem("valorDolar", valorActualDolar);
          localStorage.setItem("fechaActualizacionDolar", data[0].fechaActualizacion);
          // Establecer el cambio porcentual en el estado para mostrarlo en la UI
          setCambioPorcentual(cambioPorcentual.toFixed(2));
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

  function calcularPorcentaje(valorActual, valorAnterior) {
    if (!valorAnterior) return { porcentaje: 0, aumento: true }; // Si no hay valor anterior, no hay cambio

    const cambio = valorActual - valorAnterior;
    const porcentaje = (cambio / valorAnterior) * 100;

    return {
      porcentaje: Math.abs(porcentaje.toFixed(2)), // Redondeamos a 2 decimales y tomamos valor absoluto
      aumento: cambio > 0, // Verdadero si hay un aumento, falso si es una disminución
    };
  }

  return (
    <Container maxW="container.xl">
      <HStack mb={4}>
        <Input
          size={"sm"}
          borderRadius={"6px"}
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Ingrese el monto en dolares"
        />
        {/* Si planeas usar el botón, asegúrate de añadir una función o texto */}
        <Button size={"sm"} colorScheme="blue">
          <TfiReload />
        </Button>
      </HStack>

      <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }} spacing={5}>
        {tasas.map((tasa, index) => {
          const { porcentaje, aumento } = calcularPorcentaje(
            tasa.venta,
            tasa.valorAnteriorVenta
          );

          return (
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
                    Convertido a {tasa.nombre}: $
                    {(monto / tasa.venta).toFixed(2)}
                  </Text>
                )}
                <Text>Cambio desde la última actualización: {cambioPorcentual}%</Text>

              </VStack>

            </Box>
          );
        })}
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
