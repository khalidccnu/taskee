import { createSlice } from "@reduxjs/toolkit";
import { getSomeUsers, getUsers } from "./usersThunks.js";

const initialState = {
  someUsers: [],
  someUsersError: null,
  users: [],
  usersError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSomeUsers.pending, (state) => {
        state.someUsers = [];
        state.someUsersError = null;
      })
      .addCase(getSomeUsers.fulfilled, (state, action) => {
        state.someUsers = action.payload;
        state.someUsersError = null;
      })
      .addCase(getSomeUsers.rejected, (state, action) => {
        state.someUsers = [];
        state.someUsersError = action?.error.message;
      });

    builder
      .addCase(getUsers.pending, (state) => {
        state.users = [];
        state.usersError = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.usersError = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.users = [];
        state.usersError = action?.error.message;
      });
  },
});

export default usersSlice.reducer;
