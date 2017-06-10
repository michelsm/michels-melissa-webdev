var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    // TODO: NEED TO ADD LIST OF WEBSITES
    dateCreated: Date
}, {collection: "user"});
module.exports = userSchema;