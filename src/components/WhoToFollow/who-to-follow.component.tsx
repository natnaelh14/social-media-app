import { Typography, useTheme } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";

type userProps = {
  id: string,
  handle: string,
  avatar: string,
  isActive: string
};

const WhoToFollow = ({ id, handle, avatar, isActive }: userProps) => {
  const theme = useTheme();
  return (
    <Box margin="1rem 0">
      <Grid container alignItems="center">
        <Grid item sx={{ paddingRight: "12px" }}>
          <NavLink to={`/home/profile/${id}`}>
            <img src={avatar} width="50px" alt="logo" />
          </NavLink>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                {handle}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  background: "#ccc",
                  borderRadius: theme.shape.borderRadius,
                  padding: "0 6px",
                  color: "#777",
                }}
              >
                follows you
              </Typography>
              <Button
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  mt: "4px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                Follow
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WhoToFollow
