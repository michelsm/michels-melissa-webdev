(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);


    function loginController($location, userService) {

        var model = this;


        // event handlers
        model.login = function (username, password) {

            userService
                //.findUserByCredentials(username, password)
                .login(username, password)
                .then(login, handleError);


            function login(found) {
                $location.url('/profile');
            }

            function handleError() {
                model.message = "Username " + username + " not found, " +
                    "or password incorrect. Please try again";
            }
        }

    }
})();