import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

const InflationTable = () => {
    const [indicesInflacion, setIndicesInflacion] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacion')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener los datos');
                }
                return response.json();
            })
            .then((data) => {
                setIndicesInflacion(data);
            })
            .catch((error) => {
                setError(error.toString());
            });
    }, []);

    return (
        <Box overflowX="auto">
            {indicesInflacion.length > 0 ? (
                <Table size={'sm'} variant="">
                    <Thead>
                        <Tr>
                            <Th>Fecha</Th>
                            <Th>Valor</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {indicesInflacion.map((indice) => (
                            <Tr key={indice.fecha}>
                                <Td>{indice.fecha}</Td>
                                <Td>{indice.valor}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <Text>Cargando datos...</Text>
            )}
        </Box>
    );
};

export default InflationTable;
