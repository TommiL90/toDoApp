import { extendTheme, theme as ChakraTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primary: '#38085C',
    primaryHover: '#190429',
    secondary: '#8615DF',
    secondaryHover: '#570E91',
    gray100: '#f6f6f7',
    gray200: '#eeee',
    gray300: '#9E9EA7',
    gray400: '#666665',
    gray900: '#111111',
    sucess: '#25D970',
    error: '#DF1545',
  },
  font: {
    heading: 'Inter',
    body: 'Inter',
  },
  fontSizes: {
    h1: '2.375rem',
    h2: '2.125',
    h3: '1.5rem',
    h4: '1.25rem',
    t1: '1rem',
    t2: '0.875rem',
    t3: '0.75rem',
  },
  styles: {
    global: {
      body: {
        bg: 'gray100',
        color: 'gray800',
      },
    },
  },
});
