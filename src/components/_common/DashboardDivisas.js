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

function DashboardDivisas() {
  const [monto, setMonto] = useState("");
  const [montoConvertido, setMontoConvertido] = useState("");
  const [tasasDolar, setTasasDolar] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // Obtener tasas de cambio del dólar
    fetch("https://dolarapi.com/v1/dolares")
      .then((response) => response.json())
      .then((data) => {
        const tasasModificadas = data.map((tasa) => {
          if (tasa.nombre === "Contado con liquidación") {
            return { ...tasa, nombre: "CCL" };
          }
          return tasa;
        });
        setTasasDolar(tasasModificadas);
      })
      .catch((error) =>
        console.error("Error al obtener las tasas de cambio del dólar: ", error)
      );

    // Obtener cotizaciones de otras monedas
    const monedas = ["brl", "eur", "clp", "uyu"];
    Promise.all(
      monedas.map((moneda) =>
        fetch(`https://dolarapi.com/v1/cotizaciones/${moneda}`).then(
          (response) => response.json()
        )
      )
    )
      .then((results) => {
        setCotizaciones(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener cotizaciones:", error);
        setLoading(false);
      });
  }, []);

  const handleChangeMonto = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setMonto(value);
    }
  };

  const handleConvertir = () => {
    setMontoConvertido(monto);
    mostrarToast();
  };

  const mostrarToast = () => {
    toast({
      title: "Consulta procesada.",
      description: "Se ha actualizado el monto para la conversión.",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "bottom",
    });
  };

  // const resetearMonto = () => {
  //   setMonto("");
  //   setMontoConvertido("");
  // };

  return (
    <Box p={{ base: 4, md: 6, lg: 8 }}>
      <Heading mb={4} size="lg">
        <Tooltip label="Conversor de compra venta" aria-label="TNA">
          Convertir
        </Tooltip>
      </Heading>
      <HStack mb={8} spacing={2}>
        <Input
          size={{ base: "sm", lg: "md" }}
          variant="outlined"
          focusBorderColor="red.300"
          placeholder="Ingrese el monto en pesos"
          borderRadius="6px"
          width={{ base: "100%", lg: "30%" }}
          type="text"
          value={monto}
          onChange={handleChangeMonto}
          step="0.01"
        />
        <Button size={{ base: "sm", lg: "md" }} colorScheme="green" onClick={handleConvertir}>
          Convertir
        </Button>
        {/* <Button size={{base: 'sm', lg: 'md'}} colorScheme="green" onClick={resetearMonto}>
          <TfiReload />
        </Button> */}
      </HStack>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <Heading mb={4} size="md">
            Cotización del Dolar
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mb={8}>
            {tasasDolar.map((tasa, index) => (
              <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ base: "flex-start", md: "center" }}
                key={index}
                borderRadius="5px"
                color="black"
                bg="white"
                p={4}
              >
                <VStack align="start" mb={{ base: 4, md: 0 }}>
                  <Text fontWeight={'700'} fontSize="lg" >
                    Dolar {tasa.nombre}
                  </Text>
                  {montoConvertido && (
                    <>
                      <Text fontSize="sm" color="green.500">
                        Compra: ${(montoConvertido / tasa.compra || 0).toFixed(2)} U$D
                      </Text>
                      <Text fontSize="sm" color="red.500">
                        Venta: ${(montoConvertido / tasa.venta || 0).toFixed(2)} U$D
                      </Text>
                    </>
                  )}
                </VStack>
                <HStack spacing={4}>
                  <Box textAlign="center">
                    <Text p={1} color="black" fontSize="sm">
                      Compra
                    </Text>
                    <Text as="b" alignContent="start">
                      ${tasa.compra}
                    </Text>
                  </Box>
                  <Box textAlign="center">
                    <Text p={1} color="black" fontSize="sm">
                      Venta
                    </Text>
                    <Text as="b" alignContent="start">
                      ${tasa.venta}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>

          <Heading mb={4} size="md">
            Cotizaciones de Otras Monedas
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {cotizaciones.map((cotizacion, index) => (
              <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ base: "flex-start", md: "center" }}
                key={index}
                borderRadius="5px"
                color="black"
                bg="white"
                p={4}
              >
                <VStack align="start" mb={{ base: 4, md: 0 }}>
                  <Text fontSize="lg" fontWeight="700">
                    {cotizacion.nombre}
                  </Text>
                  {montoConvertido && (
                    <>
                      <Text fontSize="sm" color="green.500">
                        Compra ${(montoConvertido / cotizacion.compra || 0).toFixed(2)}
                      </Text>
                      <Text fontSize="sm" color="red.500">
                        Venta: ${(montoConvertido / cotizacion.venta || 0).toFixed(2)}
                      </Text>
                    </>
                  )}
                </VStack>
                <HStack spacing={4}>
                  <Box textAlign="center">
                    <Text p={1} color="gray.500" fontSize="sm">
                      Compra
                    </Text>
                    <Text as="b" alignContent="start">
                      ${cotizacion.compra}
                    </Text>
                  </Box>
                  <Box textAlign="center">
                    <Text p={1} color="gray.500" fontSize="sm">
                      Venta
                    </Text>
                    <Text as="b" alignContent="start">
                      ${cotizacion.venta}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}

export default DashboardDivisas;
