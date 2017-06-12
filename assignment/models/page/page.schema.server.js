/**
 * Created by melissamichels on 6/11/17.
 */

var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteModel", required: true},
    name: String,
    title: String,
    description: String,
    // TO DO array of widgets
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "page"});

module.exports = pageSchema;