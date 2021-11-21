import { Typography, useTheme } from "@mui/material";
import { Button, Grid, Link } from "@mui/material";
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
    <Box margin="2rem" padding='1rem'>
      <Grid container alignItems="center" >
        <Grid item style={{ display: 'flex', alignItems: 'center'}}>
          <NavLink to={`/home/profile/${id}`}>
            <img src={avatar} alt="logo" width="50px" />
          </NavLink>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                {handle}
              </Typography>
              <Box >
                <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                  @janedoe
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    background: "#ccc",
                    borderRadius: theme.shape.borderRadius,
                    color: "#777",
                    marginTop: "10px",
                    marginBottom: "10px",
                    paddingRight: '1px',
                    paddingLeft: '1px'
                  }}
                >
                  follows you
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Button
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
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
};

export default WhoToFollow;