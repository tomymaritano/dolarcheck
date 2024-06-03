import React, { useState, useEffect, useCallback } from "react";
import { Box, Text, Select, HStack, Spinner, Alert, AlertIcon, Heading } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const fetchInflacionData = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Error fetching data");
  return response.json();
};

const processChartData = (dataMensual, dataInteranual, year) => {
  const filteredMensual = dataMensual.filter(item => new Date(item.fecha).getFullYear().toString() === year.toString());
  const filteredInteranual = dataInteranual.filter(item => new Date(item.fecha).getFullYear().toString() === year.toString());

  const labels = filteredMensual.map(item => new Date(item.fecha).toLocaleDateString('es-ES', { month: 'long' }));
  const inflacionMensual = filteredMensual.map(item => item.valor);
  const inflacionInteranual = filteredInteranual.map(item => item.valor);

  return {
    labels,
    datasets: [
      {
        label: "Inflación Mensual",
        data: inflacionMensual,
        borderColor: "#20ac95",
        backgroundColor: "rgba(32, 172, 149, 0.5)",
        fill: false,
      },
      {
        label: "Inflación Interanual",
        data: inflacionInteranual,
        borderColor: "#e2464a",
        backgroundColor: "rgba(226, 70, 74, 0.5)",
        fill: false,
      },
    ],
  };
};

const InflacionHistorico = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const fetchData = useCallback(async (year) => {
    setLoading(true);
    setError(null);
    try {
      const [dataMensual, dataInteranual] = await Promise.all([
        fetchInflacionData("https://api.argentinadatos.com/v1/finanzas/indices/inflacion"),
        fetchInflacionData("https://api.argentinadatos.com/v1/finanzas/indices/inflacionInteranual")
      ]);

      if (!years.length) {
        const uniqueYears = [...new Set(dataMensual.map(item => new Date(item.fecha).getFullYear()))];
        setYears(uniqueYears.sort((a, b) => a - b));
        setSelectedYear(year || uniqueYears[uniqueYears.length - 1] || '');
      }

      setChartData(processChartData(dataMensual, dataInteranual, year || selectedYear));
    } catch (error) {
      setError("Error al obtener los datos");
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear, years.length]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (selectedYear) fetchData(selectedYear);
  }, [selectedYear, fetchData]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Inflación (%)",
        },
      },
    },
  };

  return (
    <Box minH="90vh" maxH="90vh" p={4} m="auto">
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <>
          <Heading mb={4} size="md" textAlign={{ base: 'center', md: 'left' }}>
            Inflación Histórica
          </Heading>
          <Text mb={6} textAlign={{ base: 'center', md: 'left' }}>
            Evolución de la inflación mensual e interanual.
          </Text>
          <HStack width="100%" spacing={4} mb={4}>
            <Select
            bg={'gray.50'}
              variant="solid"
              borderRadius="6px"
              size="md"
              placeholder="Seleccione un año"
              onChange={handleYearChange}
              width="30%"
              value={selectedYear}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </HStack>
          <Box h="70vh">
            <Line data={chartData} options={options} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default InflacionHistorico;

