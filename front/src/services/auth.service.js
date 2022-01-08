import axios from "axios";

import authHeader from "./auth-header";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = BASE_URL;

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "auth/login", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(data) {
    return axios.post(API_URL + "users", data);
  }

  update(data) {
    return axios.put(API_URL + "users", data,{ headers: authHeader() });
  }

  addContact(contact){
    return axios.post(API_URL+'contact' ,contact, { headers: authHeader() });
  }
  deleteContact(id){
    return axios.delete(API_URL+'contact/'+id, { headers: authHeader() });
  }

  getContact(id){
    return axios.get(API_URL+'contact/'+id , { headers: authHeader() });
  }
  setAccount(id,action){
   const accountToSuspend={
      id:id,
      isActive:action
    }
    return axios.put(API_URL + "users", accountToSuspend,{ headers: authHeader() });
  }
}

export default new AuthService();
