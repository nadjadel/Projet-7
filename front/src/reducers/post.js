import {
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,

      } from "../actions/types";


      const initialState = {
          posts: []
      }

      export default function postReducer(state = initialState, action) {
        const { type, payload } = action;
      
        switch (type) {
          case GET_POSTS_SUCCESS:
            return {
              ...state,
              posts:payload,
            };
          case GET_POSTS_FAIL:
            return {
              ...state,
              posts: [],
            };
          
          default:
            return state;
        }
      }
      