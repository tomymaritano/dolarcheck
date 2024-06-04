import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Text, Spinner, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText,
  StatArrow, VStack, Heading, useColorModeValue, useToast
} from '@chakra-ui/react';

function DolarOB() {
    const [dolarData, setDolarData] = useState([]);
    const [loading, setLoading] = useState(true);

    const toast = useToast();
    const textColor = useColorModeValue('gray.700', 'white');

    const fetchDolarData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('https://api.argentinadatos.com/v1/cotizaciones/dolares');
            if (!response.ok) {
                toast({
                    title: "Error loading data",
                    description: `Failed to fetch data: ${response.status} ${response.statusText}`,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
                return; // Stop execution if response is not okay
            }
            const allData = await response.json();
            console.log('All Data:', allData);  // Debugging log
            if (allData.length > 0) {
                const lastDate = allData[allData.length - 1].fecha;
                console.log('Last Date:', lastDate);  // Debugging log
                const prevDate = new Date(lastDate);
                prevDate.setDate(prevDate.getDate() - 1);

                const filteredDataToday = allData.filter(data => data.fecha === lastDate && (data.casa === 'Blue' || data.casa === 'Oficial'));
                console.log('Filtered Data Today:', filteredDataToday);  // Debugging log
                const filteredDataYesterday = allData.filter(data => data.fecha === prevDate.toISOString().split('T')[0] && (data.casa === 'Blue' || data.casa === 'Oficial'));
                console.log('Filtered Data Yesterday:', filteredDataYesterday);  // Debugging log

                const comparisonData = filteredDataToday.map(dataToday => {
                    const dataYesterday = filteredDataYesterday.find(data => data.casa === dataToday.casa);
                    const compraChange = dataYesterday ? ((dataToday.compra - dataYesterday.compra) / dataYesterday.compra) * 100 : null;
                    const ventaChange = dataYesterday ? ((dataToday.venta - dataYesterday.venta) / dataYesterday.venta) * 100 : null;

                    return {
                        ...dataToday,
                        compraChange,
                        ventaChange
                    };
                });

                console.log('Comparison Data:', comparisonData);  // Debugging log
                setDolarData(comparisonData);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dollar data:', error);
            setLoading(false);
            setDolarData([]);
        }
    }, [toast]);

    useEffect(() => {
        fetchDolarData();
    }, [fetchDolarData]);

    if (loading) return <Spinner />;
    if (!dolarData.length) return <Text>No data available.</Text>;

    return (
        <Box p={4} bg={'white'} borderRadius="lg">
            <VStack spacing={5}>
                <Heading size="lg" fontWeight="bold" textAlign="center" >Cotizaciones del Dólar</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                    {dolarData.map((item, index) => (
                        <Stat bg={'gray.50'} color={'gray.800'} key={index} _hover={{ background: 'gray.100' }} transition="background 0.3s ease-in-out" p={5} borderRadius="lg">
                            <StatLabel fontSize="xl" fontWeight="bold" pb={3} color={textColor}>Dolar {item.casa}</StatLabel>
                            <StatNumber fontSize="md" color={'gray.800'}>Compra ${item.compra}</StatNumber>
                            <StatHelpText>
                                <StatArrow type={item.compraChange >= 0 ? 'increase' : 'decrease'} />
                                {item.compraChange ? `${Math.abs(item.compraChange).toFixed(2)}%` : 'N/A'}
                            </StatHelpText>
                            <StatNumber fontSize="md" color={'gray.800'}>Venta ${item.venta}</StatNumber>
                            <StatHelpText>
                                <StatArrow type={item.ventaChange >= 0 ? 'increase' : 'decrease'} />
                                {item.ventaChange ? `${Math.abs(item.ventaChange).toFixed(2)}%` : 'N/A'}
                            </StatHelpText>
                        </Stat>
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    );
}

export default DolarOB;
