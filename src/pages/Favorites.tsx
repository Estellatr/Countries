import {
  Box,
  Button,
  createTheme,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { objectToStringArr } from "../components/Countries/Countries";
import { Country } from "../redux/countriesSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Header } from "../components/Header and Footer/Header";
import { Footer } from "../components/Header and Footer/Footer";
import React from "react";
import { darkTheme, lightTheme } from "../styling/theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const Favorites = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const countries = useAppSelector((state) => {
    return state.countries;
  });

  let filteredCountries: Country[] = countries.countries.filter(
    (country) => country.isFavorite
  );

  console.log(filteredCountries);

  if (filteredCountries[0] == undefined) {
    return <h1>No Favorites to Display</h1>;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      >
        {theme.palette.mode} mode
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>

      <h1>Favourites:</h1>
      <h1>{filteredCountries[0].name.official}</h1>

      <table>
        <thead>
          <tr>
            <th>
              <h2>Flag</h2>
            </th>
            <th>
              <h2>Name</h2>
            </th>
            <th>
              <h2>Region</h2>
            </th>
            <th>
              <h2>Population</h2>
            </th>
            <th>
              <h2>Languages</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country) => {
            return (
              <tr key={country.name.official}>
                <td>
                  <img src={country.flags.svg}></img>
                </td>
                <td>
                  <h3>{country.name.common}</h3>
                </td>
                <td>
                  <h3>{country.region}</h3>
                </td>
                <td>
                  <h3>{country.population}</h3>
                </td>
                <td>
                  {country.languages != undefined ? (
                    objectToStringArr(country.languages).map((lang) => {
                      return <h3 key={lang}>{lang}</h3>;
                    })
                  ) : (
                    <h3>No languages</h3>
                  )}
                </td>
                <td>
                  <Button variant="text" id={country.name.official}>
                    <Link to={"/countryInfo/" + country.name.official}>
                      More Info
                      <ArrowForwardIosIcon />
                    </Link>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default function FavoritesToggleColorMode() {
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
            <Box
              sx={{ bgcolor: "background.default", color: "text.secondary" }}
            >
              <Header />
              <Favorites />
              <Footer />
            </Box>
          </ThemeProvider>
        ) : (
          <ThemeProvider theme={lightTheme}>
            <Header />
            <Favorites />
            <Footer />
          </ThemeProvider>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
