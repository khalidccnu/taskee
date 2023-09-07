import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import SignInForm from "../components/SignInForm.jsx";
import SignUpForm from "../components/SignUpForm.jsx";

const SignIn = () => {
  const [isSUMOpen, setSUMOpen] = useState(false);

  return (
    <Box component={`section`} py={{ xs: 5, sm: 10 }}>
      <Container>
        <Grid container alignItems={`center`} spacing={3.5}>
          <Grid item xs={12} sm={6}>
            <Box textAlign={{ xs: `center`, sm: `start` }}>
              <Box
                component={`figure`}
                maxWidth={{ xs: `10rem`, sm: `18rem` }}
                mx={{ xs: `auto`, sm: 0 }}
                my={0}
              >
                <Box
                  component={`img`}
                  src={`/lg-taskee.svg`}
                  alt={``}
                  width={`100%`}
                ></Box>
              </Box>
              <Typography mt={1} sx={{ fontSize: `1.25rem` }}>
                Taskee is a collaborative task management app to help stay
                organized and manage day-to-day.
              </Typography>
            </Box>
          </Grid>
          <Grid id={`signin`} item xs={12} sm={6}>
            <SignInForm setSUMOpen={setSUMOpen} />
          </Grid>
        </Grid>
        <SignUpForm isSUMOpen={isSUMOpen} setSUMOpen={setSUMOpen} />
      </Container>
    </Box>
  );
};

export default SignIn;
