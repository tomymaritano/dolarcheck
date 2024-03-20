import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InflationVsPresidentsChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const eventsResponse = await fetch('https://api.argentinadatos.com/v1/eventos/presidenciales');
            const eventsData = await eventsResponse.json();
            const inflationResponse = await fetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacion');
            const inflationData = await inflationResponse.json();

            const processedData = processData(eventsData, inflationData);
            setChartData(processedData);
        };

        fetchData();
    }, []);

    const processData = (events, inflation) => {
        const asuncionEvents = events.filter(event => event.tipo === "asuncion");
        const labels = asuncionEvents.map(event => event.evento);
        const inflationValues = asuncionEvents.map(event => {
            const inflationEvent = inflation.find(inf => inf.fecha === event.fecha);
            return inflationEvent ? inflationEvent.valor : null;
        });

        return {
            responsive: true,
            maintainAspectRatio: true, // Importante para controlar la altura
            aspectRatio: 2,
            labels,
            datasets: [{
                label: 'Inflación en Asunción',
                data: inflationValues,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }]
        };
    };

    return (
        <Box bg={'red'}>
            <Text fontSize="xl" textAlign="center" mb={4}>Inflación en Asunción Presidencial</Text>
            <Bar data={chartData} />
        </Box>
    );
};

export default InflationVsPresidentsChart;
