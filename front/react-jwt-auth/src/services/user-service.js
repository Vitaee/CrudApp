import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/"

class UserService{
    getUserBoard(){
        return axios.get(API_URL + 'user',{headers:authHeader()});
    }
    getPublicContent() {
    return axios.get(API_URL + 'posts');
  }
}

export default new UserService();