import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { Country } from "./countriesSlice";

export const initialState: CountryState = {
  status: "idle",
  error: null,
  country: {
    name: {
      common: "",
      official: "",
      native: "",
    },
    flags: {
      png: "",
      svg: "",
      alt: ""
    },
    region: "",
    population: 0,
    languages: {},
    isFavorite: false,
  },
};


export interface CountryState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  country: Country;
}

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountry.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.country = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCountry.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchCountry.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const fetchCountry = createAsyncThunk("country/fetch", async () => {
  const names = window.location.href.split("/");
  const countryApi = `https://restcountries.com/v3.1/name/${
    names[names.length - 1]
  }`;
  const response = await axios.get(countryApi);
  return response.data[0];
});


export default countrySlice.reducer;
