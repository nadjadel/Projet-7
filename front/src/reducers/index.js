import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import posts from "./post";
import contacts from "./contact";

export default combineReducers({
  auth,
  message,
  posts,
  contacts
});
