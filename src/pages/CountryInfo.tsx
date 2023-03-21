import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCountry } from "../redux/countrySlice";
import { Country } from "../redux/countriesSlice";
import { objectToStringArr } from "../components/Countries/Countries";
import { Header } from "../components/Header and Footer/Header";
import { Footer } from "../components/Header and Footer/Footer";

export const CountryInfo = () => {
  const country: Country = useAppSelector<Country>((state) => {
    // console.log(state.country)
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
  console.log(country.name.official);

  return (
    <div>
      <Header />
      <h1>Country Info</h1>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 100 }}
            color="text.secondary"
            gutterBottom
            variant="h1"
          >
            <img src={country.flags.png}></img>
          </Typography>

          <Typography variant="h4" color="text.secondary" gutterBottom>
            This country's name is {country.name.common} and it belongs to the
            region of {country.region}. It has a population of{" "}
            {country.population}.
          </Typography>

          <Typography variant="h4" color="text.secondary" gutterBottom>
            Facts About this Country:
          </Typography>
          <Typography variant="h4" component="div" display="block">
            Common Name: {country.name.common}
            {country.name.official == null ? (
              ""
            ) : (
              <h4>Official Name: {country.name.official}</h4>
            )}
            {country.name.native == null ? (
              ""
            ) : (
              <h4>Native Name: {country.name.native}</h4>
            )}
          </Typography>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            Region: {country.region}
          </Typography>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            Languages:{" "}
            {country.languages != undefined ? (
              objectToStringArr(country.languages).map((lang) => {
                return (
                  <Typography color="text.secondary" gutterBottom key={lang}>
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
          <Typography variant="h4" color="text.secondary" gutterBottom>
            Information: {country.population}
          </Typography>
        </CardContent>
        <CardActions>
          {/* Add anything? */}
        </CardActions>
      </Card>
      <Footer />
    </div>
  );
};
