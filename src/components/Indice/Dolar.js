import React, { useState, useEffect } from "react";
import { Box, Text, Select, HStack } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const DolarChart = () => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [selectedCasa, setSelectedCasa] = useState("");
  const [casas, setCasas] = useState([]);
  const [allData, setAllData] = useState([]); // Aquí se define allData
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);

useEffect(() => {
    const fetchDolarData = async () => {
        try {
            const response = await fetch('https://api.argentinadatos.com/v1/cotizaciones/dolares');
            const data = await response.json();
            setAllData(data);

            const uniqueCasas = [...new Set(data.map(item => item.casa))];
            setCasas(uniqueCasas);
            setSelectedCasa(uniqueCasas[0]); // Establece la primera "casa" como seleccionada por defecto

            const uniqueYears = [...new Set(data.map(item => new Date(item.fecha).getFullYear().toString()))];
            if (!uniqueYears.includes(selectedYear)) {
                setSelectedYear(uniqueYears[11] || ''); // Ajusta si 2023 no está disponible
            }
            setYears(uniqueYears.sort());

            // Procesa los datos para el año y casa seleccionados
            processChartData(data.filter(item => item.casa === uniqueCasas[0] && new Date(item.fecha).getFullYear().toString() === selectedYear));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchDolarData();
}, [selectedYear]);


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
    const labels = filteredData.map((item) => item.fecha);
    const compra = filteredData.map((item) => item.compra);
    const venta = filteredData.map((item) => item.venta);

    setChartData({
      labels,
      datasets: [
        {
          label: "Compra",
          data: compra,
          backgroundColor: "rgb(32, 172, 149, 0.8)",
        },
        {
          label: "Venta",
          data: venta,
          backgroundColor: "rgb(226, 70, 74, 0.8)",
        },
      ],
    });
  };

  const handleCasaChange = (event) => {
    setSelectedCasa(event.target.value);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Importante para controlar la altura
    aspectRatio: 2,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
  };

  return (
    <Box maxH={'40vh'} p={'auto'} m={'auto'}>
      <Text color={"white"} fontSize="lg" textAlign="center" mb={4}>
        Precios de Dólar
      </Text>
      <HStack spacing={1}>
        <Select
          color={"white"}
          borderRadius={"6px"}
          size={"sm"}
          placeholder="Seleccione una casa"
          value={selectedCasa}
          onChange={handleCasaChange}
        >
          {casas.map((casa) => (
            <option key={casa} value={casa}>
              {casa}
            </option>
          ))}
        </Select>
        <Select
          color={"white"}
          borderRadius={"6px"}
          size={"sm"}
          placeholder="Seleccione un año"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </HStack>

      <Bar options={options} data={chartData} />
    </Box>
  );
};

export default DolarChart;
