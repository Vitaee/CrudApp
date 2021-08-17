import axios from "axios";

const API_URL = "http://localhost:4000/";

class AddPost{

    addpost(title,content, createdBy, img){
        console.log(title)
        console.log()
        console.log(img)
        console.log()
        var name = img.name

        return axios.post(API_URL + "post", {
            title,
            content,
            createdBy,
            img
        })
            .then(response => {
                return response.data;
            })

    }
}

export default new AddPost();