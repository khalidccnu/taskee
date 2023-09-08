import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UsersInviteModal from "../components/UsersInviteModal.jsx";

const Teams = () => {
  const { id: teamID } = useParams();
  const theme = useTheme();
  const [isUIMOpen, setUIMOpen] = useState(false);

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
        isUIMOpen={isUIMOpen}
        setUIMOpen={setUIMOpen}
      />
    </Box>
  );
};

export default Teams;
