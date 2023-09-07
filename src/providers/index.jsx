import React from "react";
import { ThemeProvider } from "@mui/material";
import IKProvider from "./IKProvider.jsx";
import theme from "../utils/theme.js";

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <IKProvider>{children}</IKProvider>
    </ThemeProvider>
  );
};

export default Providers;
