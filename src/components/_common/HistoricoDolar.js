import React, { useState, useEffect } from "react";
import { Box, Text, Select, HStack, VStack, Spinner, Alert, AlertIcon, Heading } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { ResponsiveContainer } from "recharts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const HistoricoDolar = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedCasa, setSelectedCasa] = useState("");
  const [casas, setCasas] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("Line");

  useEffect(() => {
    const fetchDolarData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://api.argentinadatos.com/v1/cotizaciones/dolares");
        const data = await response.json();
        setAllData(data);

        const uniqueCasas = [...new Set(data.map((item) => item.casa))];
        setCasas(uniqueCasas);
        setSelectedCasa(uniqueCasas[0]);

        const uniqueYears = [
          ...new Set(
            data.map((item) => new Date(item.fecha).getFullYear().toString())
          ),
        ];
        setYears(uniqueYears.sort());
        setSelectedYear(uniqueYears[uniqueYears.length - 1] || "");

        processChartData(
          data.filter(
            (item) =>
              item.casa === uniqueCasas[0] &&
              new Date(item.fecha).getFullYear().toString() ===
                uniqueYears[uniqueYears.length - 1]
          )
        );
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDolarData();
  }, []);

  useEffect(() => {
    if (selectedCasa && selectedYear) {
      const filteredData = allData.filter(
        (item) =>
          item.casa === selectedCasa &&
          new Date(item.fecha).getFullYear().toString() === selectedYear
      );
      processChartData(filteredData);
    }
  }, [selectedCasa, selectedYear, allData]);

  const processChartData = (filteredData) => {
    const labels = filteredData.map((item) =>
      new Date(item.fecha).toLocaleDateString()
    );
    const compra = filteredData.map((item) => item.compra);
    const venta = filteredData.map((item) => item.venta);

    setChartData({
      labels,
      datasets: [
        {
          label: "Compra",
          data: compra,
          borderColor: "#20ac95",
          backgroundColor: "rgba(32, 172, 149, 0.5)",
        },
        {
          label: "Venta",
          data: venta,
          borderColor: "#e2464a",
          backgroundColor: "rgba(226, 70, 74, 0.5)",
        },
      ],
    });
  };

  const handleCasaChange = (event) => {
    setSelectedCasa(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
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
          text: "Fecha",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valor",
        },
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "Line":
        return <Line data={chartData} options={options} />;
      case "Bar":
        return <Bar data={chartData} options={options} />;
      case "Composed":
        return (
          <Line
            data={{
              ...chartData,
              datasets: [
                ...chartData.datasets,
                {
                  type: "bar",
                  label: "Compra (Bar)",
                  data: chartData.datasets[0].data,
                  borderColor: "rgba(32, 172, 149, 1)",
                  backgroundColor: "rgba(32, 172, 149, 0.5)",
                },
              ],
            }}
            options={options}
          />
        );
      default:
        return <Line data={chartData} options={options} />;
    }
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
            Dolar Historico
          </Heading>
          <Text mb={6} textAlign={{ base: 'center', md: 'left' }}>
            Biblioteca sobre el precio del dolar en el tiempo
          </Text>
          <VStack spacing={4} mb={4}>
            <HStack width={{ base: '100%', md: '80%' }} spacing={4}>
              <Select
                variant="outlined"
                borderRadius="6px"
                size="md"
                placeholder="Tipo de Cambio"
              
                onChange={handleCasaChange}
                width={{ base: '100%', md: '30%' }}
              >
                {casas.map((casa) => (
                  <option key={casa} value={casa}>
                    {casa}
                  </option>
                ))}
              </Select>
              <Select
                variant="outlined"
                borderRadius="6px"
                size="md"
                placeholder="Seleccione un año"
                value={selectedYear}
                onChange={handleYearChange}
                width={{ base: '100%', md: '30%' }}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              <Select
                variant="outlined"
                borderRadius="6px"
                size="md"
                value={chartType}
                onChange={handleChartTypeChange}
                width={{ base: '100%', md: '30%' }}
              >
                <option value="Line">Línea</option>
                <option value="Bar">Barra</option>
                <option value="Composed">Combinado</option>
              </Select>
            </HStack>
          </VStack>
          <Box h="70vh">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HistoricoDolar;
