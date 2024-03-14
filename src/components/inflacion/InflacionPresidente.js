import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const InflationVsPresidentsChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchEventData = async () => {
            // Simulación de solicitud a la API para obtener eventos presidenciales
            const eventsResponse = await fetch('https://api.argentinadatos.com/v1/eventos/presidenciales');
            const eventsData = await eventsResponse.json();

            // Simulación de solicitud a la API para obtener índices de inflación
            const inflationResponse = await fetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacion');
            const inflationData = await inflationResponse.json();

            // Aquí deberías procesar los datos para combinarlos de manera que puedas usarlos en el gráfico
            // Esto es solo un ejemplo y necesitarás ajustarlo según el formato de tus datos
            const processedData = processData(eventsData, inflationData);
            setChartData(processedData);
        };

        fetchEventData();
    }, []);

    const processData = (eventsData, inflationData) => {
        // Procesa y combina los datos aquí
        // Retorna un objeto compatible con Chart.js
        return {};
    };

    // Configuración básica del gráfico, ajusta según sea necesario
    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'year'
                }
            }
        }
    };

    return (
        <Line options={options} data={chartData} />
    );
};

export default InflationVsPresidentsChart;
