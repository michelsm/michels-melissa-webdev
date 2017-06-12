var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    _user : {type: mongoose.Schema.ObjectId, ref: "UserModel", required: true},
    name: String,
    description: String,
    // To Do Array of Page references
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "website"});
module.exports = websiteSchema;