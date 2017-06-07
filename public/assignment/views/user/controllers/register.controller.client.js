( function() {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.register = register;


        // implementation of event handlers
        function register(username, password, password2) {

            if(password !== password2) {
                model.error = "Passwords must match";
                return;
            }



            userService
                .findUserByUsername(username)
                .then(userTaken)
                .catch(notFound);

            function userTaken(user) {
                model.error = "Username unavailable, please try something else.";
            }

            function notFound(user) {

                var user = {
                    username: username,
                    password: password
                };

                userService
                    .createUser(user)
                    .then(function (user) {
                        $location.url('/user/' + user._id);
                    });
            }

        }
    }
})();
