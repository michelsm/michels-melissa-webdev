(function () {
    angular
        .module('RecipeApp')
        .controller('profileController', profileController);


    function profileController(currentUser, $location, $routeParams, foodieUserService, $http) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;
        model.user = currentUser;

        // event handlers
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.removeFromPins = removeFromPins;


        function init() {
            if (currentUser._pins[0] != null || currentUser._pins[0] != undefined) {
                model.currentUserPins = currentUser._pins;
                console.log(model.currentUserPins);
            }
            model.covercolor = currentUser.covercolor;

            if (currentUser._following[0] === null || currentUser._following[0] === undefined) {
                console.log("add the button");
            } else {
                console.log("Set following");
                model.following = currentUser._following;
                console.log(model.following);
            }

            if (currentUser._reviews[0] === null || currentUser._reviews[0] === undefined) {
                console.log("add the button");
            } else {
                console.log("Set reviews");
                model.reviews = currentUser._reviews;
                console.log(model.reviews);
            }
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

        function deleteUser(user) {
            foodieUserService
                .deleteUser(user._id)
                .then(function() {
                    $location.url('/login');
                });
        }

        function logout() {
            foodieUserService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function removeFromPins(userId, match) {
            foodieUserService
                .removeFromPins(userId, match)
                .then(function (response) {
                    window.alert("Removal success");
                });
        }

    }
})();