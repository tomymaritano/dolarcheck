// src/components/_common/Depositos30DiasChart.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Input, HStack } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

const Depositos30DiasChart = () => {
  const [depositosData, setDepositosData] = useState([]);
  const [filteredDepositosData, setFilteredDepositosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchDepositosData = async () => {
      try {
        const response = await fetch('https://api.argentinadatos.com/v1/finanzas/tasas/depositos30Dias');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de Depósitos a 30 Días');
        }
        const data = await response.json();
        setDepositosData(data);
        setFilteredDepositosData(data); // Inicialmente, mostramos todos los datos
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositosData();
  }, []);

  useEffect(() => {
    const filterData = (data, startDate, endDate) => {
      return data.filter(item => {
        const date = new Date(item.fecha);
        const start = startDate ? new Date(startDate) : new Date('1970-01-01');
        const end = endDate ? new Date(endDate) : new Date();
        return date >= start && date <= end;
      });
    };

    setFilteredDepositosData(filterData(depositosData, startDate, endDate));
  }, [startDate, endDate, depositosData]);

  const chartData = {
    labels: filteredDepositosData.map(deposito => new Date(deposito.fecha).toLocaleDateString()),
    datasets: [
      {
        label: 'Valor de Depósitos a 30 Días',
        data: filteredDepositosData.map(deposito => deposito.valor),
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
          text: 'Valor',
        },
      },
    },
  };

  return (
    <Box p={4}>
      <Heading mb={4} size="md">
        Valores de Depósitos a 30 Días
      </Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <>
          <HStack spacing={4} mb={4}>
            <Input
              type="date"
              placeholder="Fecha de inicio"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              maxWidth="300px"
            />
            <Input
              type="date"
              placeholder="Fecha de fin"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              maxWidth="300px"
            />
          </HStack>
          <Box height="400px">
            <Line data={chartData} options={options} plugins={[zoomPlugin]} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Depositos30DiasChart;
