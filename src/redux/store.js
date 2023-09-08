import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice.js";
import myTeamsSlice from "./my-teams/myTeamsSlice.js";

const store = configureStore({
  reducer: {
    authSlice,
    myTeamsSlice,
  },
});

export default store;
