import axios from "axios";

const API_URL = "http://localhost:4000/auth";

class AuthService{
    login(username,password){
        return axios
            .post(API_URL + "/signin",{
                username,
                password
            })
            .then(response =>{
                if (response.data.accessToken){
                    localStorage.setItem("user",JSON.stringify(response.data));
                }
                return response.data;
            })
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }

    logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();