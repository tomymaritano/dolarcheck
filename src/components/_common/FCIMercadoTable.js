// src/components/_common/FCIMercadoDineroTable.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Divider,
  Tooltip,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

const FCIMercadoDineroTable = () => {
  const [fciData, setFciData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFciData = async () => {
      try {
        const response = await fetch('https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/ultimo');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de FCI');
        }
        const data = await response.json();
        setFciData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFciData();
  }, []);

  const formatCurrency = (value) => {
    return value !== null ? value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) : 'N/A';
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const tableBgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'gray.100');

  return (
    <Box p={4} bg={bgColor} borderRadius="md">
      <VStack align="start" mb={4}>
        <Heading size="md" color={textColor}>
          Fondos Comunes de Inversión del Mercado de Dinero
        </Heading>
        <Text color={textColor}>
          <Tooltip label="Últimos datos disponibles" aria-label="Info">
            <Icon as={InfoIcon} mr={2} />
          </Tooltip>
          Estos son los datos más recientes de los Fondos Comunes de Inversión (FCI) del mercado de dinero.
        </Text>
      </VStack>
      <Divider mb={4} />
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Box p={4} borderWidth="1px" borderRadius="lg" bg={tableBgColor} boxShadow="md">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Fondo</Th>
                <Th>Fecha</Th>
                <Th isNumeric>VCP (%)</Th>
                <Th isNumeric>CCP (%)</Th>
                <Th isNumeric>Patrimonio</Th>
                <Th>Horizonte</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fciData.map((fci, index) => (
                <Tr key={index}>
                  <Td>{fci.fondo || 'N/A'}</Td>
                  <Td>{formatDate(fci.fecha)}</Td>
                  <Td isNumeric>{fci.vcp !== null ? fci.vcp : 'N/A'}</Td>
                  <Td isNumeric>{fci.ccp !== null ? fci.ccp : 'N/A'}</Td>
                  <Td isNumeric>{formatCurrency(fci.patrimonio)}</Td>
                  <Td>{fci.horizonte || 'N/A'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default FCIMercadoDineroTable;
