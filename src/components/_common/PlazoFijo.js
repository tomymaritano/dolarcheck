// src/components/_common/PlazoFijoRates.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,

  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  useToast,
  HStack,
} from '@chakra-ui/react';

const PlazoFijoRates = () => {
  const [plazoFijoData, setPlazoFijoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monto, setMonto] = useState('');
  const [returns, setReturns] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchPlazoFijoData = async () => {
      try {
        const response = await fetch('https://api.argentinadatos.com/v1/finanzas/tasas/plazoFijo');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de Plazo Fijo');
        }
        const data = await response.json();
        setPlazoFijoData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlazoFijoData();
  }, []);

  const handleMontoChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setMonto(value);
    }
  };

  const handleGenerateReturns = () => {
    if (monto) {
      const calculatedReturns = plazoFijoData.map((entity) => {
        const tnaClientes = entity.tnaClientes / 100;
        const tnaNoClientes = entity.tnaNoClientes / 100;
        const retornoClientes = monto * (1 + tnaClientes);
        const retornoNoClientes = monto * (1 + tnaNoClientes);
        return {
          ...entity,
          retornoClientes,
          retornoNoClientes,
        };
      });
      setReturns(calculatedReturns);
      toast({
        title: "Retorno calculado.",
        description: "El retorno de inversión ha sido calculado.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // const sortedReturns = returns.sort((a, b) => b.retornoClientes - a.retornoClientes);

  return (
    <Box p={4}>
      <Heading mb={4} size="md">
        Tasas de Plazo Fijo
      </Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <>
          <HStack spacing={4} mb={4}>
            <Input
              bg={'white'}
              type="text"
              placeholder="Ingrese el monto de dinero"
              value={monto}
              onChange={handleMontoChange}
              maxWidth="300px"
            />
            <Button variant={'outline'} colorScheme={'teal'} onClick={handleGenerateReturns} >
              Calcular
            </Button>
          </HStack>
          <Table bg={'white'} p={6} variant="simple" size="sm">
            <Thead p={4}>
              <Tr>
                <Th>Entidad</Th>
                <Th isNumeric>TNA Clientes (%)</Th>
                <Th isNumeric>TNA No Clientes (%)</Th>
                <Th isNumeric>Retorno Clientes</Th>
                <Th isNumeric>Retorno No Clientes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {plazoFijoData.map((entity, index) => (
                <Tr key={index} _hover={{background: 'gray.50'}}>
                  <Td display={'flex'} alignItems={'center'} fontWeight={'500'}>
                    <Image pr={3} src={entity.logo} alt={entity.entidad} boxSize="50px" />{entity.entidad}</Td>

                  <Td isNumeric>{entity.tnaClientes}</Td>
                  <Td isNumeric>{entity.tnaNoClientes}</Td>
                  <Td
                    isNumeric
                    fontWeight={'600'}
                    color={returns.length > 0 && returns[index].retornoClientes === Math.max(...returns.map(r => r.retornoClientes)) ? 'green.500' : 'inherit'}
                  >
                    {returns.length > 0 ? returns[index].retornoClientes.toFixed(2) : 'N/A'}
                  </Td>
                  <Td
                    isNumeric
                    fontWeight={'600'}
                    color={returns.length > 0 && returns[index].retornoNoClientes === Math.min(...returns.map(r => r.retornoNoClientes)) ? 'red.500' : 'inherit'}
                  >
                    {returns.length > 0 ? returns[index].retornoNoClientes.toFixed(2) : 'N/A'}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default PlazoFijoRates;
