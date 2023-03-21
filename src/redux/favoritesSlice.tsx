import { createSlice } from "@reduxjs/toolkit";


interface FavoriteState {
    name: {
        common: string
    }
}

const initialState: FavoritesState = {
    status: "idle",
    error: null,
    countries: [],
  };
  //INTERFACE
  interface FavoritesState {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    countries: Favorite[];
  }
  
  interface Favorite {
    name: {
      common: string;
      official: string;
      native: string;
    };
    flag: string;
    region: string;
    population: number;
    languages: object;
    isFavorite: false | true;
  }

export const favoritesSlice = createSlice({
name: "favorites",
initialState,
reducers: {}
})