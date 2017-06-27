var mongoose = require('mongoose');
var foodieUserSchema = mongoose.Schema({
    username:  {type: String, required: true},
    password:  {type: String, required: true},
    firstName: {type: String},
    lastName:  {type: String},
    email:     {type: String},
    phone: String,
    profileUrl: String,
    profileImg: String,
    covercolor: String,
    facebook: {
        id:    String,
        token: String
    },

    roles: [{type: String, default:'USER', enum: ['USER', 'ADMIN']}],

    _pins: [
        {type: mongoose.Schema.Types.Object}
    ],

    _following: [
        {type: mongoose.Schema.Types.Object}
    ],

    _reviews: [
        {type: mongoose.Schema.Types.Object}
    ],

    // need to add comments

    dateCreated: {type: Date, default: Date.now()}
}, {collection: "foodieUser"});
module.exports = foodieUserSchema;