import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { objectToStringArr } from "../components/Countries/Countries";
import { Country } from "../redux/countriesSlice";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Favorites = () => {
  const countries = useAppSelector((state) => {
    return state.countries;
  });

  let filteredCountries: Country[] = countries.countries.filter(
    (country) => country.isFavorite 
  );

   console.log(filteredCountries);

  return (
    <div>
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
                  <Button variant="text" id={country.name.official}><Link to={'/countryInfo/' + country.name.official}>More Info< ArrowForwardIosIcon/></Link></Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>





    </div>
  );
};

