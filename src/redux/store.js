import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice.js";
import myTeamsSlice from "./my-teams/myTeamsSlice.js";
import usersSlice from "./users/usersSlice.js";

const store = configureStore({
  reducer: {
    authSlice,
    myTeamsSlice,
    usersSlice,
  },
});

export default store;
