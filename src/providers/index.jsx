import React from "react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider.jsx";
import IKProvider from "./IKProvider.jsx";
import theme from "../utils/theme.js";
import store from "../redux/store.js";

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <IKProvider>{children}</IKProvider>
        <AuthProvider />
      </Provider>
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
