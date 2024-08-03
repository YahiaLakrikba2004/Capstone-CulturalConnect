import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import globalTheme from './styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={globalTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
