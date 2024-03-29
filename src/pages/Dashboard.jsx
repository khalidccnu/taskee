import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  AccountCircle,
  Diversity2,
  MenuOpen,
  Notifications,
  SpaceDashboard,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { IKImage } from "imagekitio-react";
import NewItemModal from "../components/NewItemModal.jsx";
import TaskViewModal from "../components/TaskViewModal.jsx";
import Teams from "../components/Teams.jsx";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isHBMenu, setHbMenu, isNIMOpen, setNIMOpen } = useOutletContext();
  const [isTVMOpen, setTVMOpen] = useState(false);
  const [isTeams, setTeams] = useState(false);
  const { user } = useSelector((store) => store.authSlice);
  const [viewTask, setViewTask] = useState(null);

  const handleResize = () => {
    if (innerWidth >= 900) setHbMenu(false);
    else setHbMenu(true);
  };

  useEffect(() => {
    handleResize();

    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box component={`section`}>
      <Box
        display={`grid`}
        gridTemplateColumns={{
          xs: `repeat(1, 100%)`,
          md: `18rem calc(100% - 18rem)`,
        }}
      >
        <Box
          alignSelf={{ md: `start` }}
          position={{ xs: `fixed`, md: `sticky` }}
          top={0}
          left={isHBMenu ? -350 : 0}
          bgcolor={theme.palette.axolotl.main}
          width={{ xs: 280, md: `auto` }}
          height={{ xs: `100%`, md: `auto` }}
          px={3}
          py={5}
          sx={{
            transition: `left 0.5s ease-in-out`,
          }}
          zIndex={10}
        >
          <Box
            height={{ xs: `100%`, md: `calc(100vh - ${theme.spacing(10)})` }}
            sx={{ overflowY: `auto` }}
          >
            <Box textAlign={`end`} display={{ sm: `none` }}>
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
                    backgroundColor: `transparent`,
                    borderColor: `#fff`,
                    boxShadow: `none`,
                  },
                }}
                onClick={() => setHbMenu(!isHBMenu)}
              >
                <MenuOpen fontSize={`small`} />
              </Button>
            </Box>
            <Box>
              <Box
                component={`figure`}
                m={0}
                width={50}
                height={50}
                borderRadius={`100%`}
                overflow={`hidden`}
              >
                {user?.photoURL.includes("https://") ? (
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
              <Box color={`#fff`} mt={2}>
                <Typography component={`h5`} variant={`h5`}>
                  Hello,
                </Typography>
                <Typography component={`h3`} variant={`h6`}>
                  {user?.displayName || "Anonymous"}
                </Typography>
              </Box>
              <List
                sx={{
                  color: `#fff`,
                  backgroundColor: `#72775C`,
                  mt: 3,
                  px: 3,
                  borderRadius: 1,
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate(`/dashboard`)}>
                    <ListItemIcon sx={{ minWidth: 35, color: `#fff` }}>
                      <SpaceDashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate(`/dashboard/profile`)}
                  >
                    <ListItemIcon sx={{ minWidth: 35, color: `#fff` }}>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setTeams(!isTeams)}>
                    <ListItemIcon sx={{ minWidth: 35, color: `#fff` }}>
                      <Diversity2 />
                    </ListItemIcon>
                    <ListItemText primary="Teams" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate(`/dashboard/notifications`)}
                  >
                    <ListItemIcon sx={{ minWidth: 35, color: `#fff` }}>
                      <Notifications />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
        <Container>
          <Box py={5}>
            <Outlet context={{ setTVMOpen, setViewTask }} />
          </Box>
        </Container>
      </Box>
      <NewItemModal isNIMOpen={isNIMOpen} setNIMOpen={setNIMOpen} />
      <TaskViewModal
        isTVMOpen={isTVMOpen}
        setTVMOpen={setTVMOpen}
        viewTask={viewTask}
      />
      <Teams isTeams={isTeams} setTeams={setTeams} />
    </Box>
  );
};

export default Dashboard;
