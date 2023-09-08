import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTheme } from "@mui/material/styles";
import { ControlPoint } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { addToTasks, getTeams } from "../utils/localStorage.js";
import { getMyTeams } from "../redux/my-teams/myTeamsSlice.js";
import { getSomeUsers } from "../redux/users/usersThunks.js";

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, "Task title should be of minimum 3 characters length")
    .required("Task title is required"),
  description: yup
    .string()
    .min(15, "Task description should be of minimum 15 characters length")
    .required("Task description is required"),
  team: yup.string().required("Team is required"),
  assign: yup.string().required("Assign is required"),
  dueDate: yup.date().required("Due date is required"),
  level: yup.string().required("Priority is required"),
});

const NewTask = ({ setTask }) => {
  const { user } = useSelector((store) => store.authSlice);
  const { myTeams } = useSelector((store) => store.myTeamsSlice);
  const { someUsers } = useSelector((store) => store.usersSlice);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { setNIMOpen } = useOutletContext();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      team: "",
      assign: "",
      dueDate: null,
      level: "",
    },
    validationSchema,
    onSubmit: (values) => {
      addToTasks(values);
      dispatch(getMyTeams(user.uid));
      setNIMOpen(false);
      setTask(false);
      toast.success("Task created!");
    },
  });

  useEffect(() => {
    dispatch(getMyTeams(user.uid));
  }, []);

  useEffect(() => {
    dispatch(getMyTeams(user.uid));
  }, []);

  useEffect(() => {
    if (formik.values.team) {
      const getTeam = getTeams().find((team) => team.id === formik.values.team);

      dispatch(getSomeUsers({ userIds: getTeam.users }));
    }
  }, [formik.values.team]);

  return (
    <Grid
      component={`form`}
      container
      direction={`column`}
      rowSpacing={2}
      onSubmit={formik.handleSubmit}
    >
      <Grid item>
        <TextField
          placeholder={`Title`}
          name={`title`}
          fullWidth
          size={`small`}
          variant={`standard`}
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
      </Grid>
      <Grid item>
        <TextField
          placeholder={`Description`}
          name={`description`}
          fullWidth
          size={`small`}
          variant={`standard`}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
      </Grid>
      <Grid item>
        <FormControl fullWidth size="small">
          <InputLabel id="team">Team</InputLabel>
          <Select
            label="Team"
            name={`team`}
            id="team"
            value={formik.values.team}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.team && Boolean(formik.errors.team)}
          >
            <MenuItem value="">None</MenuItem>
            {myTeams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.team && formik.errors.team && (
            <FormHelperText error sx={{ ml: 0 }}>
              {formik.errors.team}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth size="small">
          <InputLabel id="assign">Assign</InputLabel>
          <Select
            label="Assign"
            name={`assign`}
            id="assign"
            value={formik.values.assign}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.assign && Boolean(formik.errors.assign)}
          >
            <MenuItem value="">None</MenuItem>
            {someUsers.map((user) => (
              <MenuItem key={user.uid} value={user.uid}>
                {user.displayName}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.assign && formik.errors.assign && (
            <FormHelperText error sx={{ ml: 0 }}>
              {formik.errors.assign}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth size="small">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name={`dueDate`}
              value={formik.values.dueDate}
              onChange={(date) => formik.setFieldValue("dueDate", date)}
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "0.875rem",
                  height: "42px",
                },
              }}
            />
          </LocalizationProvider>
          {formik.touched.dueDate && formik.errors.dueDate && (
            <FormHelperText error sx={{ ml: 0 }}>
              {formik.errors.dueDate}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth size="small">
          <InputLabel id="level">Priority</InputLabel>
          <Select
            label="Priority"
            name={`level`}
            id="level"
            value={formik.values.level}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.level && Boolean(formik.errors.level)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>High</MenuItem>
          </Select>
          {formik.touched.level && formik.errors.level && (
            <FormHelperText error sx={{ ml: 0 }}>
              {formik.errors.level}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          startIcon={<ControlPoint />}
          fullWidth
          type={`submit`}
          color={`rifleGreen`}
          variant={`contained`}
          size={`small`}
          sx={{
            color: `#fff`,
            border: `1px solid transparent`,
            boxShadow: `none`,
            "&:hover": {
              color: theme.palette.rifleGreen.main,
              backgroundColor: `transparent`,
              borderColor: theme.palette.rifleGreen.main,
              boxShadow: `none`,
            },
          }}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewTask;
