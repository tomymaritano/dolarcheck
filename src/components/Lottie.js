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
    <Box>
      <Lottie options={defaultOptions} height={200} width={200} />
    </Box>
  );
}

export default LottieAnimation;
