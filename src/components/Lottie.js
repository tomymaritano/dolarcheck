import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../animationData.json'; // Asegúrate de que la ruta sea correcta
import { Box } from '@chakra-ui/react';

function LottieAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width={{base: '300px', md: '500px'}} height={{ base: '300px', md: '500px' }}>
      <Lottie options={defaultOptions} height="100%" width="100%" />
    </Box>
  );
}

export default LottieAnimation;

