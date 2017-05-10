/**
 * Created by melissamichels on 5/10/17.
 */

// one way to guard against overriding elements from other scripts
/*
function ewq() {
    var x = 123;
}
*/


// Imbed in an expression that self executes and not named
(function() { // IIFE
    angular
        .module("TodoApp", [])
        .controller("TodoListController", TodoListController);

    function TodoListController($scope) { // $scope is an obj oriented way to talk to the view

        $scope.todo = {title: "initial title"}; // toodo object treated as a pointer
        $scope.addTodo = addTodo;
        $scope.removeTodo = removeTodo;
        $scope.todos = [];

        function removeTodo(index) {
            $scope.todos.splice(index, 1);
        }

        function addTodo(todo) {

            var newTodo = {
              title: todo.title
            };
            console.log(newTodo);
            $scope.todos.push(newTodo); // adds the toodo to the array
        }
    }

})();