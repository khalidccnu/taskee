import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Backdrop, Box, Button, Fade, Grid, Modal } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import NewTeam from "./NewTeam.jsx";
import NewTask from "./NewTask.jsx";

const NewItemModal = () => {
  const theme = useTheme();
  const { isNIMOpen, setNIMOpen } = useOutletContext();
  const [isTeam, setTeam] = useState(false);
  const [isTask, setTask] = useState(false);

  return (
    <Modal
      open={isNIMOpen}
      onClose={() => {
        setNIMOpen(false);
        setTeam(false);
        setTask(false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isNIMOpen}>
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
          {isTeam || isTask ? (
            isTeam ? (
              <NewTeam setTeam={setTeam} />
            ) : (
              <NewTask setTask={setTask} />
            )
          ) : (
            <Grid container gap={1} justifyContent={`center`}>
              <Grid item>
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
                  onClick={() => setTeam(true)}
                >
                  Team
                </Button>
              </Grid>
              <Grid item>
                <Button
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
                  onClick={() => setTask(true)}
                >
                  Task
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewItemModal;
