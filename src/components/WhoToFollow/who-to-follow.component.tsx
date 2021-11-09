import { Typography, useTheme } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function WhoToFollow() {
  const theme = useTheme();
  return (
    <Box margin="1rem 0">
      <Grid container alignItems="center">
        <Grid item sx={{ paddingRight: "12px" }}>
          <img src="https://res.cloudinary.com/doalzf6o2/image/upload/v1635983850/hero-image_yccwx5.png" width="50px" alt="logo" />
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                Jane Doe
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                  jane_doe
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
              </Box>
            </Grid>
            <Grid item>
              <Button
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  ml: "12px",
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