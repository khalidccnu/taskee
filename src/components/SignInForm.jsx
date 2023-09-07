import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Google } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignInForm = ({ setSUMOpen }) => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <Box bgcolor={`#fff`} maxWidth={`20rem`} mx={`auto`} p={5} borderRadius={3}>
      <Grid
        component={`form`}
        container
        direction={`column`}
        rowSpacing={2}
        onSubmit={formik.handleSubmit}
      >
        <Grid item>
          <TextField
            type={`email`}
            placeholder={`Email`}
            name={`email`}
            fullWidth
            size={`small`}
            variant={`standard`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item>
          <TextField
            type={`password`}
            placeholder={`Password`}
            name={`password`}
            fullWidth
            size={`small`}
            variant={`standard`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item>
          <Button
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
            SignIn
          </Button>
        </Grid>
        <Grid
          container
          item
          direction={{ xs: `column`, md: `row` }}
          alignItems={`center`}
          justifyContent={{ md: `space-between` }}
        >
          <Grid item>
            <Typography component={`span`}>New to Taskee?</Typography>
          </Grid>
          <Grid item>
            <Button
              type={`button`}
              color={`rifleGreen`}
              variant={`text`}
              size={`small`}
              onClick={() => setSUMOpen(true)}
            >
              Create New Account
            </Button>
          </Grid>
        </Grid>
        <Divider variant="middle" sx={{ my: 1 }}>
          or
        </Divider>
        <Grid item>
          <Button
            fullWidth
            type={`submit`}
            color={`rifleGreen`}
            variant={`outlined`}
            size={`small`}
            sx={{
              boxShadow: `none`,
              "&:hover": {
                color: `#fff`,
                backgroundColor: theme.palette.rifleGreen.main,
                boxShadow: `none`,
              },
            }}
          >
            <Box
              display={`flex`}
              flexDirection={{ xs: `column`, md: `row` }}
              alignItems={`center`}
              gap={0.5}
            >
              <Google />
              <Typography
                component={`span`}
                sx={{ textTransform: `capitalize` }}
              >
                Continue with Google
              </Typography>
            </Box>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInForm;
