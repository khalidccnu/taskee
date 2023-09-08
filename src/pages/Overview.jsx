import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../utils/localStorage.js";
import { getMyTasks } from "../redux/tasks/tasksThunks.js";
import TaskCard from "../components/TaskCard.jsx";

const Overview = () => {
  const [anmTManagement, setTManagement] = useState(null);
  const { myTasks } = useSelector((store) => store.tasksSlice);
  const { user } = useSelector((store) => store.authSlice);
  const dispatch = useDispatch();

  const changeStatusTask = (id, status) => {
    updateTasks(id, status);
    dispatch(getMyTasks({ uid: user.uid }));
  };

  useEffect(() => {
    if (user) {
      dispatch(getMyTasks({ uid: user.uid }));
    }
  }, [user]);

  useEffect(() => {
    import(`../assets/task-management.json`).then((response) =>
      setTManagement(response.default),
    );
  }, []);

  return (
    <Grid container spacing={2}>
      {myTasks.length ? (
        myTasks.map((task) => (
          <Grid item key={task.id} xs={12} sm={6} lg={4}>
            <TaskCard task={task} changeStatusTask={changeStatusTask} />
          </Grid>
        ))
      ) : (
        <Box maxWidth={320} mx={`auto`} mt={-8}>
          {anmTManagement ? (
            <Lottie animationData={anmTManagement} loop={true} />
          ) : null}
          <Typography textAlign={`center`}>You have no tasks!</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default Overview;
