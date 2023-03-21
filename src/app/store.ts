import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import countriesReducer from '../redux/countriesSlice'
import countryReducer from '../redux/countrySlice'

export const store = configureStore({
  reducer: { 
    countries: countriesReducer,
    country: countryReducer,
   },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
