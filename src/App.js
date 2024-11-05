import React from "react";
import Router from "./components/Router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/theme";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
