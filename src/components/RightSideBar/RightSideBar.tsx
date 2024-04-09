import { useQuery } from "@apollo/client";
import { Search } from "@mui/icons-material";
import { Hidden, Input } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { userProps } from "../../index.types";
import {
  QUERY_USERS_LIST,
  QUERY_WHO_TO_FOLLOW_USERS,
} from "../../utils/queries";
import WhoToFollow from "../WhoToFollow/who-to-follow.component";
import WhoToFollowLoading from "../WhoToFollow/who_to_follow_loading.component";

const RightSidebar = () => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const {
    error: currentUserError,
    loading: currentUserLoading,
    user,
  } = currentUser;
  const userInfo: userProps = user;
  const {
    error: whoToFollowError,
    loading: whoToFollowLoading,
    data: whoToFollowData,
    refetch: whoToRefetch,
  } = useQuery(QUERY_WHO_TO_FOLLOW_USERS, {
    variables: { id: userInfo.id },
  });

  const [searchText, setSearchText] = useState<string>("");
  const {
    loading: userListLoading,
    error: userLostError,
    data,
    refetch,
  } = useQuery(QUERY_USERS_LIST, {
    variables: { handle: searchText },
  });
  if (data) {
    const { usersList } = data;
    var usersArray:
      | Array<{
          id: string;
          handle: string;
          avatar: string;
          isActive: string;
        }>
      | undefined = usersList;
  }

  const pending =
    userListLoading ||
    userLostError ||
    whoToFollowError ||
    whoToFollowLoading ||
    currentUserError ||
    currentUserLoading;

  return (
    <Hidden lgDown>
      <Box sx={{ height: "100vh" }}>
        <Box paddingTop="10px">
          <Box
            width="100%"
            borderRadius="28px"
            sx={{
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
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
              padding: "10px 20px",
              margin: "1rem 0",
              minHeight: "600px",
            }}
          >
            <h2>Who to follow</h2>
            {pending && (
              <>
                <WhoToFollowLoading />
                <WhoToFollowLoading />
                <WhoToFollowLoading />
                <WhoToFollowLoading />
              </>
            )}
            <div style={{ overflowY: "scroll" }}>
              {searchText &&
                usersArray &&
                usersArray.map((user) => (
                  <WhoToFollow
                    key={user.id}
                    id={user.id}
                    handle={user.handle}
                    avatar={user.avatar}
                    isActive={user.isActive}
                    userRefetch={refetch}
                    whoToRefetch={whoToRefetch}
                  />
                ))}
              {!searchText &&
                whoToFollowData &&
                whoToFollowData?.whoToFollowUsers.map((user: any) => {
                  return (
                    <WhoToFollow
                      key={user.id}
                      id={user.id}
                      handle={user.handle}
                      avatar={user.avatar}
                      isActive={user.isActive}
                      userRefetch={refetch}
                      whoToRefetch={whoToRefetch}
                    />
                  );
                })}
            </div>
          </Box>
        </Box>
      </Box>
    </Hidden>
  );
};

export default RightSidebar;
