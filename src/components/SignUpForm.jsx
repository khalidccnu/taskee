import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormHelperText,
  Grid,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import { CloudUpload, PersonAdd } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { setUserLoading } from "../redux/auth/authSlice.js";
import { createUserWithEP } from "../redux/auth/authThunks.js";

const VisuallyHiddenInput = styled("input")`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  width: 1px;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  overflow: hidden;
`;

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name should be of minimum 3 characters length")
    .required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  userImg: yup
    .mixed()
    .required("Photo is required")
    .test(
      "photoSize",
      "Photo size is too large (=<2MB)",
      (value) => value.size <= 2000000,
    ),
});

const SignUpForm = ({ isSUMOpen, setSUMOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isUserLoading } = useSelector((store) => store.authSlice);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      userImg: null,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createUserWithEP({ values })).then((response) => {
        if (response?.error) {
          dispatch(setUserLoading(false));

          if (
            response.error.message ===
            "Firebase: Error (auth/email-already-in-use)."
          ) {
            toast.error("Email already in use!");
          }
        } else {
          toast.success(
            "Your account has been created successfully! You are being redirected, please wait...",
          );
          setTimeout(() => navigate("/dashboard"), 3000);
        }
      });
    },
  });

  return (
    <Modal
      open={isSUMOpen}
      onClose={() => setSUMOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isSUMOpen}>
        <Box
          position={`absolute`}
          top={`50%`}
          left={`50%`}
          bgcolor={`#fff`}
          width={{ xs: `13rem`, sm: `16rem` }}
          p={5}
          borderRadius={3}
          boxShadow={20}
          sx={{
            transform: `translate(-50%, -50%)`,
          }}
        >
          <Box>
            <Typography
              component={`h2`}
              variant={`h6`}
              sx={{ fontWeight: 600 }}
            >
              Sign Up
            </Typography>
            <Typography component={`span`} color={`dimgray`}>
              It's quick and easy.
            </Typography>
          </Box>
          <Box mt={3}>
            <Grid
              component={`form`}
              container
              direction={`column`}
              rowSpacing={2}
              onSubmit={formik.handleSubmit}
            >
              <Grid item>
                <TextField
                  placeholder={`Name`}
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
                  placeholder={`New password`}
                  name={`password`}
                  fullWidth
                  size={`small`}
                  variant={`standard`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid container item direction={`column`} rowSpacing={0.5}>
                <Grid item>
                  <Button
                    component="label"
                    startIcon={<CloudUpload />}
                    fullWidth
                    color={`rifleGreen`}
                    variant={`outlined`}
                    size={`small`}
                    sx={{
                      textTransform: `capitalize`,
                      boxShadow: `none`,
                      borderColor:
                        formik.touched.userImg && Boolean(formik.errors.userImg)
                          ? `red`
                          : ``,
                      "&:hover": {
                        color: `#fff`,
                        backgroundColor: theme.palette.rifleGreen.main,
                        boxShadow: `none`,
                      },
                    }}
                  >
                    {formik.values.userImg ? (
                      formik.values.userImg.name
                        .substring(
                          0,
                          formik.values.userImg.name.lastIndexOf("."),
                        )
                        .slice(0, 20)
                    ) : (
                      <Typography component={`span`}>Profile photo</Typography>
                    )}
                    <VisuallyHiddenInput
                      type={`file`}
                      name={`userImg`}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "userImg",
                          e.currentTarget.files[0],
                        );
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.userImg && Boolean(formik.errors.userImg)
                      }
                      helperText={
                        formik.touched.userImg && formik.errors.userImg
                      }
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <FormHelperText error>
                    {formik.touched.userImg && Boolean(formik.errors.userImg)
                      ? formik.touched.userImg && formik.errors.userImg
                      : null}
                  </FormHelperText>
                </Grid>
              </Grid>
              <Grid item>
                <LoadingButton
                  loading={isUserLoading}
                  loadingPosition="start"
                  startIcon={<PersonAdd />}
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
                  SignUp
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SignUpForm;
