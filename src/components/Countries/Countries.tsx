import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCountries, favoriteCountry } from "../../redux/countriesSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
} from "@mui/material";
import "./Countries.css";
import Swal from "sweetalert2";
import { themeOptions } from "../Countries/theme";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Country } from "../../redux/countriesSlice";

export const Countries = () => {
  //STATES
  const countries = useAppSelector((state) => {
    return state.countries;
  });

  const [search, setSearch] = useState("");
  const [sortByValue, setSortByValue] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  // FETCH DATA
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  // HANDLER FUNCTIONS
  const handleFavoriteClick = (id: String) => {
    showAlertAdded();
    dispatch(favoriteCountry(id));
  };

  const handleUnFavoriteClick = (id: String) => {
    showAlertRemoved();
    dispatch(favoriteCountry(id));
  };

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value.toLowerCase());
  };

  const showAlertAdded = () => {
    Swal.fire({
      title: "Success",
      text: "Added to Favorites!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#9a8c98",
      cancelButtonColor: "#9a8c98",
    });
  };

  const showAlertRemoved = () => {
    Swal.fire({
      title: "Success",
      text: "Removed from Favorites",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#9a8c98",
      cancelButtonColor: "#9a8c98",
    });
  };

  //PAGINATION
  let compareFunction: (a: Country, b: Country) => number = (
    a: Country,
    b: Country
  ) => {
    return 0;
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const sortBy = function () {
    switch (sortByValue) {
      case "name":
        compareFunction = (a: Country, b: Country) => {
          if (sortAsc) {
            return a.name.official.localeCompare(b.name.official);
          } else {
            return a.name.official.localeCompare(b.name.official) * -1;
          }
        };
        break;
      case "region":
        compareFunction = (a: Country, b: Country) => {
          if (sortAsc) {
            return a.region.localeCompare(b.region);
          } else {
            return a.region.localeCompare(b.region) * -1;
          }
        };
        break;
      case "population":
        compareFunction = (a: Country, b: Country) => {
          if (sortAsc) {
            return a.population - b.population;
          } else {
            return b.population - a.population;
          }
        };
        break;
      default:
        compareFunction = (a: Country, b: Country) => {
          return 0;
        };
        break;
    }

    filteredCountries.sort(compareFunction);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  //LOADING/ERROR HANDLING
  if (countries.status === "loading") {
    return <div>Loading...</div>;
  }

  const filteredCountries = countries.countries.filter((country) => {
    if (search == null || search == "") {
      return true;
    }
    if (country.languages != null) {
      const languages = objectToStringArr(country.languages);
      for (let i = 0; i < languages.length; i++) {
        if (languages[i].toLowerCase().includes(search)) {
          return true;
        }
      }
    }
    return (
      country.name.common.toLowerCase().includes(search) ||
      (country.name.native != null &&
        country.name.native.toLowerCase().includes(search)) ||
      (country.name.official != null &&
        country.name.official.toLowerCase().includes(search)) ||
      (country.region != null && country.region.toLowerCase().includes(search))
    );
  });
  sortBy();

  const handleSortByClick = function (e: any) {
    if (sortByValue == e.target.id) {
      setSortAsc(!sortAsc);
    } else {
      setSortAsc(true);
    }
    setSortByValue(e.target.id.toLowerCase());
  };

  // RETURN
  return (
    <div>
      <div className="search-bar">
        <TextField label="Search" onChange={handleSearchChange} />
      </div>
      <div className="table">
        <ThemeProvider theme={themeOptions}>
          <Table
            sx={{ minWidth: 650, height: 650, overflow: "scroll" }}
            aria-label="simple table"
            className="table-info"
          >
            <TableHead className="table-head">
              <TableRow>
                <TableCell>
                  <h2>Flag</h2>
                </TableCell>
                <TableCell onClick={handleSortByClick}>
                  <div className="sort" id="name">
                    <h2 id="name">Name</h2>
                    {sortByValue != "name" ? (
                      <div></div>
                    ) : sortAsc ? (
                      <ArrowDownward id="name" />
                    ) : (
                      <ArrowUpward id="name" />
                    )}
                  </div>
                </TableCell>
                <TableCell onClick={handleSortByClick}>
                  <div className="sort" id="region">
                    <h2 id="region">Region</h2>
                    {sortByValue != "region" ? (
                      <div></div>
                    ) : sortAsc ? (
                      <ArrowDownward id="region" />
                    ) : (
                      <ArrowUpward id="region" />
                    )}
                  </div>
                </TableCell>
                <TableCell onClick={handleSortByClick}>
                  <div className="sort" id="population">
                    <h2 id="population">Population</h2>
                    {sortByValue != "population" ? (
                      <div></div>
                    ) : sortAsc ? (
                      <ArrowDownward id="population" />
                    ) : (
                      <ArrowUpward id="population" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <h2>Languages</h2>
                </TableCell>
                <TableCell>
                    <h2 id="favorite">Favorite</h2>
                </TableCell>
                <TableCell>
                  <h2>Information</h2>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCountries
                .filter((country, index) => {
                  if (
                    index >= page * rowsPerPage &&
                    index < page * rowsPerPage + rowsPerPage
                  ) {
                    return true;
                  }
                  return false;
                })
                .map((country) => {
                  return (
                    <TableRow key={country.name.official} className="table-row">
                      <TableCell>
                        <h3 className="flags">
                          <img src={country.flags.png}></img>
                        </h3>
                      </TableCell>
                      <TableCell style={{ width: "12%" }}>
                        <h3>{country.name.common}</h3>
                      </TableCell>
                      <TableCell>
                        <h3>{country.region}</h3>
                      </TableCell>
                      <TableCell>
                        <h3>{country.population}</h3>
                      </TableCell>
                      <TableCell style={{ width: "12%" }}>
                        {country.languages != undefined ? (
                          objectToStringArr(country.languages).map((lang) => {
                            return (
                              <li key={lang} className="languages">
                                {lang}
                              </li>
                            );
                          })
                        ) : (
                          <h3>No languages</h3>
                        )}
                      </TableCell>

                      <TableCell>
                        <Button variant="text" id={country.name.official}>
                          {country.isFavorite ? (
                            <FavoriteIcon
                              onClick={(e) =>
                                handleUnFavoriteClick(country.name.official)
                              }
                            />
                          ) : (
                            <FavoriteBorderIcon
                              onClick={(e) =>
                                handleFavoriteClick(country.name.official)
                              }
                            />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Box color="text.secondary">
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
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TablePagination
                count={filteredCountries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                backIconButtonProps={{
                  color: "secondary",
                }}
                nextIconButtonProps={{ color: "secondary" }}
                SelectProps={{
                  inputProps: {
                    "aria-label": "page number",
                  },
                }}
                showFirstButton={true}
                showLastButton={true}
              />
            </TableFooter>
          </Table>
        </ThemeProvider>
      </div>
    </div>
  );
};

export const objectToStringArr = function (obj: object) {
  let result: Array<string> = [];
  Object.values(obj).forEach((item) => {
    result.push(item);
  });
  return result;
};
