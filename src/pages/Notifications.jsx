import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Check, Clear } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  acceptToTeams,
  getInviteUsers,
  removeFromInviteUsers,
} from "../utils/localStorage.js";
import { getMyTeams } from "../redux/my-teams/myTeamsSlice.js";

const Notifications = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState([]);
  const { user } = useSelector((store) => store.authSlice);
  const dispatch = useDispatch();
  const [isReFetch, setReFetch] = useState(false);

  const acceptInvite = (id, uid, teamID) => {
    acceptToTeams(uid, teamID);
    removeFromInviteUsers(id);
    toast.success("You have successfully connected!");
    setReFetch(!isReFetch);
    dispatch(getMyTeams());
  };

  const declineInvite = (id) => {
    removeFromInviteUsers(id);
    toast.success("You declined invitation!");
    setReFetch(!isReFetch);
  };

  useEffect(() => {
    if (user) {
      const inviteUsers = getInviteUsers().filter(
        (invite) => invite.uid === user.uid,
      );

      setNotifications(inviteUsers);
    }
  }, [user, isReFetch]);

  return (
    <Box display={`grid`} gridColumn={1} gap={2}>
      {notifications.length ? (
        notifications.map((notification) => {
          return (
            <Box>
              <Typography component={`h5`}>
                You are invited to
                <Typography component={`span`} fontWeight={600}>
                  {` ${notification.teamName} `}
                </Typography>
                Team.
              </Typography>
              <Grid container gap={1} mt={1}>
                <Grid item>
                  <Button
                    startIcon={<Check />}
                    type={`button`}
                    color={`rifleGreen`}
                    variant={`outlined`}
                    size={`small`}
                    sx={{
                      height: `100%`,
                      color: theme.palette.rifleGreen.main,
                      boxShadow: `none`,
                      "&:hover": {
                        color: `#fff`,
                        backgroundColor: theme.palette.rifleGreen.main,
                        boxShadow: `none`,
                      },
                    }}
                    onClick={() =>
                      acceptInvite(
                        notification.id,
                        user.uid,
                        notification.teamID,
                      )
                    }
                  >
                    Accept
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    startIcon={<Clear />}
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
                    onClick={() => declineInvite(notification.id)}
                  >
                    Decline
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        })
      ) : (
        <Typography component={`h6`} variant={`h6`}>
          No notifications!
        </Typography>
      )}
    </Box>
  );
};

export default Notifications;
