import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getTeams } from "../utils/localStorage.js";
import UsersInviteModal from "../components/UsersInviteModal.jsx";

const Teams = () => {
  const { id: teamID } = useParams();
  const theme = useTheme();
  const [isUIMOpen, setUIMOpen] = useState(false);
  const [team, setTeam] = useState({});

  useEffect(() => {
    const getTeam = getTeams().find((team) => team.id === teamID);

    setTeam(getTeam);
  }, []);

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
