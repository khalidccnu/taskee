import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CloudUpload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { IKImage } from "imagekitio-react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateUser } from "../redux/auth/authThunks.js";

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Name should be of minimum 3 characters length")
    .required("Username is required"),
  name: yup
    .string()
    .min(3, "Name should be of minimum 3 characters length")
    .required("Name is required"),
  bio: yup
    .string()
    .min(15, "Bio should be of minimum 15 characters length")
    .required("Bio is required"),
});

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.authSlice);
  const [userImgPrev, setUserImgPrev] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: user.username,
      name: user.displayName,
      bio: user.bio,
      userImg: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const constructUser = {
        uid: user.uid,
        username: values.username,
        displayName: values.name,
        bio: values.bio,
      };

      dispatch(updateUser({ user: constructUser })).then((response) => {
        if (response?.meta.requestStatus !== "fulfilled") {
          toast.error("Something went wrong!");
        } else {
          toast.success("Data updated!");
        }
      });
    },
  });

  useEffect(() => {
    if (formik.values.userImg) {
      const reader = new FileReader();

      reader.onload = () => setUserImgPrev(reader.result);
      reader.readAsDataURL(formik.values.userImg);
    } else {
      setUserImgPrev(null);
    }
  }, [formik.values.userImg]);

  return (
    <Box maxWidth={`24rem`} mx={`auto`}>
      <Box>
        <Box
          component={`figure`}
          m={0}
          width={50}
          height={50}
          borderRadius={`100%`}
          overflow={`hidden`}
        >
          {userImgPrev ? (
            <Box
              component={`img`}
              src={userImgPrev}
              alt={``}
              width={`100%`}
              height={`100%`}
            ></Box>
          ) : user?.photoURL.includes("https://") ? (
            <Box
              component={`img`}
              src={user.photoURL}
              alt={``}
              width={`100%`}
              height={`100%`}
            ></Box>
          ) : (
            <IKImage
              path={user?.photoURL}
              alt={``}
              width={`100%`}
              height={`100%`}
              transformation={[{ q: "40" }]}
            />
          )}
        </Box>
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
              placeholder={`User name`}
              name={`username`}
              fullWidth
              size={`small`}
              variant={`standard`}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
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
              placeholder={`Bio`}
              name={`bio`}
              fullWidth
              size={`small`}
              variant={`standard`}
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
            />
          </Grid>
          <Grid item>
            <Button
              startIcon={<CloudUpload />}
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
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
