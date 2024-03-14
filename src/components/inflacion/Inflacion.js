import React, { useState, useEffect } from "react";
import { Box, Button, Container, HStack, Select, Text } from "@chakra-ui/react";
import InflationChart from "./InflacionMensual";

const InflationFetcher = () => {
  const [fechas, setFechas] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [inflacionValor, setInflacionValor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.argentinadatos.com/v1/finanzas/indices/inflacion")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setFechas(data);
      })
      .catch((error) => {
        setError(error.toString());
      });
  }, []);

  const handleFechaChange = (event) => {
    const selectedDate = event.target.value;
    setFechaSeleccionada(selectedDate);
    const inflacionObj = fechas.find((fecha) => fecha.fecha === selectedDate);
    if (inflacionObj) {
      setInflacionValor(inflacionObj.valor);
    } else {
      setInflacionValor("");
      setError("No se encontró el valor para la fecha seleccionada");
    }
  };

  return (
    <Container>
        <InflationChart />
      <Box spacing={1}>
        <HStack>
          <Select
            bgColor={"white"}
            borderRadius={'6px'}
            color={"black"}
            size={"sm"}
            placeholder="Seleccione una fecha"
            value={fechaSeleccionada}
            onChange={handleFechaChange}
          >
            {fechas.map((item) => (
              <option key={item.fecha} value={item.fecha}>
                {item.fecha}
              </option>
            ))}
          </Select>
          <Button size={'sm'}></Button>
        </HStack>
        <Box>
          {inflacionValor ? (
            <Text color={"white"}>
              Valor de la inflación para {fechaSeleccionada}: {inflacionValor}
            </Text>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <Text>Seleccione una fecha para ver la inflación.</Text>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default InflationFetcher;
