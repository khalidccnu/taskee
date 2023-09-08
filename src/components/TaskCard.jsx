import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Article, Person, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/auth/authThunks.js";

const TaskCard = ({ task, changeStatusTask }) => {
  const theme = useTheme();
  const { setTVMOpen, setViewTask } = useOutletContext();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.authSlice);
  const [assign, setAssign] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      const data = await dispatch(getUser({ uid: task.assign }));
      setAssign(data.payload.displayName);
    })();
  }, []);

  useEffect(() => {
    switch (task.status) {
      case "pending":
        setStatus("progress");
        break;
      case "progress":
        setStatus("completed");
        break;
      case "completed":
        setStatus("archive");
    }
  }, [task.status]);

  return (
    <Box bgcolor={`#fff`} borderRadius={2} overflow={`hidden`}>
      <Box height={`250px`} overflow={`hidden`}>
        <Grid
          container
          justifyContent={`space-between`}
          alignItems={`center`}
          flexWrap={`nowrap`}
          spacing={2}
          p={2}
          bgcolor={theme.palette.rifleGreen.main}
        >
          <Grid item overflow={`hidden`}>
            <Typography
              component={`h4`}
              color={`#fff`}
              whiteSpace={`nowrap`}
              overflow={`hidden`}
              textOverflow={`ellipsis`}
            >
              {task.title}
            </Typography>
          </Grid>
          <Grid item>
            <Visibility
              sx={{
                color: `#fff`,
                cursor: `pointer`,
                transition: `color 0.5s ease-in-out`,
                "&:hover": { color: theme.palette.axolotl.main },
              }}
              onClick={() => {
                setViewTask(task);
                setTVMOpen(true);
              }}
            />
          </Grid>
        </Grid>
        <Typography p={2}>
          {task.description.length > 220
            ? task.description.slice(0, 220) + "..."
            : task.description}
        </Typography>
      </Box>
      <Grid container alignItems={`center`} spacing={2} p={2}>
        <Grid
          container
          item
          alignItems={`center`}
          xs={user.uid === task.assign ? 8 : 12}
          spacing={0.5}
        >
          <Grid item>
            <Person />
          </Grid>
          <Grid item>
            <Typography component={`span`}>{assign}</Typography>
          </Grid>
        </Grid>
        {user.uid === task.assign ? (
          <Grid item xs={4} textAlign={`end`}>
            <Tooltip title={`Mark as ${status}`}>
              <Button
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
                onClick={() => changeStatusTask(task.id, status)}
              >
                <Article />
              </Button>
            </Tooltip>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export default TaskCard;
