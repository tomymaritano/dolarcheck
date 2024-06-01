// src/components/_common/FCICombinedTabs.js
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
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Badge,
  Select,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';

const endpoints = {
  mercadoDinero: [
    'https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/ultimo',
    'https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/penultimo',
  ],
  rentaVariable: [
    'https://api.argentinadatos.com/v1/finanzas/fci/rentaVariable/ultimo',
    'https://api.argentinadatos.com/v1/finanzas/fci/rentaVariable/penultimo',
  ],
  rentaFija: [
    'https://api.argentinadatos.com/v1/finanzas/fci/rentaFija/ultimo',
    'https://api.argentinadatos.com/v1/finanzas/fci/rentaFija/penultimo',
  ],
  rentaMixta: [
    'https://api.argentinadatos.com/v1/finanzas/fci/rentaMixta/ultimo',
    'https://api.argentinadatos.com/v1/finanzas/fci/rentaMixta/penultimo',
  ],
};

const categories = ['todos', 'corto', 'medio', 'largo'];

const FCICombinedTabs = () => {
  const [fciData, setFciData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('mercadoDinero');
  const [selectedHorizon, setSelectedHorizon] = useState('todos');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchFciData = async () => {
      setLoading(true);
      setError(null);
      try {
        const responses = await Promise.all(
          Object.keys(endpoints).map(async (category) => {
            const categoryResponses = await Promise.all(endpoints[category].map(endpoint => fetch(endpoint)));
            const categoryData = await Promise.all(categoryResponses.map(response => response.json()));
            return { [category]: categoryData.flat() };
          })
        );

        const data = responses.reduce((acc, curr) => ({ ...acc, ...curr }), {});
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

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = (data) => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] === null) return 1;
        if (b[sortConfig.key] === null) return -1;
        if (sortConfig.key === 'fecha') {
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);
          return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  };

  const filteredData = fciData[selectedCategory]?.filter(fci => selectedHorizon === 'todos' || fci.horizonte === selectedHorizon);
  const sortedFilteredData = sortedData(filteredData || []);

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const thBgColor = useColorModeValue('gray.100', 'gray.700');
  const tabBgColor = useColorModeValue('teal.200', 'gray.600');
  // const badgeColor = useColorModeValue('teal.600', 'teal.300');

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFilteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedFilteredData.length / itemsPerPage);

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <Flex justify="space-between" align="center" mt={4}>
        <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </Button>
        <Text>
          Página {currentPage} de {totalPages}
        </Text>
        <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente
        </Button>
      </Flex>
    );
  };

  return (
    <Box p={6} bg={bgColor} borderRadius="md" mx="auto">
      <VStack spacing={6}>
        <Heading as="h1" size="lg" color={textColor} textAlign="center">
          Fondos Comunes de Inversión
        </Heading>
        <Text fontSize="md" color={textColor} textAlign="center" maxWidth="800px">
          Explora y compara distintos tipos de fondos comunes de inversión. Selecciona una categoría para ver los detalles y rendimientos más recientes.
        </Text>
        <Divider />
        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          <>
            <Tabs variant="soft-rounded" colorScheme="teal" align="center" width="100%">
              <TabList>
                <Tab _selected={{ bg: tabBgColor }} onClick={() => { setSelectedCategory('mercadoDinero'); setCurrentPage(1); }}>Mercado de Dinero</Tab>
                <Tab _selected={{ bg: tabBgColor }} onClick={() => { setSelectedCategory('rentaVariable'); setCurrentPage(1); }}>Renta Variable</Tab>
                <Tab _selected={{ bg: tabBgColor }} onClick={() => { setSelectedCategory('rentaFija'); setCurrentPage(1); }}>Renta Fija</Tab>
                <Tab _selected={{ bg: tabBgColor }} onClick={() => { setSelectedCategory('rentaMixta'); setCurrentPage(1); }}>Renta Mixta</Tab>
              </TabList>
              <TabPanels>
                {Object.keys(endpoints).map((category, index) => (
                  <TabPanel key={index}>
                    <Select
                      placeholder="Selecciona un horizonte de inversión"
                      onChange={(e) => { setSelectedHorizon(e.target.value); setCurrentPage(1); }}
                      mb={4}
                      bg="white"
                    >
                      {categories.map(horizon => (
                        <option key={horizon} value={horizon}>
                          {horizon.charAt(0).toUpperCase() + horizon.slice(1)}
                        </option>
                      ))}
                    </Select>
                    <Table variant="simple" size="md" colorScheme="teal">
                      <Thead>
                        <Tr bg={thBgColor}>
                          <Th>
                            Fondo
                            <IconButton
                              size="xs"
                              ml={2}
                              icon={sortConfig.key === 'fondo' && sortConfig.direction === 'ascending' ? <TriangleUpIcon /> : <TriangleDownIcon />}
                              onClick={() => handleSort('fondo')}
                            />
                          </Th>
                          <Th>
                            Fecha
                            <IconButton
                              size="xs"
                              ml={2}
                              icon={sortConfig.key === 'fecha' && sortConfig.direction === 'ascending' ? <TriangleUpIcon /> : <TriangleDownIcon />}
                              onClick={() => handleSort('fecha')}
                            />
                          </Th>
                          <Th isNumeric>
                            VCP (%)
                            <IconButton
                              size="xs"
                              ml={2}
                              icon={sortConfig.key === 'vcp' && sortConfig.direction === 'ascending' ? <TriangleUpIcon /> : <TriangleDownIcon />}
                              onClick={() => handleSort('vcp')}
                            />
                          </Th>
                          <Th isNumeric>
                            CCP (%)
                            <IconButton
                              size="xs"
                              ml={2}
                              icon={sortConfig.key === 'ccp' && sortConfig.direction === 'ascending' ? <TriangleUpIcon /> : <TriangleDownIcon />}
                              onClick={() => handleSort('ccp')}
                            />
                          </Th>
                          <Th isNumeric>
                            Patrimonio
                            <IconButton
                              size="xs"
                              ml={2}
                              icon={sortConfig.key === 'patrimonio' && sortConfig.direction === 'ascending' ? <TriangleUpIcon /> : <TriangleDownIcon />}
                              onClick={() => handleSort('patrimonio')}
                            />
                          </Th>
                          <Th>Horizonte</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {currentItems.map((fci, index) => (
                          <Tr key={index}>
                            <Td>{fci.fondo || 'N/A'}</Td>
                            <Td>{formatDate(fci.fecha)}</Td>
                            <Td isNumeric>{fci.vcp !== null ? fci.vcp : 'N/A'}</Td>
                            <Td isNumeric>{fci.ccp !== null ? fci.ccp : 'N/A'}</Td>
                            <Td isNumeric>{formatCurrency(fci.patrimonio)}</Td>
                            <Td>
                              {fci.horizonte ? (
                                <Badge colorScheme="teal" variant="solid" fontSize="0.8em">
                                  {fci.horizonte.charAt(0).toUpperCase() + fci.horizonte.slice(1)}
                                </Badge>
                              ) : 'N/A'}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default FCICombinedTabs;
