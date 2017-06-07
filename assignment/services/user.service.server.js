var app = require('../../express');

app.get    ('/api/assignment/user/:userId', findUserById);
app.get    ('/api/assignment/user', findUserByCredentials);
app.get    ('/api/assignment/register/user', findUserByUsername);
app.post   ('/api/assignment/user', createUser);
app.put    ('/api/assignment/user/:userId', updateUser);
app.delete ('/api/assignment/user/:userId', deleteUser);

var users =
    [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  , email: "alice@gmail.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , email: "bob@gmail.com"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  , email: "charley@gmail.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" , email: "jose@gmail.com"}
    ];


function findUserById(req, res) {

    var userId = req.params['userId'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}


function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    for(var u in users) {
        var user = users[u];
        if( user.username === username &&
            user.password === password) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);

}

function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.send(user);
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    for (var u in users) {
        if(userId === users[u]._id) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    for(var u in users) {
        if(userId === users[u]._id) {
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserByUsername(req, res) {
    var username = req.query['username'];

    for(var u in users) {
        var user = users[u];
        if( user.username === username) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);
}