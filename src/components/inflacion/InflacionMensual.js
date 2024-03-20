import React, { useState, useEffect } from "react";
import { Box, Text, Select } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const InflationChart = () => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    const fetchInflationData = async () => {
      try {
        const response = await fetch(
          "https://api.argentinadatos.com/v1/finanzas/indices/inflacion"
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener los datos");
        }
        const data = await response.json();
        const years = new Set(
          data.map((item) => new Date(item.fecha).getFullYear().toString())
        );
        setAvailableYears([...years]);

        filterDataByYear(data, selectedYear);
      } catch (error) {
        console.error("Error fetching inflation data:", error);
      }
    };

    fetchInflationData();
  }, [selectedYear]);

  const filterDataByYear = (data, year) => {
    const filteredData = data.filter(
      (item) => new Date(item.fecha).getFullYear().toString() === year
    );

    const labels = filteredData.map((item) => item.fecha);
    const inflacionValues = filteredData.map((item) => item.valor);

    setChartData({
      labels,
      datasets: [
        {
          label: `Inflación ${year}`,
          data: inflacionValues,
          borderColor: "rgb(226, 70, 74)",
          tension: 0.1,
        },
      ],
    });
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Importante para controlar la altura
    aspectRatio: 2,
    plugins: {
      legend: { display: true },
      title: { display: true, text: `Índices de Inflación ${selectedYear}` },
    },
  };

  return (
    <Box maxH={"40vh"} p={'auto'} m={'auto'}>
      <Text mb={4} fontSize="lg" textAlign="center">
        Índices de Inflación Mensual
      </Text>
      <Select
        size={"sm"}
        borderRadius={"6px"}
        color={"white"}
        placeholder="Seleccione un año"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {availableYears.map((year) => (
          <option bgColor={"#a1s1s1"} key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <Line options={options} data={chartData} />
    </Box>
  );
};

export default InflationChart;
