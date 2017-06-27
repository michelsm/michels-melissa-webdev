(function () {
    angular
        .module('RecipeApp')
        .controller('adminDetailsController', adminDetailsController);


    function adminDetailsController(currentUser, $location, foodieAdminService, foodieUserService, $routeParams) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;

        // event handlers


        function init() {

            var userId = $routeParams['userId'];
            console.log(userId);

            foodieUserService
                .findUserById(userId)
                .then(function (user) {
                    model.navigatedUser = user;
                    if (model.navigatedUser._following[0] != null || model.navigatedUser._following[0] != undefined) {
                        model.following = model.navigatedUser._following;
                    }
                    if (model.navigatedUser._pins[0] != null || model.navigatedUser._pins[0] != undefined) {
                        model.navigatedUserPins = model.navigatedUser._pins;
                    }
                })

        }
        init();






    }
})();