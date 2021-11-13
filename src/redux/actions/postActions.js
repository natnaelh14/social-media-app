import { POST_LIST_FAIL, POST_LIST_REQUEST, POST_LIST_SUCCESS } from "../constants/postConstants";
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from "../../utils/queries";

export const listPosts = (data) => async (
    dispatch,
  ) => {
    console.log('listPost called with',{data})
    try {
      dispatch({ type: POST_LIST_REQUEST });
  
      dispatch({
        type: POST_LIST_SUCCESS,
        payload: data,
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