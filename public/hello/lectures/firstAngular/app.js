/**
 * Created by melissamichels on 5/10/17.
 */
// This app.js is running on the browser


// one way to guard against overriding elements from other scripts - iify: don't name
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

    function TodoListController($scope, $http) { // $scope is an obj oriented way to talk to the view

        $scope.todo = {title: "initial title", details: "Lorum ipsum"}; // toodo object treated as a pointer
        $scope.todos = [];
        $scope.addTodo = addTodo;
        $scope.removeTodo = removeTodo;
        $scope.selectTodo = selectTodo;
        $scope.updateTodo = updateTodo;

        // only need the relative path because its our same server
        // if we wanted to go to Yelp or IMDB you need to explicitly say where
        $http.get('/api/todo')
            .then(function (response) {
                console.log(response);
                $scope.todos = response.data;
            });

        console.log($scope.todos);


        // Represents the update todo function
        function updateTodo(todo) {
            $scope.todos[$scope.selectedIndex]= angular.copy(todo);
        }


        function selectTodo($index) {
            // we make a copy to make sure we are not altering the original
            $scope.todo = angular.copy($scope.todos[$index]);
            $scope.selectedIndex = $index;
        }


        function removeTodo(todo) {
            var index = $scope.todos.indexOf(todo);

            // locally
            //$scope.todos.splice(index, 1);

            $http.delete('/api/todo/'+index)
                .then(function (response) {
                    $scope.todos = response.data;
                })
        }


        function addTodo(todo) {

            //var newTodo = {
            //  title: todo.title
            //};

            var newTodo = angular.copy(todo);
            newTodo._id = (new Date()).getTime();
            newTodo.date = new Date();

            //console.log(newTodo);
            $scope.todos.push(newTodo); // adds the toodo to the array
        }
    }

})();