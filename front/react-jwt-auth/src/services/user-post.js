import axios from "axios";

const API_URL = "http://localhost:4000/";

class AddPost{

    addpost(title, content,createdBy){
        return axios.post(API_URL + "create-post", {
            title,
            content,
            createdBy
        })
            .then(response => {
                return response.data;
            })

    }
}

export default new AddPost();