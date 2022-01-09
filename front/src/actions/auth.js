import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  SET_ISACTIVE,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (firstName,lastName,avatar, email, password) => (dispatch) => {
  return AuthService.register(firstName,lastName,avatar, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const isActive=(id,action)=> (dispatch)=>{
  AuthService.setAccount(id,action).then((data) => {
    dispatch({
      type: SET_ISACTIVE,
      payload: { isActive: action },
    });
  let userToModify= JSON.parse(localStorage.getItem('user'))
  userToModify={
      ...userToModify,
      isActive: action,
    };
    localStorage.setItem('user',JSON.stringify(userToModify))
    return Promise.resolve();
  })
}
