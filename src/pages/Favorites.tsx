import {
  Box,
  Button,
  createTheme,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
import "./Favorites.css";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const Favorites = ({  }) => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const countries = useAppSelector((state) => {
    return state.countries;
  });

  let filteredCountries: Country[] = countries.countries.filter(
    (country) => country.isFavorite
  );

  return (
    <div>
      {filteredCountries[0] == undefined ? (
        <div className="noFav">
          <h1>
            <Link to={"/"}>No Favorites to Display</Link>
          </h1>
        </div>
      ) : (
        <div className="favList">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary",
              color: "text.primary",
              borderRadius: 1,
              p: 3,
            }}
          >
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
          {/* <h1>{filteredCountries[0].name.official}</h1> */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h2>Flag</h2>
                </TableCell>
                <TableCell>
                  <h2>Name</h2>
                </TableCell>
                <TableCell>
                  <h2>Region</h2>
                </TableCell>
                <TableCell>
                  <h2>Population</h2>
                </TableCell>
                <TableCell>
                  <h2>Languages</h2>
                </TableCell>
                <TableCell>
                  <h2>Information</h2>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCountries.map((country) => {
                return (
                  <TableRow key={country.name.official}>
                    <TableCell>
                      <img src={country.flags.png}></img>
                    </TableCell>
                    <TableCell>
                      <h3>{country.name.common}</h3>
                    </TableCell>
                    <TableCell>
                      <h3>{country.region}</h3>
                    </TableCell>
                    <TableCell>
                      <h3>{country.population}</h3>
                    </TableCell>
                    <TableCell>
                      {country.languages != undefined ? (
                        objectToStringArr(country.languages).map((lang) => {
                          return <h3 key={lang}>{lang}</h3>;
                        })
                      ) : (
                        <h3>No languages</h3>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        id={country.name.official}
                        className="more-info"
                      >
                        <Link
                          to={"/countryInfo/" + country.name.official}
                          className="more-info-text"
                        >
                          More Info
                          <ArrowForwardIosIcon className="arrow-icon" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
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
            <Box sx={{ bgcolor: "primary.main", color: "text.secondary" }}>
              <Header />
            </Box>
            <Box sx={{ bgcolor: "primary.main", color: "text.secondary" }}>
              <Favorites />
              <Footer />
            </Box>
          </ThemeProvider>
        ) : (
          <ThemeProvider theme={lightTheme}>
            <Box sx={{ bgcolor: "primary.light", color: "primary.light" }}>
              <Header />
            </Box>
            <Box sx={{ bgcolor: "primary.light", color: "text.secondary" }}>
              <Favorites />
              <Footer />
            </Box>
          </ThemeProvider>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
