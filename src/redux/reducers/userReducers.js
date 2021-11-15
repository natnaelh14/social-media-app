import { SET_CURRENT_USER } from "../constants/userConstants";


  export const currentUserReducer = (state = { user: {} }, action) => {
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