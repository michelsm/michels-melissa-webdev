var app = require('../../../express');

app.get('/api/user/:userId', findUserById);

var users =
    [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  , email: "alice@gmail.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , email: "bob@gmail.com"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  , email: "charley@gmail.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" , email: "jose@gmail.com"}
    ];


function findUserById(req, res) {
    res.send(users);
}