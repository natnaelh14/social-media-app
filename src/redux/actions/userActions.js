import {
  SET_CURRENT_USER,
} from "../constants/userConstants";

export const setCurrentUser = (user) => async(dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};
