(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);


    function profileController($location, $routeParams, userService) {

        var model = this;
        model.userId = $routeParams['userId'];


        // event handlers
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;


        userService
            .findUserById(model.userId)
            .then(renderUser);


        function renderUser (user) {
                model.user = user;
        }

        // implementation of event handlers
        function updateUser(user) {
            userService
                .updateUser(model.userId, user)
                .then(function() {
                    model.message = "User updated successfully! :)";
                });
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function() {
                    $location.url('/login');
                });
        }

    }
})();