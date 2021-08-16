const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Post = new Schema({
    title: {
        type:String,
        unique:false,
        required:true
    },
    content: String,
    img: String,
    createdBy: String,
  },{timestamps:true});


let postModel = mongoose.model('Post', Post);
module.exports = postModel;
