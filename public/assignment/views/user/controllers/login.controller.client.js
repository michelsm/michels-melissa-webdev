(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);


    function loginController($location, userService) {

        var model = this;


        // represents the login function
        model.login = function(username, password) {
            var found = userService.findUserByCredentials(username, password);

            if(found !== null) {
                $location.url('/user/' + found._id);
            } else {
                model.message = "Username " + username + " not found, please try again";
            }
        }


    }
})();