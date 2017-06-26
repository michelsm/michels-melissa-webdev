( function() {
    angular
        .module('RecipeApp')
        .controller('registerController', registerController);

    function registerController($location, foodieUserService) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation of event handlers
        function register(user) {

            var username = user.username;
            var password = user.password;
            var password2 = user.verifyPassword;
            var email = user.email;
            var firstName = user.firstName;
            var lastName = user.lastName;

            console.log(password);
            console.log(password2);

            if (username === undefined || username === null) {
                model.error = "Please create a username.";
                return;
            }

            if (password === undefined || password === null) {
                model.error = "Please create a password.";
                return;
            }

            if(password !== password2) {
                model.error = "Passwords must match";
                return;
            }



            foodieUserService
                .findUserByUsername(username)
                .then(userTaken)
                .catch(notFound);

            function userTaken(user) {
                model.error = "Username unavailable, please try something else.";
            }

            function notFound(user) {

                var user = {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                };

                foodieUserService
                    .register(user)
                    .then(function (user) {
                        console.log("back to the controller");
                        $location.url('/profile');
                    });
            }

        }
    }
})();
