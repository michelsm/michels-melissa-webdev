/**
 * Created by melissamichels on 6/11/17.
 */

var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel  = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../website/website.model.server');


pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;

module.exports = pageModel;


function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

function createPage(page) {
    return pageModel
        .create(page)
        .then(function (page) {
           return websiteModel.addToPages(page._website, page._id);
        });
}

function findPageById(pageId) {
    return pageModel.findOne({_id: pageId});
}

function deletePage(pageId) {
    return pageModel
        .findPageById(pageId)
        .then(function(page) {
            websiteId = page._website;
            return pageModel
                .remove({_id:pageId})
                .then(function(status) {
                    return websiteModel
                        .removeFromPages(websiteId, pageId);
                });
        });

}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {
        $set : {
            name: page.name,
            description: page.description
        }
    });
}