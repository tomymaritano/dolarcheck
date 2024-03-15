import React, { useState, useEffect } from 'react';
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';

function Stats() {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    fetch('https://api.argentinadatos.com/v1/cotizaciones/dolares')
      .then((response) => response.json())
      .then((data) => {
        // Asumiendo que data contiene un arreglo de cotizaciones
        setCotizaciones(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <Box>
      {cotizaciones.length > 0 ? (
        <StatGroup>
          {cotizaciones.map((cotizacion, index) => (
            <Stat key={index}>
              <StatLabel>{cotizacion.nombre}</StatLabel>
              <StatNumber>{cotizacion.venta}</StatNumber>
              {/* Aquí asumimos que necesitamos calcular el porcentaje de alguna manera */}
              <StatHelpText>
                <StatArrow type={cotizacion.cambio > 0 ? 'increase' : 'decrease'} />
                {Math.abs(cotizacion.cambio)}%
              </StatHelpText>
            </Stat>
          ))}
        </StatGroup>
      ) : (
        <p>Cargando cotizaciones...</p>
      )}
    </Box>
  );
}

export default Stats;
