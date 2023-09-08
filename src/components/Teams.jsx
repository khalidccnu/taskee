import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Groups, MenuOpen } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getMyTeams } from "../redux/my-teams/myTeamsThunks.js";

const Teams = ({ isTeams, setTeams }) => {
  const theme = useTheme();
  const { user } = useSelector((store) => store.authSlice);
  const { myTeams } = useSelector((store) => store.myTeamsSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) dispatch(getMyTeams({ uid: user.uid }));
  }, [user]);

  return (
    <Box
      position={`fixed`}
      top={0}
      right={!isTeams ? -350 : 0}
      bgcolor={theme.palette.axolotl.main}
      width={280}
      height={`100%`}
      px={3}
      py={5}
      sx={{
        transition: `right 0.5s ease-in-out`,
      }}
      zIndex={15}
    >
      <Box textAlign={`end`}>
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
          onClick={() => setTeams(false)}
        >
          <MenuOpen fontSize={`small`} sx={{ rotate: `180deg` }} />
        </Button>
      </Box>
      <Box
        height={`calc(100vh - ${theme.spacing(14)})`}
        sx={{ overflowY: `auto` }}
      >
        <List
          sx={{
            color: `#fff`,
            mt: 3,
          }}
        >
          {myTeams.length ? (
            myTeams.map((team) => {
              return (
                <ListItem key={team.id} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(`/dashboard/teams/${team.id}`)}
                  >
                    <ListItemIcon sx={{ minWidth: 35, color: `#fff` }}>
                      <Groups />
                    </ListItemIcon>
                    <ListItemText primary={team.name} />
                  </ListItemButton>
                </ListItem>
              );
            })
          ) : (
            <Typography component={`h6`} variant={`h6`}>
              No teams!
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Teams;
