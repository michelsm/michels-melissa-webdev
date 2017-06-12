/**
 * Created by melissamichels on 6/11/17.
 */

var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel  = mongoose.model('PageModel', pageSchema);


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
    return pageModel.create(page);
}

function findPageById(pageId) {
    return pageModel.findOne({_id: pageId});
}

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {
        $set : {
            name: page.name,
            description: page.description
        }
    });
}