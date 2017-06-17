(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);


    function profileController(currentUser, $location, $routeParams, userService) {

        var model = this;
        model.userId = currentUser._id;
        model.user = currentUser;


        // event handlers
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;


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

        function logout() {
            userService
                .logout()
                .then(function () {
                   $location.url('/login');
                });
        }

    }
})();