import React from "react";
import { Backdrop, Box, Fade, Grid, Modal, Typography } from "@mui/material";
import { Article } from "@mui/icons-material";

const TaskViewModal = ({ isTVMOpen, setTVMOpen, viewTask }) => {
  const { title, description } = viewTask ?? {};

  return (
    <Modal
      open={isTVMOpen}
      onClose={() => setTVMOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isTVMOpen}>
        <Box
          position={`absolute`}
          top={`50%`}
          left={`50%`}
          bgcolor={`#fff`}
          width={{ xs: `13rem`, sm: `26rem` }}
          p={5}
          borderRadius={3}
          boxShadow={20}
          sx={{
            transform: `translate(-50%, -50%)`,
          }}
        >
          <Grid container direction={`column`}>
            <Grid item paddingBottom={3}>
              <Typography
                component={`h4`}
                sx={{
                  "&::after": {
                    content: `""`,
                    display: `table`,
                    clear: `both`,
                  },
                }}
              >
                <Article sx={{ float: `left` }} />
                <Typography component={`span`} fontWeight={`600`}>
                  {title}
                </Typography>
              </Typography>
            </Grid>
            <Grid item maxHeight={200} overflow={`auto`}>
              <Typography>{description}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TaskViewModal;
