/*
Author: Sophia Somers, 4-25-2025
Description: Defines the color theme for the application
Code Updates and Attributions:
From mui-theme-creator, 4-25-2025
From https://mui.com/material-ui/customization/palette/#adding-color-tokens, 4-29-2025
*/

import { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

//from mui docs
declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
    
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#8aa899',
      contrastText:  "#ffffff", //'rgba(4,28,21,0.87)',
      dark: "#5f8a75",
      light:"#b8d6c1",
      lighter: "#e6f7e7",
      darker: "#275443"
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