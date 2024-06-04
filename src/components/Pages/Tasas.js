// src/components/Pages/Dolar.js
import React from 'react';
import { Box } from '@chakra-ui/react';
import PlazoFijoRates from '../_common/PlazoFijo';

const Tasas = () => {
  return (
    <Box p={4}>
      <PlazoFijoRates />
    </Box>
  );
};

export default Tasas;
