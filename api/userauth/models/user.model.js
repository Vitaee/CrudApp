const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var User = new Schema({
    username: {
        type:String,
        unique:false,
        required:true
    },
    email: String,
    password: String,
  },{timestamps:true});


let userModel = mongoose.model('User', User);
module.exports = userModel;
