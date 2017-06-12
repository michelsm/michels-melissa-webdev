/**
 * Created by melissamichels on 6/11/17.
 */

var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;

module.exports = websiteModel;


function createWebsite(website) {
    return websiteModel.create(website);
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findOne({_id: websiteId});
}

function deleteWebsite(websiteId) {
    return websiteModel.remove({_id: websiteId});
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {
        $set : {
            name: website.name,
            description: website.description
        }
    });
}