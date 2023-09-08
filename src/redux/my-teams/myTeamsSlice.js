import { createSlice } from "@reduxjs/toolkit";
import { getTeams } from "../../utils/localStorage.js";

const initialState = {
  myTeams: [],
};

const myTeamsSlice = createSlice({
  name: "myTeams",
  initialState,
  reducers: {
    getMyTeams: (state, action) => {
      const teams = getTeams();

      state.myTeams = teams.filter((team) =>
        team.users.includes(action.payload),
      );
    },
  },
});

export const { getMyTeams } = myTeamsSlice.actions;
export default myTeamsSlice.reducer;
