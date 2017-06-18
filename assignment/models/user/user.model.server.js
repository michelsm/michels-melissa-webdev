var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var bcrypt = require("bcrypt-nodejs");

var userModel = mongoose.model('UserModel', userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.findUserByUsername = findUserByUsername;
userModel.updateUser = updateUser;
userModel.addToWebsites = addToWebsites;
userModel.removeFromWebsites = removeFromWebsites;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;

function createUser(user) {
    user.password = bcrypt.hashSync(user.password);
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByCredentials(username, password) {
    //return userModel.findOne({username: username, password: password});
    return userModel
        .findOne({username: username})
        .then(function(user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                return null;
            }
        });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {
        $set : {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        }
    });
}

function addToWebsites(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._websites.push(websiteId);
            return user.save();
        });
}

function removeFromWebsites(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._websites.indexOf(websiteId);
            user._websites.splice(index, 1);
            return user.save();
        });
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}