(function () {
    angular
        .module('RecipeApp')
        .controller('profileController', profileController);


    function profileController(currentUser, $location, $routeParams, foodieUserService, $http, $sce) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;
        model.user = currentUser;
        model.addComment = addComment;

        // event handlers
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;
        model.removeFromPins = removeFromPins;
        model.trustThisContent = trustThisContent;


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

        function unregister() {
            foodieUserService
                .unregister()
                .then(function() {
                    $location.url('/login');
                }, function (err) {
                    console.log(err);
                    console.log("error in the controller");
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

        function addComment(comment) {
            console.log(comment);
            foodieUserService
                .addComment(comment)
                .then(function (response) {
                    console.log("back to the controller add comment");
                   $location.url('/profile');
                });
        }

        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }

    }
})();