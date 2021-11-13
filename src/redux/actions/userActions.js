import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from '../constants/userConstants';

export const listUsers = (data) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      });
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };