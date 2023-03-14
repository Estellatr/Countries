import React from "react";
import { ReactDOM } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { Favourites } from "./pages/Favourites";
import { CountryInfo } from "./pages/CountryInfo";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="favourites" element={< Favourites />} />
        <Route path="countryInfo" element={< CountryInfo />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
