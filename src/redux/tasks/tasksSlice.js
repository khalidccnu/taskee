import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "../../utils/localStorage.js";

const initialState = {
  tasks: [],
  myTasks: [],
  teamTasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasksAll: (state) => {
      state.tasks = getTasks();
    },
    getMyTasks: (state, action) => {
      const tasks = getTasks();

      state.myTasks = tasks.filter((task) => task.assign === action.payload);
    },
    getTeamTasks: (state, action) => {
      const tasks = getTasks();

      state.teamTasks = tasks.filter((task) => task.team === action.payload);
    },
  },
});

export const { getTasksAll, getMyTasks, getTeamTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
