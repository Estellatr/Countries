import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { Favorites } from "./pages/Favorites";
import { CountryInfo } from "./pages/CountryInfo";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Header } from "./components/Header and Footer/Header";
import { Footer } from "./components/Header and Footer/Footer";


const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="favourites" element={<Favorites />} />
          <Route path="countryInfo/*" element={<CountryInfo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
