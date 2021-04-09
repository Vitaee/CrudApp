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


module.exports = User;
