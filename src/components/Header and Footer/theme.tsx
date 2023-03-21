import { createTheme } from "@mui/material";

export const themeOptions = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#22223b',
        light: '#22223b',
        dark: '#bdbdbd',
      },
      secondary: {
        main: '#9a8c98',
      },
      text: {
        // primary: '#22223b',
        primary: '#9a8c98'
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: 'white', 
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