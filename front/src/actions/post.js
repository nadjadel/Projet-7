import {
GET_POSTS_SUCCESS,
GET_POSTS_FAIL,
LOGOUT,
SET_MESSAGE
  } from "./types";
import userService from "../services/user.service";

export const getPost=()=>(dispatch)=>{
    return userService.getPost().then(
        (response)=>{

      const activeUserPost=response.data.filter(x=>x.userId.isActive===true)    
      const sortedPosts = activeUserPost.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      const filteredPosts=sortedPosts.filter(x=>(x.isVisible===true))
            dispatch({
                type: GET_POSTS_SUCCESS,
                payload:filteredPosts
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
            type: GET_POSTS_FAIL,
          });
          
          dispatch({
            type:SET_MESSAGE,
            payload:message
          })
    
    
          dispatch({
            type: LOGOUT
          });
    
          return Promise.reject();
        }
    )
}

