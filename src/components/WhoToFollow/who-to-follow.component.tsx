import { Typography, useTheme } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function WhoToFollow() {
  const theme = useTheme();
  return (
    <Box margin="2rem" padding='1rem'>
      <Grid container alignItems="center">
        <Grid item >
          <img src="https://res.cloudinary.com/doalzf6o2/image/upload/v1637122383/photo-03_dzsekt.png" width="50px" alt="logo" />
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                Jane Doe
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
}