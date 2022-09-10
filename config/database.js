import mongoose from 'mongoose';

//require chalk module to give colors to console text
import chalk from 'chalk';

//require database URL from properties file
import { DB_URL} from '../config/properties.js';

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;


//export this function and imported by server.js
export const db = () => {

    mongoose.connect(DB_URL,{useNewUrlParser: true ,
        useUnifiedTopology: true,
    autoIndex: true,});

    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", DB_URL));
    });

    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}