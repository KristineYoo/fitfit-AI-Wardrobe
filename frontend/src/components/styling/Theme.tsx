/*
Author: Sophia Somers, 4-25-2025
Description: Defines the color theme for the application
Code Updates and Attributions:
From mui-theme-creator, 4-25-2025
*/

import { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#8aa899',
      contrastText:  "#ffffff", //'rgba(4,28,21,0.87)',
      dark: "#275443"
    },
    secondary: {
      main: '#ed77a0',
      dark: '#854d64',
      light: '#ffe0e4'
    },
    error: {
      main: '#c55f27',
    },
    warning: {
      main: '#daaa34',
    },
    info: {
      main: '#6a8eaa',
    },
    success: {
      main: '#4e9a64',
    },
    background: {
        default: '#f5f5f5',
    },
  },
};

const theme = createTheme(themeOptions);
    
export default theme;


// Darker palette that we decided on, but I don't think is the best option:
/*
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#156549',
      light: '#2a8c69',
      dark: '#0d4330',
      contrastText: '#f7f9f8',
    },
    secondary: {
      main: '#78b08e',
      light: '#9bc7ac',
      dark: '#5a9171',
      contrastText: '#0a1915',
    },
    info: {
      main: '#356f95',
      light: '#71a7c9',
      dark: '#25516e',
    },
    background: {
      paper: '#f7f9f8',
    },
    error: {
      main: '#d64045',
      light: '#e5696d',
      dark: '#b82e33',
    },
    warning: {
      main: '#e9b949',
      light: '#f1cd7a',
      dark: '#c99a32',
      contrastText: '#262008',
    },
    success: {
      main: '#5fb97b',
      contrastText: '#0a2616',
    },
    divider: '#dce5e1',
    text: {
      primary: '#1a2721',
    },
  },
};
*/