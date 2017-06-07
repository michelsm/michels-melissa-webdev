var app = require('../../express');


app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.post('/api/assignment/user/:userId/website', createWebsite);


var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];


function findAllWebsitesForUser(req, res) {
    var resultSet = [];
    for(var w in websites) {
        if(websites[w].developerId === req.params['userId']) {
            resultSet.push(websites[w]);
        }
    }
    res.json(resultSet);
}


function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    for(var w in websites) {
        if(websiteId === websites[w]._id) {
            websites.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}



function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });

    res.send(website);
}


function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];
    for (var w in websites) {
        if(websiteId === websites[w]._id) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.send(website);
}