import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCountry } from "../redux/countrySlice";
import { Country } from "../redux/countriesSlice";
import { objectToStringArr } from "../components/Countries/Countries";
import { Header } from "../components/Header and Footer/Header";
import { Footer } from "../components/Header and Footer/Footer";
import React from "react";
import { darkTheme, lightTheme } from "../styling/theme";
import "./CountryInfo";
import Grid from "@mui/material/Grid";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const CountryInfo = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const country: Country = useAppSelector<Country>((state) => {
    return state.country.country;
  });
  const countries = useAppSelector((state) => {
    return state.countries;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCountry());
  }, [dispatch]);

  if (country === null || country === undefined) {
    return <h4>Loading</h4>;
  }

  return (
    <div>
      <Header />

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

      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin={5}
      >
        <Card
          sx={{
            width: "35vw",
            bgcolor: "secondary.main",
            textAlign: "center",
            padding: "5rem",
            borderRadius: "2rem",
            boxShadow: "10rem",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 100 }}
              color="text.secondary"
              gutterBottom
              variant="h1"
            >
              <img src={country.flags.png} className="flag"></img>
            </Typography>

            <Typography variant="h4" color="text.secondary" gutterBottom>
              This country's name is {country.name.common} and it belongs to the
              region of {country.region}. It has a population of{" "}
              {country.population}.
            </Typography>

            <Typography variant="h3" color="text.secondary" gutterBottom>
              Facts About this Country:
            </Typography>
            <Typography
              variant="h4"
              component="div"
              display="block"
              color="text.secondary"
            >
              Common Name: {country.name.common}
              {country.name.official == null ? (
                ""
              ) : (
                <Typography variant="h4" color="text.secondary" gutterBottom>
                  Official Name: {country.name.official}
                </Typography>
              )}
              {country.name.native == null ? (
                ""
              ) : (
                <Typography variant="h4" color="text.secondary" gutterBottom>
                  Native Name: {country.name.native}
                </Typography>
              )}
            </Typography>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              Region: {country.region}{" "}
            </Typography>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              Languages:{" "}
              {country.languages != undefined ? (
                objectToStringArr(country.languages).map((lang) => {
                  return (
                    <Typography
                      variant="h4"
                      color="text.secondary"
                      gutterBottom
                      key={lang}
                    >
                      {" "}
                      {lang}{" "}
                    </Typography>
                  );
                })
              ) : (
                <h4>No languages</h4>
              )}
            </Typography>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              Population: {country.population}
            </Typography>
          </CardContent>
          <CardActions>{/* Add anything? */}</CardActions>
        </Card>
      </Grid>
      <Footer />
    </div>
  );
};

export default function CountryInfoToggleColorMode() {
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
            <Box sx={{ bgcolor: "primary.main", color: "text.secondary" }}>
              <CountryInfo />
            </Box>
          </ThemeProvider>
        ) : (
          <ThemeProvider theme={lightTheme}>
            <Box sx={{ bgcolor: "primary.light", color: "text.secondary" }}>
              <CountryInfo />
            </Box>
          </ThemeProvider>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
