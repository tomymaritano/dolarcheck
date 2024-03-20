import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';


function ContadorCuentaRegresiva() {
  // Calcular la fecha objetivo sumando 4 días a la fecha actual
  const fechaObjetivo = new Date().getTime() + 4 * 24 * 60 * 60 * 1000;

  const calcularTiempoRestante = () => {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;
    return diferencia > 0 ? diferencia : 0;
  };

  const [tiempoRestante, setTiempoRestante] = useState(calcularTiempoRestante());
  const [contenidoHabilitado, setContenidoHabilitado] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const nuevoTiempoRestante = calcularTiempoRestante();
      setTiempoRestante(nuevoTiempoRestante);

      if (nuevoTiempoRestante <= 0) {
        clearInterval(intervalo);
        setContenidoHabilitado(true);
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const formatearTiempo = (tiempo) => {
    let segundos = Math.floor((tiempo / 1000) % 60);
    let minutos = Math.floor((tiempo / 1000 / 60) % 60);
    let horas = Math.floor((tiempo / (1000 * 60 * 60)) % 24);
    let dias = Math.floor(tiempo / (1000 * 60 * 60 * 24));

    return `${dias} días ${horas} : ${minutos} : ${segundos} `;
  };

  return (
    <Box>
      {contenidoHabilitado ? (
        <Box>El contenido ahora está disponible.</Box>
      ) : (
        <Box textAlign={'center'}>
            <Heading>Coundown</Heading><Text fontSize={'2xl'}>{formatearTiempo(tiempoRestante)}</Text></Box>
      )}
    </Box>
  );
}

export default ContadorCuentaRegresiva;






