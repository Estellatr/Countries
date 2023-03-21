import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { Countries } from "./components/Countries/Countries";
import { themeOptions } from "./components/Header and Footer/theme";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={themeOptions}>
        <Countries />
      </ThemeProvider>
    </div>
  );
};

export default App;
