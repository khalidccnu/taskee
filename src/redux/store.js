import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice.js";
import myTeamsSlice from "./my-teams/myTeamsSlice.js";
import usersSlice from "./users/usersSlice.js";
import tasksSlice from "./tasks/tasksSlice.js";

const store = configureStore({
  reducer: {
    authSlice,
    myTeamsSlice,
    usersSlice,
    tasksSlice,
  },
});

export default store;
