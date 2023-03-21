import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#121212',
        light: '#f5ede9',
      },
      secondary: {
        main: '#9a8c98',
        light: '#f5ede9',
      },
      text: {
        primary: '#9a8c98',
        secondary: '#363852',
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: '#f5ede9', 
            // backgroundColor: '#9a8c98',
            textDecoration: 'none', 
            '&:hover': {
              textShadow: '1px 1px 2px white',
              fontSize: '1.3rem'
            },
          },
        },
      },
    },
  });

  export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#121212',
        light: '#f5ede9',
        dark: '#9a8c98',
      },
      secondary: {
        main: '#9a8c98',
        // main: '#121212',
      },
      text: {
        primary: '#9a8c98',
        secondary: '#f5ede9',
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: '#f5ede9', 
            // backgroundColor: '#9a8c98',
            textDecoration: 'none', 
            '&:hover': {
              textShadow: '1px 1px 2px white',
              fontSize: '1.3rem'
            },
          },
        },
      },
    },
  });