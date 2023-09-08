import React, { useEffect, useState } from "react";
import { Backdrop, Box, Fade, List, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToInviteUsers } from "../utils/localStorage.js";
import { getUsers } from "../redux/users/usersThunks.js";
import InviteUser from "./InviteUser.jsx";

const UsersInviteModal = ({ teamID, teamName, isUIMOpen, setUIMOpen }) => {
  const { users } = useSelector((store) => store.usersSlice);
  const dispatch = useDispatch();

  const inviteUser = (uid) => {
    addToInviteUsers({ uid, teamID, teamName });
    toast.success(`Invitation successful!`);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Modal
      open={isUIMOpen}
      onClose={() => setUIMOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isUIMOpen}>
        <Box
          position={`absolute`}
          top={`50%`}
          left={`50%`}
          bgcolor={`#fff`}
          width={{ xs: `13rem`, sm: `16rem` }}
          p={5}
          borderRadius={3}
          boxShadow={20}
          sx={{
            transform: `translate(-50%, -50%)`,
          }}
        >
          <List>
            {users.map((user) => (
              <InviteUser
                key={`user.uid`}
                user={user}
                inviteUser={inviteUser}
              />
            ))}
          </List>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UsersInviteModal;
