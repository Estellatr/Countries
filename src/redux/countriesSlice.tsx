import {
  createAsyncThunk,
  AsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const countriesApi = "https://restcountries.com/v3.1/all";

//INITIAL STATES:
export const initialState: CountriesState = {
  status: "idle",
  error: null,
  countries: [],
};

// const favoritesState: Favorite = {
//   isFavorite: true
// }

//INTERFACES:
//Country Interface
export interface CountriesState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  countries: Country[];
}

export interface Country {
  name: {
    common: string;
    official: string;
    native: string;
  };
  flags: {
    png: string,
    svg: string,
    alt: string
  };
  region: string;
  population: number;
  languages: object;
  isFavorite: false | true;
}

//COUNTRIESSLICE
export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    favoriteCountry: (state, action) => {
      let country: Country = state.countries.find(
        (country) => country.name.official == action.payload
      )!;


      if (country.isFavorite) {
        country.isFavorite = false;
      } else {
        country.isFavorite = true;
      }
    }
  },
  extraReducers: (builder) => {
    //FETCHCOUNTRIES CASE
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.countries = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCountries.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
  },
});

//THUNK
export const fetchCountries = createAsyncThunk("countries/fetch", async () => {
  console.log("fetchCountries");
  const response: AxiosResponse<Array<Country>, any> = await axios.get(
    countriesApi
  );
  return response.data;
});

export const { favoriteCountry} = countriesSlice.actions;
export default countriesSlice.reducer;
