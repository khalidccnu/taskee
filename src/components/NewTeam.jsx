import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ControlPoint } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { addToTeams } from "../utils/localStorage.js";
import { getMyTeams } from "../redux/my-teams/myTeamsThunks.js";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Team name should be of minimum 3 characters length")
    .required("Team name is required"),
});

const NewTeam = ({ setTeam }) => {
  const { user } = useSelector((store) => store.authSlice);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { setNIMOpen } = useOutletContext();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      addToTeams({ ...values, users: [user.uid] });
      dispatch(getMyTeams({ uid: user.uid }));
      setNIMOpen(false);
      setTeam(false);
      toast.success("New team created!");
    },
  });

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
          placeholder={`Team name`}
          name={`name`}
          fullWidth
          size={`small`}
          variant={`standard`}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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

export default NewTeam;
