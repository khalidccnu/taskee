import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, updateTasks } from "../utils/localStorage.js";
import { getTeamTasks } from "../redux/tasks/tasksSlice.js";
import TeamTaskCard from "../components/TeamTaskCard.jsx";
import UsersInviteModal from "../components/UsersInviteModal.jsx";

const Teams = () => {
  const { id: teamID } = useParams();
  const theme = useTheme();
  const [isUIMOpen, setUIMOpen] = useState(false);
  const [team, setTeam] = useState({});
  const dispatch = useDispatch();
  const { teamTasks } = useSelector((store) => store.tasksSlice);

  const changeStatusTask = (id, status) => {
    updateTasks(id, status);
    dispatch(getTeamTasks(teamID));
  };

  useEffect(() => {
    const getTeam = getTeams().find((team) => team.id === teamID);

    setTeam(getTeam);
  }, []);

  useEffect(() => {
    dispatch(getTeamTasks(teamID));
  }, [teamID]);

  return (
    <Box>
      <Box>
        <Button
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
          onClick={() => setUIMOpen(true)}
        >
          Users
        </Button>
      </Box>
      <Grid container spacing={2} mt={3}>
        {teamTasks.map((task) => (
          <Grid item key={task.id} xs={12} sm={6} lg={4}>
            <TeamTaskCard task={task} changeStatusTask={changeStatusTask} />
          </Grid>
        ))}
      </Grid>
      <UsersInviteModal
        teamID={teamID}
        teamName={team.name}
        isUIMOpen={isUIMOpen}
        setUIMOpen={setUIMOpen}
      />
    </Box>
  );
};

export default Teams;
