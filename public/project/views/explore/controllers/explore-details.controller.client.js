(function () {
    angular
        .module('RecipeApp')
        .controller('exploreDetailsController', exploreDetailsController);


    function exploreDetailsController(currentUser, $location, $routeParams, foodieUserService, $http) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;


        // declaration of event handlers
        model.updateUser = updateUser;
        model.logout = logout;


        function init() {

            var userId = $routeParams['userId'];

            foodieUserService.findUserById(userId)
                .then(function (user) {
                    model.navigatedUser = user;
                    if (model.navigatedUser._following[0] != null || model.navigatedUser._following[0] != undefined) {
                        model.following = model.navigatedUser._following;
                    }
                    if (model.navigatedUser._pins[0] != null || model.navigatedUser._pins[0] != undefined) {
                        model.navigatedUserPins = model.navigatedUser._pins;
                    }
                });

        }
        init();



        // implementation of event handlers
        function updateUser(user) {
            foodieUserService
                .updateUser(model.userId, user)
                .then(function() {
                    model.message = "Success! :)";
                });
        }

        function logout() {
            foodieUserService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }


    }
})();