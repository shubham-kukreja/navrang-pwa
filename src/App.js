import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import "./App.css";
import TemporaryDrawer from "./components/Drawer";
import Routes from "./Routes";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#e83328",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;
