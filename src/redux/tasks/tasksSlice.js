import { createSlice } from "@reduxjs/toolkit";
import { getMyTasks, getTasks, getTeamTasks } from "./tasksThunks.js";

const initialState = {
  tasks: [],
  tasksError: null,
  myTasks: [],
  myTasksError: null,
  teamTasks: [],
  teamTasksError: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.tasks = [];
        state.tasksError = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.tasksError = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.tasks = [];
        state.tasksError = action?.error.message;
      });

    builder
      .addCase(getMyTasks.pending, (state) => {
        state.myTasks = [];
        state.myTasksError = null;
      })
      .addCase(getMyTasks.fulfilled, (state, action) => {
        state.myTasks = action.payload;
        state.myTasksError = null;
      })
      .addCase(getMyTasks.rejected, (state, action) => {
        state.myTasks = [];
        state.myTasksError = action?.error.message;
      });

    builder
      .addCase(getTeamTasks.pending, (state) => {
        state.teamTasks = [];
        state.teamTasksError = null;
      })
      .addCase(getTeamTasks.fulfilled, (state, action) => {
        state.teamTasks = action.payload;
        state.teamTasksError = null;
      })
      .addCase(getTeamTasks.rejected, (state, action) => {
        state.teamTasks = [];
        state.teamTasksError = action?.error.message;
      });
  },
});

export default tasksSlice.reducer;
