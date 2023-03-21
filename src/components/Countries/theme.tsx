import { createTheme } from "@mui/material";

export const themeOptions = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#9a8c98',
        light: '#22223b',
        dark: '#bdbdbd',
      },
      secondary: {
        main: '#9a8c98',
      },
      text: {
        // primary: '#22223b',
        primary: '#9a8c98',
        secondary: '#4a4e69'
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: '#9a8c98', 
            textDecoration: 'none', 
            '&:hover': {
              textShadow: '1px 1px 1px #9a8c98',
              fontSize: '1.3rem'
            },
          },
        },
      },
    },
  });