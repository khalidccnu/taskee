import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { getTeams, updateTasks } from "../utils/localStorage.js";
import { getTeamTasks } from "../redux/tasks/tasksThunks.js";
import TaskCard from "../components/TaskCard.jsx";
import UsersInviteModal from "../components/UsersInviteModal.jsx";

const Teams = () => {
  const { id: teamID } = useParams();
  const theme = useTheme();
  const [isUIMOpen, setUIMOpen] = useState(false);
  const [team, setTeam] = useState({});
  const dispatch = useDispatch();
  const { teamTasks } = useSelector((store) => store.tasksSlice);
  const [tasks, setTasks] = useState([]);

  const formik = useFormik({
    initialValues: {
      filter: "",
      dateFilter: null,
      sort: "",
    },
  });

  const changeStatusTask = (id, status) => {
    updateTasks(id, status);
    dispatch(getTeamTasks({ teamID }));
  };

  useEffect(() => {
    const getTeam = getTeams().find((team) => team.id === teamID);

    setTeam(getTeam);
  }, []);

  useEffect(() => {
    dispatch(getTeamTasks({ teamID }));
  }, [teamID]);

  useEffect(() => {
    let arr;

    if (teamTasks && formik.values.filter) {
      arr = teamTasks.filter((task) => task.status === formik.values.filter);
    } else if (teamTasks && formik.values.dateFilter) {
      arr = teamTasks.filter(
        (task) =>
          JSON.stringify(task.dueDate) ===
          JSON.stringify(formik.values.dateFilter),
      );
    } else {
      arr = teamTasks;
    }

    setTasks(arr);
  }, [formik.values.filter, formik.values.dateFilter, teamTasks]);

  useEffect(() => {
    if (tasks && formik.values.sort) {
      if (formik.values.sort === "priority-low") {
        const arr = [...tasks];
        arr.sort((a, b) => a.level - b.level);
        setTasks([...arr]);
      } else if (formik.values.sort === "priority-high") {
        const arr = [...tasks];
        arr.sort((a, b) => b.level - a.level);
        setTasks([...arr]);
      } else if (formik.values.sort === "title-a-z") {
        const arr = [...tasks];
        arr.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }

          return 0;
        });

        setTasks([...arr]);
      } else if (formik.values.sort === "title-z-a") {
        const arr = [...tasks];
        arr.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return 1;
          }
          if (titleA > titleB) {
            return -1;
          }

          return 0;
        });

        setTasks([...arr]);
      }
    }
  }, [formik.values.sort, tasks]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            type={`button`}
            color={`rifleGreen`}
            variant={`outlined`}
            size={`small`}
            sx={{
              height: `100%`,
              color: theme.palette.rifleGreen.main,
              boxShadow: `none`,
              "&:hover": {
                color: `#fff`,
                backgroundColor: theme.palette.rifleGreen.main,
                boxShadow: `none`,
              },
            }}
            onClick={() => setUIMOpen(true)}
          >
            Users
          </Button>
        </Grid>
        <Grid item>
          <FormControl size="small" sx={{ minWidth: `7rem` }}>
            <InputLabel id="filter">Filter</InputLabel>
            <Select
              label="Filter"
              name={`filter`}
              id="filter"
              value={formik.values.filter}
              onChange={formik.handleChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={`pending`}>Pending</MenuItem>
              <MenuItem value={`progress`}>Progress</MenuItem>
              <MenuItem value={`completed`}>Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl size="small" sx={{ minWidth: `9rem` }}>
            <InputLabel id="sort">Sort</InputLabel>
            <Select
              label="Sort"
              name={`sort`}
              id="sort"
              value={formik.values.sort}
              onChange={formik.handleChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={`title-a-z`}>Title (A-Z)</MenuItem>
              <MenuItem value={`title-z-a`}>Title (Z-A)</MenuItem>
              <MenuItem value={`priority-low`}>Priority (Low)</MenuItem>
              <MenuItem value={`priority-high`}>Priority (High)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name={`dateFilter`}
                value={formik.values.dateFilter}
                onChange={(date) => formik.setFieldValue("dateFilter", date)}
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "0.875rem",
                    height: "42px",
                  },
                }}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>
      {tasks.length ? (
        <Grid container spacing={2} mt={3}>
          {tasks.map((task) => (
            <Grid item key={task.id} xs={12} sm={6} lg={4}>
              <TaskCard task={task} changeStatusTask={changeStatusTask} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography component={`h6`} variant={`h6`} mt={2}>
          No tasks!
        </Typography>
      )}
      <UsersInviteModal
        teamID={teamID}
        teamName={team.name}
        isUIMOpen={isUIMOpen}
        setUIMOpen={setUIMOpen}
      />
    </Box>
  );
};

export default Teams;
