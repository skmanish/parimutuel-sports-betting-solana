import React from 'react';
import './App.css';
import LandingPage from './landing-page';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#5ce1e6',
      light: '#5ce1e6',
      dark: '#5ce1e6',
      contrastText: '#fff',
    },
    background: {
      default: '#002255',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255,255,255,0.7)',
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
