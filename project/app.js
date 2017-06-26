console.log('hello from the project server!');

var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
//mongoose.connect('mongodb://localhost/webdev_assignment');

require('./services/user.service.server');


app.get('/goodbye', sayHello);
app.get('/websites', sendWebsites);

function sendWebsites(req, res) {
    var websites = [
        {name: 'facebook'},
        {name: 'twitter'},
        {name: 'linkedin'}
    ];
    res.send(websites);
}

function sayHello() {
    console.log('hello');
}