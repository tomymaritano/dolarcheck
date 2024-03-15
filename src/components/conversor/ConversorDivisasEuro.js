import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  VStack,
  Spinner,
  SimpleGrid,
  Button,
  HStack,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { TfiReload } from "react-icons/tfi";

function CotizacionesMonedas() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monto, setMonto] = useState("");
  const toast = useToast();

  useEffect(() => {
    const monedas = ["brl", "eur", "clp", "uyu"];
    Promise.all(
      monedas.map((moneda) =>
        fetch(`https://dolarapi.com/v1/cotizaciones/${moneda}`).then(
          (response) => response.json()
        )
      )
    )
      .then((results) => {
        // Para cada moneda, asumimos que cada respuesta es directamente los datos útiles
        setCotizaciones(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener cotizaciones:", error);
        setLoading(false);
      });
  }, []);
  const handleChangeMonto = (e) => {
    setMonto(e.target.value);
    mostrarToast();
  };

  const mostrarToast = () => {
    toast({
      title: "Consulta procesada.",
      description: "Se ha actualizado el monto para la conversión.",
      status: "info",
      duration: 1000,
      isClosable: true,
      position: "bottom",
    });
  };

  return (
    <Box>
      <Heading mb={4} size={"sm"}>
        <Tooltip label="De peso a otras divisas" aria-label="TNA">
          Converti
        </Tooltip>
      </Heading>
      <HStack mb={3} spacing={2}>
        <Input
          size={"sm"}
          placeholder="Ingrese el monto en pesos"
          borderRadius={"6px"}
          type="number"
          value={monto}
          onChange={handleChangeMonto}
        />
        <Button size={"sm"} colorScheme="blue">
          <TfiReload />
        </Button>
      </HStack>

      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }} spacing={1}>
          {cotizaciones.map((cotizacion, index) => (
            <Box
              bg="#1F2A37"
              key={index}
              borderRadius="lg"
              overflow="hidden"
              p={3}
              color={"white"}
            >
              <VStack align="start">
                <Heading size="sm">
                  {cotizacion.nombre} - {cotizacion.compra} - {cotizacion.venta}
                </Heading>
                {/* Añade más detalles según los datos disponibles */}
                {monto && (
                  <Text>
                    Convertido a {cotizacion.nombre}:{" "}
                    {(monto / cotizacion.venta).toFixed(2)}
                  </Text>
                )}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default CotizacionesMonedas;
