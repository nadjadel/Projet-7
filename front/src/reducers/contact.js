import {
    GET_CONTACT_SUCCESS,
    GET_CONTACT_FAIL
  } from "../actions/types";
  
  const initialState = { contacts:[] }
  
  export default function contactReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CONTACT_SUCCESS:
        return {
          ...state,
          contacts:payload
        };
      case GET_CONTACT_FAIL:
        return {
          ...state,
          contacts: [],
        };
     
      default:
        return state;
    }
  }
  