import React, { useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import { Input, Typography, CircularProgress, Hidden } from "@mui/material";
import { Box } from "@mui/system";
import WhoToFollow from "../WhoToFollow/who-to-follow.component";
import DummyWhoToFollow from '../DummyWhoToFollow/dummy_who-to-follow.component';
import { QUERY_USERS_LIST } from "../../utils/queries";
import { useQuery } from '@apollo/client';

const RightSidebar = () => {

  const [searchText, setSearchText] = useState<string>("")
  const { loading, error, data } = useQuery(QUERY_USERS_LIST, {
    variables: { handle: searchText },
  });
  if (data) {
    var { usersList } = data;
    var usersArray: Array<{
      id: string,
      handle: string,
      avatar: string,
      isActive: string
    }> | undefined = usersList
  }


  return (
    <Hidden lgDown>
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
              minHeight: '600px'
            }}
          >
            <Typography variant="h6" textAlign='center' sx={{ fontWeight: "bold" }}>
              Who to follow
            </Typography>
            {(searchText && usersArray) && (
              usersArray.map((user) => <WhoToFollow key={user.id} id={user.id} handle={user.handle} avatar={user.avatar} isActive={user.isActive} />)
            )}
            {(!searchText) && (
              <>
                <DummyWhoToFollow />
                <DummyWhoToFollow />
                <DummyWhoToFollow />
                <DummyWhoToFollow />
                <DummyWhoToFollow />
                <DummyWhoToFollow />
                <DummyWhoToFollow />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Hidden>

  );
}

export default RightSidebar;