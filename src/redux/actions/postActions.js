import { POST_LIST_FAIL, POST_LIST_REQUEST, POST_LIST_SUCCESS } from "../constants/postConstants";
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from "../../utils/queries";

export const listPosts = () => async (
    dispatch,
  ) => {
    try {
      dispatch({ type: POST_LIST_REQUEST });
      const { error, data, loading } = useQuery(QUERY_POSTS, {
        variables: {
          postsUserId: 1
        }
      })
  
      dispatch({
        type: POST_LIST_SUCCESS,
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: POST_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };