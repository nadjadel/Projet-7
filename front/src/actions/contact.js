import {
    GET_CONTACT_SUCCESS,
    GET_CONTACT_FAIL,
    SET_MESSAGE
      } from "./types";
    import AuthService from "../services/auth.service";
    
    export const getContacts=(id)=>(dispatch)=>{
        return AuthService.getContact(id).then(
            (response)=>{
                dispatch({
                    type: GET_CONTACT_SUCCESS,
                    payload:response.data
                });
    
                return Promise.resolve()
            },
            (error)=>{
                const message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
        
              dispatch({
                type: GET_CONTACT_FAIL,
              });

              dispatch({
                type:SET_MESSAGE,
                payload:message
              })
        
              
              return Promise.reject();
            }
        )
    }
    
    