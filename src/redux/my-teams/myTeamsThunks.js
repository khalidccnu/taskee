import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTeams } from "../../utils/localStorage.js";

export const getMyTeams = createAsyncThunk("myTeams/getMyTeams", ({uid}) => {
  const teams = getTeams();

  return teams.filter((team) => team.users.includes(uid));
});
