import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { Box, Heading } from "@chakra-ui/react";

ChartJS.register(...registerables);

function GraficoAvanzadoPresidencial() {
  const presidentesYInflacion = [
    {
      presidente: "JD. Perón",
      inicio: 1946,
      fin: 1974,
      inflacion: "43%",
    }, // Primer y segundo mandato
    { presidente: "I.Perón", inicio: 1974, fin: 1976, inflacion: "276%" }, // Inflación estimada, asumió después de Juan Domingo Perón
    { presidente: "R. Alfonsín", inicio: 1983, fin: 1989, inflacion: "398%" },
    { presidente: "C.Menem", inicio: 1989, fin: 1999, inflacion: "69,7%" },
    {
      presidente: "N.Kirchner",
      inicio: 2003,
      fin: 2007,
      inflacion: "11,6%",
    },
    {
      presidente: "CFK",
      inicio: 2007,
      fin: 2015,
      inflacion: "176%",
    },
    {
      presidente: "M. Macri",
      inicio: 2015,
      fin: 2019,
      inflacion: "33,7%",
    },
    {
      presidente: "A. Fernández",
      inicio: 2019,
      fin: 2023,
      inflacion: "271%",
    },
    // { presidente: "Javier Milei", inicio: 2023, fin: 2027, inflacion: "4%" },
  ];

  // Preparación de datos para el gráfico
  const labels = presidentesYInflacion.map((item) => item.presidente);
  const duracionMandato = presidentesYInflacion.map(
    (item) => item.fin - item.inicio
  );
  const inflacion = presidentesYInflacion.map((item) =>
    parseFloat(item.inflacion.replace("%", ""))
  );

  const data = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    labels,
    datasets: [
      {
        type: "bar",
        label: "Años",
        data: duracionMandato,
        backgroundColor: "rgb(53, 172, 149, 0.5)",
      },
      {
        type: "line",
        label: "Inflación (%)",
        data: inflacion,
        borderColor: "rgb(226, 70, 74)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y2",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Mandato (años)",
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Inflación (%)",
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };

  return (
    <Box maxH={"80vh"} p={'auto'} textAlign={'center'} mb={12}>
      <Heading pb={4} size={'md'} color={'white'}>Inflacion por mandatos presidenciales</Heading>
      <Chart type="bar" data={data} options={options} />
    </Box>
  );
}

export default GraficoAvanzadoPresidencial;
