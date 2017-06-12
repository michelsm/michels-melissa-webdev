var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    // TODO: NEED TO ADD LIST OF WEBSITES
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "user"});
module.exports = userSchema;