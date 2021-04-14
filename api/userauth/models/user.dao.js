const mongoose = require('mongoose');
const userSchema = require('./user.model');

let userModel = mongoose.model('User', userSchema);
module.exports = userModel;