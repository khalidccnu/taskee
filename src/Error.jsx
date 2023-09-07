import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArrowBack, Home } from "@mui/icons-material";
import img404 from "./assets/404.svg";

const Error = () => {
  const theme = useTheme();
  const { status, statusText } = useRouteError();
  const navigate = useNavigate();

  return (
    <Box component={`section`}>
      <Container>
        <Grid
          container
          direction={{ xs: `column`, lg: `row` }}
          justifyContent={`center`}
          alignItems={{ lg: `center` }}
          columnGap={10}
          rowGap={5}
          maxWidth={`fit-content`}
          minHeight={`100vh`}
          mx={`auto`}
          py={{ xs: 5, lg: 10 }}
        >
          <Grid item order={{ xs: 1, lg: 0 }}>
            <Typography component={`span`} variant={`body2`}>
              Oops!
            </Typography>
            <Typography component={`h1`} variant={`h5`}>
              {status && statusText ? status + " " + statusText : null}
            </Typography>
            <Typography variant={`h6`}>An error has occurred!</Typography>
            <Grid container item gap={1} mt={3}>
              <Grid item>
                <Button
                  startIcon={<ArrowBack />}
                  type={`button`}
                  color={`rifleGreen`}
                  variant={`outlined`}
                  size={`small`}
                  sx={{
                    height: "100%",
                    color: theme.palette.rifleGreen.main,
                    boxShadow: `none`,
                    "&:hover": {
                      color: `#fff`,
                      backgroundColor: theme.palette.rifleGreen.main,
                      boxShadow: `none`,
                    },
                  }}
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<Home />}
                  type={`button`}
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
                  onClick={() => navigate(`/`)}
                >
                  Take Me Home
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box component={`figure`} m={0}>
              <Box component={`img`} src={img404} alt={``} width={`100%`}></Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Error;
