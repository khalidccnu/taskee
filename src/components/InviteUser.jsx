import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { getInviteUsers, getTeams } from "../utils/localStorage.js";

const InviteUser = ({ user, inviteUser, isReFetch }) => {
  const { id } = useParams();
  const [isAdded, setAdded] = useState(false);

  useEffect(() => {
    const indexTeams = getTeams().findIndex(
      (team) => team.users.includes(user.uid) && team.id === id,
    );
    const indexIU = getInviteUsers().findIndex(
      (iu) => iu.uid === user.uid && iu.teamID === id,
    );

    indexTeams !== -1 ? setAdded(true) : null;
    indexIU !== -1 ? setAdded(true) : null;
  }, [id, isReFetch]);

  return (
    <ListItem disablePadding>
      <ListItemText primary={user.displayName} />
      {!isAdded ? (
        <ListItemIcon sx={{ minWidth: 35 }}>
          <AddBox onClick={() => inviteUser(user.uid)} cursor={`pointer`} />
        </ListItemIcon>
      ) : null}
    </ListItem>
  );
};

export default InviteUser;
