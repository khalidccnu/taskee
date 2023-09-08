import { createSlice } from "@reduxjs/toolkit";
import { getMyTeams } from "./myTeamsThunks.js";

const initialState = {
  myTeams: [],
  myTeamsError: null,
};

const myTeamsSlice = createSlice({
  name: "myTeams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyTeams.pending, (state) => {
        state.myTeams = [];
        state.myTeamsError = null;
      })
      .addCase(getMyTeams.fulfilled, (state, action) => {
        state.myTeams = action.payload;
        state.myTeamsError = null;
      })
      .addCase(getMyTeams.rejected, (state, action) => {
        state.myTeams = [];
        state.myTeamsError = action?.error.message;
      });
  },
});

export default myTeamsSlice.reducer;
