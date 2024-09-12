import { useMutation, useQuery } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import noAvatar from "../../img/no-avatar.png";
import { userProps } from "../../index.types";
import { ADD_POST, UPDATE_USER_PROFILE } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import AddPostLoading from "./add_post_loading.component";

const moods = [
  { value: "HAPPY", icon: "😀" },
  { value: "SAD", icon: "😔" },
  { value: "EXCITED", icon: "😃" },
  { value: "AMUSED", icon: "🙂" },
  { value: "OPTIMISTIC", icon: "😊" },
  { value: "FRUSTRATED", icon: "😩" },
];

type postProps = {
  refetchPosts: () => void;
};

const AddPost = ({ refetchPosts }: postProps) => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const { user, loading } = currentUser;
  const userInfo: userProps = user;

  const {
    error: userError,
    loading: userLoading,
    data: userData,
    refetch: userRefetch,
  } = useQuery(QUERY_USER, {
    variables: {
      id: userInfo.id,
    },
  });

  const [postText, setPostText] = useState("");
  const [mood, setMood] = useState<string>(userData?.userProfile?.status);
  const [addPost, {}] = useMutation(ADD_POST);
  const [updateProfile, {}] = useMutation(UPDATE_USER_PROFILE);

  const handleAddPost = async () => {
    try {
      await addPost({
        variables: {
          user_id: userInfo.id,
          text: postText,
        },
      }).then(() => {
        refetchPosts();
      });
      setPostText("");
    } catch (e) {
      return e;
    }
  };

  const handleChangeMood = async (mood: string) => {
    try {
      setMood(mood);
      await updateProfile({
        variables: {
          ...userData?.userProfile,
          status: mood,
        },
      });
    } catch (e) {
      throw new Error("Unable to Update Profile");
    }
  };

  return (
    <>
      {userLoading || userError ? (
        <AddPostLoading />
      ) : (
        <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
          <Grid>
            <Grid item sx={{ paddingRight: "1rem" }}>
              <Avatar
                alt="user-image"
                style={{ width: "50px", height: "50px" }}
                src={
                  userData?.userProfile?.avatar
                    ? userData?.userProfile?.avatar
                    : noAvatar
                }
              />
            </Grid>
            <Grid item>
              <Box padding=".5rem 0">
                <Textarea
                  placeholder="What's new in Crypto World?"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
              </Box>
              <Box paddingBottom=".5rem" paddingTop=".8rem">
                <Box textAlign="left">
                  <Select
                    onValueChange={handleChangeMood}
                    value={mood}
                    defaultValue={mood}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="How are you feelin!" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="sr-only">Mood</SelectLabel>
                        {moods.map((mood) => {
                          return (
                            <SelectItem key={mood.value} value={mood.value}>
                              {mood.value}
                              {mood.icon}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Box>
                <Box textAlign="right">
                  <Button
                    onClick={handleAddPost}
                    disabled={postText.length === 0}
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      fontFamily: "inherit",
                      borderRadius: "12px",
                      fontSize: "12px",
                      mt: "4px",
                      background: "black",
                      "&:hover": {
                        background: "#333",
                      },
                    }}
                  >
                    POST
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default AddPost;
