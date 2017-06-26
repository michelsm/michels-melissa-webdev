(function () {
    angular
        .module('RecipeApp')
        .controller('exploreController', exploreController);


    function exploreController(currentUser, $location, $routeParams, foodieUserService, $http) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;
        model.following = currentUser._following;


        // declaration of event handlers
        model.updateUser = updateUser;
        model.logout = logout;
        model.searchBy = searchBy;
        model.follow = follow;


        function init() {

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

        function searchBy(searchType, searchKey) {

            console.log("searchType = " + searchType);
            console.log("searchKey = " + searchKey);

            if (searchType === "username") {
                console.log("search type is username");
                foodieUserService
                    .findUserByUsername(searchKey)
                    .then(successful)
                    .catch(fail);

                function successful(user) {
                    if (user === null || user === undefined) {
                        window.alert("username " + searchKey + " not found. Please try again");
                        return;
                    }
                    console.log("success");
                    model.results = new Array();
                    model.results.push(user);
                    console.log(user);
                }

                function fail() {
                    console.log("failure");
                    window.alert("username " + searchKey + " not found. Please try again");
                }
            }

            if (searchType === "firstName") {
                console.log("search type is firstname");
                foodieUserService
                    .findAllUsersByFirstName(searchKey)
                    .then(success)
                    .catch(failure);

                        function success(users) {
                            if (users === null || users === undefined) {
                                window.alert("first name " + searchKey + " not found. Please try again");
                                return;
                            }

                            console.log("success");
                            model.results = new Array();
                            model.results.push(users);
                            console.log(users);
                        }

                        function failure() {
                            console.log("failure");
                        }
            }
        }

        function follow(user) {

            var newFollow = {
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                profileImg: user.profileImg,
                profileUrl: user.profileUrl
            };


            console.log("inside follow");
            foodieUserService
                .follow(model.currentUser._id, newFollow)
                .then(function (response) {
                    window.alert("The user has been added to your follower list");
                });
        }
    }
})();