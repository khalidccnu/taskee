import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks as getTasksFromLS } from "../../utils/localStorage.js";

export const getTasks = createAsyncThunk("tasks/getTasks", () => {
  return getTasksFromLS();
});

export const getMyTasks = createAsyncThunk("tasks/getMyTasks", ({ uid }) => {
  const tasks = getTasksFromLS();

  return tasks.filter(
    (task) => task.assign === uid && task.status !== "archive",
  );
});

export const getTeamTasks = createAsyncThunk(
  "tasks/getTeamTasks",
  ({ teamID }) => {
    const tasks = getTasksFromLS();

    return tasks.filter(
      (task) => task.team === teamID && task.status !== "archive",
    );
  },
);
