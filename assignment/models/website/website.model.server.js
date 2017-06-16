/**
 * Created by melissamichels on 6/11/17.
 */

var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.addToPages = addToPages;
websiteModel.removeFromPages = removeFromPages;

module.exports = websiteModel;


function createWebsite(website) {
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel.addToWebsites(website._user, website._id);
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findOne({_id: websiteId});
}

function deleteWebsite(websiteId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function(website) {
            userId = website._user;
            return websiteModel
                .remove({_id : websiteId})
                .then(function(status) {
                    return userModel
                        .removeFromWebsites(userId, websiteId);
                })
        });
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {
        $set : {
            name: website.name,
            description: website.description
        }
    });
}


function addToPages(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function(website) {
            website._pages.push(pageId);
            return website.save();
        });
}


function removeFromPages(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function(website) {
            var index = website._pages.indexOf(pageId);
            website._pages.splice(index, 1);
            return website.save();
        });
}