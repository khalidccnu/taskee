import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme.js";

const Providers = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Providers;
