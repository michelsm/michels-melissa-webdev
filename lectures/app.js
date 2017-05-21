/**
 * Created by melissamichels on 5/11/17.
 */


// This is the server side of the firstAngular application : The Todo App
// Not competing with other libraries here -- thus, we dont have to use the iify
// design pattern


// Nodes mechinism allow you to have one module talking to another module
/*
module.exports = {
    message: 'hello',
    sayHello: function() {
        console.log('Hello World!')
    }
}

console.log('hello from app.js on the server side');
*/


module.exports = function (app) {

    var todos = [
        {title: 'todo 1', details: 'details 123'},
        {title: 'todo 1', details: 'details 456'},
        {title: 'todo 1', details: 'details 789'}
    ];


    app.delete('/api/todo/:index', function (res, req) {
        todos.splice(req.params.index, 1);
        res.json(todos);
    });

    app.get('/api/todo', function (req, res) {
       res.json(todos);
    });


    // if you have objects or classes that are related to each other,
    // and you want to be able to traverse the dataspace
    // this notation allows us to map a mechanism to navigate the heirarchy
    app.get('/api/todo/:index', function (req, res) {
        var index = req.params['index'];
        res.send(todos[index]);
    });

};