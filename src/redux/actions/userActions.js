import axios from 'axios';
import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from '../constants/userConstants';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from "../../utils/queries";


/**
 * listUsers = function(){
 *  return function(dispatch){
 *    try{
 *      dispatch...........
 *      }
 * }
 * }
 * @returns 
 */
export const listUsers = () => async (dispatch) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      });
      const { error, data, loading } = useQuery(QUERY_USERS);
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