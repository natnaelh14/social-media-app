import { SET_CURRENT_USER, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../constants/userConstants";

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return { loading: true, posts: [] };
      case USER_LIST_SUCCESS:
        return {
          loading: false,
          users: action.payload.users,
        };
      case USER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const currentUserReducer = (state = { user: null }, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          user: action.payload
        };
      default:
        return state;
    }
  };