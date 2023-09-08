import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Article, Person } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/auth/authThunks.js";

const TeamTaskCard = ({ task, changeStatusTask }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [assign, setAssign] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      const data = await dispatch(getUser(task.assign));
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
  }, [changeStatusTask]);

  return (
    <Box bgcolor={`#fff`} borderRadius={2} overflow={`hidden`}>
      <Box height={`250px`} overflow={`hidden`}>
        <Typography
          component={`h4`}
          bgcolor={theme.palette.rifleGreen.main}
          color={`#fff`}
          p={2}
          whiteSpace={`nowrap`}
          overflow={`hidden`}
          textOverflow={`ellipsis`}
        >
          {task.title}
        </Typography>
        <Typography p={2}>{task.description}</Typography>
      </Box>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid container item alignItems={`center`} xs={6}>
            <Grid item>
              <Person />
            </Grid>
            <Grid item>{assign}</Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TeamTaskCard;
