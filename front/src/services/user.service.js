import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/posts/";

class UserService {
  getPost() {
    return axios.get(API_URL ,{ headers: authHeader() });
  }

  addPost(post) {
    return axios.post(API_URL ,post, { headers: authHeader() });
  }

  addComment(comment) {
    return axios.post(API_URL+comment.postId+'/comment' ,comment, { headers: authHeader() });
  }

  addLike(like) {
    return axios.post(API_URL+like.postId+'/like' ,{userId:like.userId}, { headers: authHeader() });
  }
  deleteLike(id){
    return axios.delete(API_URL+'like/'+id , { headers: authHeader() });
  }
  
  deletePost(post){
    return axios.put(API_URL+post,{isVisible:false} ,{ headers: authHeader() });
  }
  deleteComment(comment){
    return axios.delete(API_URL+'comment/'+comment, { headers: authHeader() });
  }
}

export default new UserService();
