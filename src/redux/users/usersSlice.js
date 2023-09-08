import { createSlice } from "@reduxjs/toolkit";
import { getSomeUsers, getUsers } from "./usersThunks.js";

const initialState = {
  someUsers: [],
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSomeUsers.fulfilled, (state, action) => {
      state.someUsers = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
