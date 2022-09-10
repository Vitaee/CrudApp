import * as mongoose from "mongoose"

var Schema = mongoose.Schema;
var herosSchema = new Schema({
    name :{
        type: String,
        unique : false,
        required : true
    },
    description : {
        type: String,
        unique : false,
        required : true
    }
}, {
    timestamps: true
});

export default herosSchema;