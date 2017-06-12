var app = require('../../express');

var pageModel = require('../models/page/page.model.server');

app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/assignment/page/:pageId", findPageById);
app.post("/api/assignment/website/:websiteId/page", createPage);
app.delete("/api/assignment/page/:pageId", deletePage);
app.put("/api/assignment/page/:pageId", updatePage);

/*
var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "345", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];
*/



function findAllPagesForWebsite(req, res) {

    pageModel
        .findAllPagesForWebsite(req.params.websiteId)
        .then(function (pages) {
            res.json(pages);
        });
}


function findPageById(req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
}


function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    console.log("websiteId = " +req.params.websiteId);
    page._website = websiteId;

    pageModel
        .createPage(page)
        .then(function (page) {
            res.json(page);
        });
}


function deletePage(req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .deletePage(pageId)
        .then(function (status) {
            res.sendStatus(200);
        });
}


function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.sendStatus(200);
        });
}