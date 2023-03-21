import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCountries, favoriteCountry } from "../../redux/countriesSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import {
  TextField,
  ThemeProvider,
} from "@mui/material";
import "./Countries.css";
import Swal from "sweetalert2";
import { themeOptions } from "../Countries/theme";

export const Countries = () => {
  //STATES
  const countries = useAppSelector((state) => {
    return state.countries;
  });

  const [search, setSearch] = useState("");

  // FETCH DATA
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  // HANDLER FUNCTIONS
  const handleFavoriteClick = (id: String) => {
    showAlert();
    dispatch(favoriteCountry(id));
  };

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value.toLowerCase());
  };

  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Added to Favorites!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#9a8c98",
      cancelButtonColor: "#9a8c98",
    });
  };
  //LOADING/ERROR HANDLING
  if (countries.status === "loading") {
    return <div>Loading...</div>;
  }

  // RETURN
  return (
    <div>
        <div className="search-bar">
          <TextField label="Search" onChange={handleSearchChange} />
        </div>
        <div className="table">
        <ThemeProvider theme={themeOptions}>
          <table className="table-info">
            <thead className="table-head">
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
                <th>
                  <h2>Favorite</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {countries.countries
                .filter((country) => {
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
                    (country.region != null &&
                      country.region.toLowerCase().includes(search))
                  );
                })
                .map((country) => {
                  return (
                    <tr key={country.name.official} className="table-row">
                      <td>
                        <h3 className="flags">
                          <img src={country.flags.png}></img>
                        </h3>
                      </td>
                      <td style={{ width: "12%" }}>
                        <h3>{country.name.common}</h3>
                      </td>
                      <td>
                        <h3>{country.region}</h3>
                      </td>
                      <td>
                        <h3>{country.population}</h3>
                      </td>
                      <td style={{ width: "12%" }}>
                        {country.languages != undefined ? (
                          objectToStringArr(country.languages).map((lang) => {
                            return <h3 key={lang}>{lang}</h3>;
                          })
                        ) : (
                          <h3>No languages</h3>
                        )}
                      </td>

                      <td>
                        <Button
                          onClick={(e) =>
                            handleFavoriteClick(country.name.official)
                          }
                          variant="text"
                          id={country.name.official}
                        >
                          {country.isFavorite ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </Button>
                      </td>
                      <td>
                        <Button variant="text" id={country.name.official} className="more-info">
                          <Link to={"/countryInfo/" + country.name.official} className="more-info-text">
                            More Info
                            <ArrowForwardIosIcon className="arrow-icon"/>
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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
