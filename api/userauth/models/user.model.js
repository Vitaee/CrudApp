import { Schema, model } from "mongoose";


var User = new Schema({
    username: {
        type:String,
        unique:true,
        required:true,
    },
    email: { type: String, unique: true },
    password: String,
    roles: {
        type: [String],
        default: ["user"]
    },

  },{timestamps:true});


export const userModel = model('User', User);
