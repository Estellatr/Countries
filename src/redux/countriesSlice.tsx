import { createAsyncThunk, AsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const countriesApi = "https://restcountries.com/v3.1/all";
const initialState: CountriesState = {
  status: "idle",
  error: null,
  countries: [],
};
//INTERFACE
interface CountriesState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  countries: Country[];
}

interface Country {
  name: {
    common: string;
    official: string;
    native: string;
  };
  flag: string;
  region: string;
  population: number;
  languages: object;
}



//SLICE
export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    // favouriteCountry: (state, action) => {
    //   state.data.isFavourite = !state.data.isFavourite;
    // },
    //showCountries: (state) => state,
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
    })
  },
});

//THUNK
export const fetchCountries = createAsyncThunk("countries/fetch", async () => {
  const response: AxiosResponse<Array<Country>, any> = await axios.get(
    countriesApi
  );
  console.log(response.data)
  return response.data;
});

// export const { favouriteCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
