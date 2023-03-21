import * as React from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, IconButton, Theme } from "@mui/material";
import "./App.css";
import { Countries } from "./components/Countries/Countries";
import { darkTheme, lightTheme } from "./styling/theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Header } from "./components/Header and Footer/Header";
import { Footer } from "./components/Header and Footer/Footer";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const App = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary",
          color: "text",
          borderRadius: 1,
          p: 3,
        }}
      >
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
      <Countries />
    </div>
  );
};

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {theme.palette.mode === "dark" ? (
          <ThemeProvider theme={darkTheme}>
            <Box sx={{ bgcolor: "secondary.main", color: "text.secondary" }}>
              <Header />
            </Box>
            <Box sx={{ bgcolor: "primary.main", color: "text.secondary" }}>
              <App />
              <Footer />
            </Box>
          </ThemeProvider>
        ) : (
          <ThemeProvider theme={lightTheme}>
            <Box sx={{ color: "primary.main" }}>
              <Header />
            </Box>
            <Box sx={{ bgcolor: "primary.light", color: "text.secondary" }}>
              <App />
              <Footer />
            </Box>
          </ThemeProvider>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
