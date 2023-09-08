import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AddBox } from "@mui/icons-material";

const InviteUser = ({ user }) => {
  return (
    <ListItem disablePadding>
      <ListItemText primary={user.displayName} />
      <ListItemIcon sx={{ minWidth: 35 }}>
        <AddBox onClick={() => inviteUser(user.uid)} cursor={`pointer`} />
      </ListItemIcon>
    </ListItem>
  );
};

export default InviteUser;
