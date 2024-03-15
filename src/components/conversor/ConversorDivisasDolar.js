import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { TfiReload } from "react-icons/tfi";
import DolarChart from "../Indice/Dolar";
import Indice from "../Indice/Indice";

function ConversorDivisasDolar() {
  const [monto, setMonto] = useState("");
  const [tasas, setTasas] = useState([]);
  const [fechaActualizacion, setFechaActualizacion] = useState("");

  useEffect(() => {
    const obtenerTasasDeCambio = () => {
      fetch("https://dolarapi.com/v1/dolares")
        .then((response) => response.json())
        .then((data) => {
          const tasasModificadas = data.map((tasa) => {
            // Verificamos si el nombre de la tasa es "contado con liquidacion" y cambiamos el nombre a "CCL"
            if (tasa.nombre === "Contado con liquidación") {
              return { ...tasa, nombre: "CCL" };
            }
            return tasa;
          });
          setTasas(tasasModificadas);
          setFechaActualizacion(new Date().toISOString()); // Ajusta según la estructura real de tu data
        })
        .catch((error) =>
          console.error("Error al obtener las tasas de cambio: ", error)
        );
    };

    obtenerTasasDeCambio();
  }, []);

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

  // Función para resetear el monto
  const resetearMonto = () => {
    setMonto("");
  };

  return (
    <Box>
      <Heading  mb={4} size={"md"}>
        Conversor de compra
      </Heading>
      <HStack mb={4}>
        <Input
          size={"sm"}
          borderRadius={"6px"}
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Ingrese el monto en pesos"
        />
        <Button onClick={resetearMonto} size={"sm"} colorScheme="blue">
          <TfiReload />
        </Button>
      </HStack>

      <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }} spacing={3}>
        {tasas.map((tasa, index) => (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            key={index}
            borderRadius="lg"
            bg="#1F2A37"
            p={3}
          >
            <HStack>
              <Box
                display={"flex"}
                flexDir={"column"}
                alignContent={"flex-start"}
                textAlign={"start"}
              >
                <Text fontSize={"lg"} fontWeight={"800"}>Dolár {""}
                  {tasa.nombre}{" "}
                </Text>
                <Text
                  fontWeight={"200"}
                  fontSize={"sm"}
                  as={"b"}
                  color={
                    monto / tasa.venta > 100
                      ? "green.500"
                      : monto / tasa.venta < 100 && monto / tasa.venta !== 0
                      ? "red.500"
                      : "gray.500"
                  }
                >
                  {(monto / tasa.venta || 0).toFixed(2)}U$D
                </Text>
              </Box>
            </HStack>
            <HStack
              display={"flex"}
              gap={4}
              spacing={4}
            >
              <Box>
                <Text color={'gray.400'} fontSize={'sm'}>Compra</Text>
                <Text as={'b'} alignContent={"start"}> ${tasa.compra}</Text>
              </Box>
              <Box>
                <Text color={'gray.400'} fontSize={'sm'}>Venta</Text>
                <Text as={'b'} alignContent={"start"}> ${tasa.venta}</Text>
              </Box>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
      
      <Box mb={16} mt={6}>
        <Heading size={'md'}>Indices inflacionarios</Heading>
        <Indice />
      </Box>
      {fechaActualizacion && (
        <Text fontSize={"sm"} textAlign={"center"} mt={5}>
          Última actualización: {formatearFecha(fechaActualizacion)}
        </Text>
      )}
      <Divider mb={4} mt={4} />
      <DolarChart />
    </Box>
  );
}

export default ConversorDivisasDolar;
