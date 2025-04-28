/*
Author: Sophia Somers, 4-26-2025
Description: Extends the types allowed in the ThemeOptions component in order to add more available colors to the app
Code Updates and Attributions:
From ChatGPT, 4-26-2025
*/

// following code from ChatGPT, with small modifications

declare module '@mui/material/styles' {
  interface PaletteColor {
    light2?: string;
    dark2?: string;
    
  }
  interface SimplePaletteColorOptions {
    light2?: string;
    dark2?: string;
  }
}
