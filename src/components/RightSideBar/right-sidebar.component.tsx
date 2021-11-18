import { Search } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Input, Typography } from "@mui/material";
import { Box } from "@mui/system";
import WhoToFollow from "../WhoToFollow/who-to-follow.component";

const RightSidebar = () => {
  

  return (
    <Box sx={{ height: "100vh" }}>
      <Box paddingTop="10px">
        <Box
          width="100%"
          borderRadius="28px"
          border="1px solid #eee"
          sx={{
            background: "#eee",
            "&:hover": {
              background: "white",
            },
          }}
        >
          <Input
            type="text"
            inputProps={{
              style: { padding: "10px" },
            }}
            disableUnderline
            fullWidth
            placeholder="Search User"
            startAdornment={
              <Search
                sx={{
                  paddingLeft: "30px",
                  color: "#777",
                }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            background: "#eee",
            borderRadius: "28px",
            padding: "10px 20px",
            margin: "1rem 0",
          }}
        >
          <Typography variant="h6" textAlign='center' sx={{ fontWeight: "bold" }}>
            Who to follow
          </Typography>
          <WhoToFollow />
          <WhoToFollow />
          <WhoToFollow />
          <WhoToFollow />
          <WhoToFollow />
        </Box>
      </Box>
    </Box>
  );
}

export default RightSidebar;