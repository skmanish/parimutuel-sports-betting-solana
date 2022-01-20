import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#5ce1e6',
      light: '#5ce1e6',
      dark: '#5ce1e6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#002255',
    },
    background: {
      default: '#002255',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255,255,255,0.7)',
    },
    action: {
      disabledBackground: '#4d6488',
      disabled: '#4d6488',
    },
  },
});
export default theme;
