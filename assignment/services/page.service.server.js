var app = require('../../express');


app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/assignment/page/:pageId", findPageById);
app.post("/api/assignment/website/:websiteId/page", createPage);
app.delete("/api/assignment/page/:pageId", deletePage);
app.put("/api/assignment/page/:pageId", updatePage);


var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "345", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];



function findAllPagesForWebsite(req, res) {
    var resultSet = [];
    for(var p in pages) {
        if(pages[p].websiteId === req.params['websiteId']) {
            resultSet.push(pages[p]);
        }
    }
    res.json(resultSet);
}


function findPageById(req, res) {
    var pageId = req.params['pageId'];

    var page = pages.find(function (page) {
        return page._id === pageId;
    });

    res.send(page);
}


function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.send(page);
}


function deletePage(req, res) {
    var pageId = req.params['pageId'];
    for(var p in pages) {
        if(pageId === pages[p]._id) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];
    for (var p in pages) {
        if(pageId === pages[p]._id) {
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}