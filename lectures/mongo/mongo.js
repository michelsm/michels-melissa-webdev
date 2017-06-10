var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/webdev_summer1_2017");
mongoose.Promise = require('q').Promise;

todoSchema = mongoose.Schema({
    title: String,
    dueDate: Date
}, {collection: 'todo' });


todoModel = mongoose.model('TodoModel', todoSchema);

todoModel.findAllTodos = findAllTodos;
todoModel.createTodo = createTodo;

modules.export = todoModel;


function findAllTodos() {
    return todoModel.find()
}

/*
createTodo({title: "do hw", date: new Date()})
    .then(function (todo) {
        console.log(todo);
        return findAllTodos();
    })
    .then(function (todos) {
        console.log(todos);
    });
*/

function createTodo(todo) {
    return todoModel.create(todo)
}


/*
var todo1 = {
    title: "pick up milk",
    dueDate: new Date()
};


todoModel
    .create(todo1)
    .then(function (doc) {
        console.log(doc);
    }, function (err) {
        console.log(err);
    });
*/
