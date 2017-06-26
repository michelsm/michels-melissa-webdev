var mongoose = require('mongoose');
var foodieUserSchema = require('./user.schema.server');
var bcrypt = require("bcrypt-nodejs");

var foodieUserModel = mongoose.model('foodieUserModel', foodieUserSchema);

// declarations here
foodieUserModel.findUserByUsername = findUserByUsername;
foodieUserModel.createUser = createUser;
foodieUserModel.findUserById = findUserById;
foodieUserModel.findUserByCredentials = findUserByCredentials;
foodieUserModel.deleteUser = deleteUser;
foodieUserModel.updateUser = updateUser;
foodieUserModel.findUserByFacebook = findUserByFacebook;
foodieUserModel.addToPins = addToPins;
foodieUserModel.removeFromPins = removeFromPins;
foodieUserModel.findAllUsersByFirstName = findAllUsersByFirstName;
foodieUserModel.follow = follow;

module.exports = foodieUserModel;


function findUserByFacebook(facebookId) {
    return foodieUserModel.findOne({'facebook.id': facebookId});
}


function findUserByUsername(username) {
    return foodieUserModel.findOne({username: username});
}


function createUser(user) {

    console.log("In create user user model");
    user.password = bcrypt.hashSync(user.password);
    return foodieUserModel.create(user);
}

function findUserById(userId) {
    return foodieUserModel.findById(userId);
}

function findUserByCredentials(username, password) {
    return foodieUserModel
        .findOne({username: username})
        .then(function(user) {
            if (user && password === user.password || user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                return null;
            }
        });
}

function deleteUser(userId) {
    return foodieUserModel.remove({_id: userId});
}

function updateUser(userId,user) {
    return foodieUserModel.update({_id: userId}, {
        $set : {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password,
            profileUrl: user.profileUrl,
            phone: user.phone,
            profileImg: user.profileImg,
            covercolor: user.covercolor
        }
    });
}

function addToPins(userId, match) {

    console.log("got to the user model");

    return foodieUserModel
        .findUserById(userId)
        .then(function (user) {
            user._pins.push(match);
            return user.save();
        });
}

function follow(userId, user) {

    return foodieUserModel
        .findUserById(userId)
        .then(function (userFound) {

            userFound._following.push(user);
            return userFound.save();
        });
}

function removeFromPins(userId, match) {

    var recipeId = match.id;

    return foodieUserModel
        .findUserById(userId)
        .then(function (user) {
            var index = user._pins.indexOf(recipeId);
            user._pins.splice(index, 1);
            return user.save();
        });
}

function findAllUsersByFirstName(firstName) {

    return foodieUserModel.findOne({firstName: firstName});
}