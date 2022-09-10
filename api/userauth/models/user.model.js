import { Schema as _Schema, model } from "mongoose";
var Schema = _Schema;


var User = new Schema({
    username: {
        type:String,
        unique:false,
        required:true
    },
    email: { type: String, unique: true },
    password: String,
  },{timestamps:true});


export const userModel = model('User', User);
