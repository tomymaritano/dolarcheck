// src/components/_common/UvaIndex.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Input, HStack } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

const UvaIndex = () => {
  const [uvaData, setUvaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchUvaData = async () => {
      try {
        const response = await fetch('https://api.argentinadatos.com/v1/finanzas/indices/uva');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de UVA');
        }
        const data = await response.json();
        setUvaData(data);
        setFilteredData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUvaData();
  }, []);

  useEffect(() => {
    if (startDate || endDate) {
      const filtered = uvaData.filter(uva => {
        const date = new Date(uva.fecha);
        const start = startDate ? new Date(startDate) : new Date('1970-01-01');
        const end = endDate ? new Date(endDate) : new Date();
        return date >= start && date <= end;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(uvaData);
    }
  }, [startDate, endDate, uvaData]);

  const data = {
    labels: filteredData.map(uva => new Date(uva.fecha).toLocaleDateString()),
    datasets: [
      {
        label: 'Valor UVA',
        data: filteredData.map(uva => uva.valor),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valor UVA',
        },
      },
    },
  };

  return (
    <Box p={4}>
      <Heading mb={4} size="md">
        Índices UVA
      </Heading>
                <Text mb={6} textAlign={{ base: 'center', md: 'left' }}>
            Precios Historicos de Indices UVA
          </Text>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <>
          <HStack spacing={4} mb={4}>
            <Input
            bg={'white'}
              type="date"
              placeholder="Fecha de inicio"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
            bg={'white'}
              type="date"
              placeholder="Fecha de fin"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </HStack>
          <Box mb={4} height="400px">
            <Line data={data} options={options} plugins={[zoomPlugin]} />
          </Box>
         
        </>
      )}
    </Box>
  );
};

export default UvaIndex;
