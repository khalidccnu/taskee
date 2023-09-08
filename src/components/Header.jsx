import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AddCircle, Logout, Menu, MenuOpen } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authThunks.js";

const Header = ({ isHBMenu, setHbMenu, setNIMOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut())
      .then(() => sessionStorage.removeItem("_vu"))
      .then(() => navigate("/"));
  };

  return (
    <Box component={`header`} bgcolor={`#fff`} py={2}>
      <Box px={3}>
        <Grid
          container
          direction={{ xs: `column`, sm: `row` }}
          flexWrap={`nowrap`}
          justifyContent={`space-between`}
          alignItems={`center`}
          gap={2}
        >
          <Grid item>
            <Box component={`figure`} width={`8rem`} m={0}>
              <Box
                component={`img`}
                src={`/lg-taskee.svg`}
                alt={``}
                width={`100%`}
              ></Box>
            </Box>
          </Grid>
          <Grid container item gap={1} width={`fit-content`}>
            <Grid item display={{ xs: `block`, md: `none` }}>
              <Button
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
                onClick={() => setHbMenu(!isHBMenu)}
              >
                {isHBMenu ? (
                  <Menu fontSize={`small`} />
                ) : (
                  <MenuOpen fontSize={`small`} />
                )}
              </Button>
            </Grid>
            <Grid item>
              <Button
                startIcon={<AddCircle />}
                type={`button`}
                color={`rifleGreen`}
                variant={`outlined`}
                size={`small`}
                sx={{
                  color: theme.palette.rifleGreen.main,
                  boxShadow: `none`,
                  "&:hover": {
                    color: `#fff`,
                    backgroundColor: theme.palette.rifleGreen.main,
                    boxShadow: `none`,
                  },
                }}
                onClick={() => setNIMOpen(true)}
              >
                New
              </Button>
            </Grid>
            <Grid item>
              <Button
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
                onClick={handleLogout}
              >
                <Logout fontSize={`small`} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Header;
