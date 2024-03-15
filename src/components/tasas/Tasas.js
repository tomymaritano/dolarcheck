import {
  Avatar,
  Box,
  HStack,
  Heading,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Text,
  Thead,
  Tr,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { CiCalculator1 } from "react-icons/ci";
import { FiRefreshCw } from "react-icons/fi";

const Tasas = () => {
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [capitalInicial, setCapitalInicial] = useState(""); // Estado para almacenar el monto inicial en pesos
  const [retornos, setRetornos] = useState({}); // Estado para almacenar los retornos totales del plazo fijo por cada entidad financiera
  const [maxRetorno, setMaxRetorno] = useState(0); // Estado para almacenar el retorno máximo
  const [minRetorno, setMinRetorno] = useState(Number.POSITIVE_INFINITY); // Estado para almacenar el retorno mínimo
  const toast = useToast(); // Hook para mostrar el toast

  useEffect(() => {
    fetch("https://api.argentinadatos.com/v1/finanzas/tasas/plazoFijo")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRates(data); // Establecer el estado de las tasas
        setIsLoading(false); // Cambiar isLoading a false una vez que los datos se han cargado
      })
      .catch((error) => {
        console.error("Error fetching plazo fijo rates:", error);
        setIsLoading(false); // Cambiar isLoading a false en caso de error
      });
  }, []);

  // Función para calcular el retorno de un plazo fijo para una entidad financiera específica
  const calcularRetornoPlazoFijo = (capital, tnaClientes) => {
    const tiempoEnDias = 30; // Tiempo en días del plazo fijo (podría ser una variable si cambia)
    const capitalFloat = parseFloat(capital); // Convertir el monto inicial a número
    if (isNaN(capitalFloat)) {
      // Verificar si el monto inicial es un número válido
      return 0;
    }

    const interesSimple =
      (capitalFloat * tnaClientes * tiempoEnDias) / (365 * 100); // Calcular el interés simple
    const retornoTotal = capitalFloat + interesSimple; // Calcular el retorno total sumando el capital inicial y el interés
    return retornoTotal.toFixed(2); // Retornar el retorno total del plazo fijo con dos decimales
  };

  // Función para manejar el cambio en el input de monto inicial
  const handleCapitalInicialChange = (event) => {
    setCapitalInicial(event.target.value);
  };

  // Función para resetear el formulario
  const resetFormulario = () => {
    setCapitalInicial("");
    setRetornos({});
  };

  // Función para manejar el clic en el botón de calcular
  const handleCalcularClick = () => {
    const retornosCalculados = {};
    let max = 0;
    let min = Number.POSITIVE_INFINITY;
    rates.forEach((rate) => {
      const retorno = calcularRetornoPlazoFijo(
        capitalInicial,
        rate.tnaClientes
      );
      retornosCalculados[rate.entidad] = retorno;
      if (retorno > max) {
        max = retorno;
      }
      if (retorno < min) {
        min = retorno;
      }
    });
    setRetornos(retornosCalculados);
    setMaxRetorno(max);
    setMinRetorno(min);
    showToast(); // Mostrar el toast después de calcular los retornos
  };

  // Función para mostrar el toast
  const showToast = () => {
    toast({
      title: "Búsqueda completa",
      description: "Se han calculado los retornos del plazo fijo.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Función para obtener el color del texto según el retorno
  const getColorForText = (retorno) => {
    if (retorno === maxRetorno) {
      return "green.500"; // Color verde para el retorno máximo
    } else if (retorno === minRetorno) {
      return "red.500"; // Color rojo para el retorno mínimo
    } else {
      return ""; // Sin color para los demás retornos
    }
  };

  return (
    <Box>
      <Heading mb={4} size={"sm"}>
        Plazo Fijo /{" "}
        <Tooltip label="Tasa Nominal Anual" aria-label="TNA">
          TNA
        </Tooltip>
      </Heading>
      <HStack mb={3} position={"sticky"}>
        <Input
          borderRadius={"6px"}
          size={"sm"}
          type="number"
          id="capitalInicial"
          placeholder="Ingresa el monto en pesos"
          value={capitalInicial}
          onChange={handleCapitalInicialChange}
        />
        <IconButton
          size={"sm"}
          aria-label="Calcular retorno"
          icon={<CiCalculator1 />}
          onClick={handleCalcularClick}
        />
        <IconButton
          size={"sm"}
          aria-label="Resetear formulario"
          icon={<FiRefreshCw />}
          onClick={resetFormulario}
        />
      </HStack>
      {isLoading ? (
        <p>Cargando tasas...</p>
      ) : (
        <Box maxH={"40vh"} overflowY={"auto"}>
          <Table h={"20vh"} overflow={true} size={"sm"} variant={"stripe"}>
            <Thead>
              <Tr>
                <Th>Entidad</Th>
                <Th>TNA</Th>
                <Th>Retorno</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rates.map((rate, index) => (
                <Tr key={index}>
                  <Td fontSize={"12px"}>
                    <HStack spacing={2}>
                      <Avatar size={"sm"} src={rate.logo}></Avatar>
                      <Text>{rate.entidad}</Text>
                    </HStack>
                  </Td>
                  <Td>{rate.tnaClientes}</Td>
                  <Td>
                    <Text
                      as={"b"}
                      color={getColorForText(retornos[rate.entidad])}
                    >
                      {retornos[rate.entidad] || ""} ARS
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default Tasas;
