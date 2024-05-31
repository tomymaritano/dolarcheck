// theme.js
import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#f5f7ff',
    100: '#ebedff',
    200: '#d6dafe',
    300: '#c2c8fe',
    400: '#8a95fd',
    500: '#4B52E3',  // Azul vibrante
    600: '#3f46bb',
    700: '#313792',
    800: '#242869',
    900: '#181942',
  },
  primary: {
    50: '#ececf1',
    100: '#d1d1d7',
    200: '#b3b3b8',
    300: '#949499',
    400: '#76767b',
    500: '#1F1B33',  // Oscuro profundo
    600: '#181523',
    700: '#121112',
    800: '#0b0b0b',
    900: '#050505',
  },
  accent: {
    50: '#fff4e6',
    100: '#ffe1b8',
    200: '#ffce89',
    300: '#ffba5b',
    400: '#ffa82d',
    500: '#E4A42C',  // Naranja brillante
    600: '#cc9300',
    700: '#996c00',
    800: '#664600',
    900: '#332300',
  },
  success: {
    50: '#e9f9ef',
    100: '#c8f0d5',
    200: '#a5e7b9',
    300: '#82dd9e',
    400: '#60d482',
    500: '#2ECC71',  // Verde
    600: '#23a659',
    700: '#198041',
    800: '#0e5929',
    900: '#033312',
  },
  action: {
    50: '#e6fcfc',
    100: '#b3f8f8',
    200: '#80f3f3',
    300: '#4deeee',
    400: '#1ae9e9',
    500: '#4ADEDE',  // Turquesa
    600: '#18b6b6',
    700: '#128d8d',
    800: '#0c6464',
    900: '#053b3b',
  },
  background: 'white',  // Negro profundo
  text: {
    primary: 'black',  // Blanco
    secondary: '#B0B0B0',  // Gris claro
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    heading: 'Arial, sans-serif',
    body: 'Arial, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'background',
        color: 'text.primary',
      },
    },
  },
});

export default theme;
