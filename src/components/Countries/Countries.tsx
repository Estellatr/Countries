import { count } from "console";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCountries } from "../../redux/countriesSlice";

export const Countries = () => {
  //FETCH/DISPLAY DATA
  const countries = useAppSelector((state) => {
    return state.countries;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  if (countries.status === "loading") {
    return <div>Loading...</div>;
  }
  let list: Array<number> = [];
  // RETURN
  return (
    <div>
      <h3>List</h3>
      <table>
        <thead>
        <tr>
          <th><h2>Flag</h2></th>
          <th><h2>Name</h2></th>
          <th><h2>Region</h2></th>
          <th><h2>Population</h2></th>
          <th><h2>Languages</h2></th>
        </tr>
        </thead>
        <tbody>
          {countries.countries.map((country) => {
            return (
                <tr key={country.name.official}>
                  <td><h3>{country.flag}</h3></td>
                  <td><h3>{country.name.common}</h3></td>
                  <td><h3>{country.region}</h3></td>
                  <td><h3>{country.population}</h3></td>
                  <td>{country.languages != undefined ? (
                    objectToStringArr(country.languages).map((lang) => {
                      return <h3 key={lang}>{lang}</h3>;
                    })
                  ) : (
                    <h3>No languages</h3>
                  )}
                  </td>
                </tr>
            );
          })}
          </tbody>
        </table>
    </div>
  );
};

const objectToStringArr = function (obj: object) {
  let result: Array<string> = [];
  Object.values(obj).forEach((item) => {
    result.push(item);
  });
  return result;
};
