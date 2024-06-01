// src/components/Pages/Dolar.js
import React from 'react';
import { Box } from '@chakra-ui/react';
import InflacionHistorico from '../_common/InflacionHistorico';

const Inflacion = () => {
  return (
    <Box p={4}>
      <InflacionHistorico />
    </Box>
  );
};

export default Inflacion;
