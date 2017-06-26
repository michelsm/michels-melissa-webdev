(function () {
    angular
        .module('RecipeApp')
        .controller('loginController', loginController);


    function loginController($location, foodieUserService) {

        var model = this;


        // event handlers
        model.login = function (user) {

            var username = user.username;
            var password = user.password;

            console.log(username);
            console.log(password);

            foodieUserService
                .login(username, password)
                .then(login, handleError);


            function login(found) {
                console.log("found");
                $location.url('/profile');
            }

            function handleError() {
                model.message = "Username " + username + " not found, " +
                    "or password incorrect. Please try again";
            }
        }

    }
})();