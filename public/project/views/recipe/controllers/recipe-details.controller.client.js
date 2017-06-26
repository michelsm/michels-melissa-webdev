(function () {
    angular
        .module('RecipeApp')
        .controller('detailsController', detailsController);


    function detailsController(currentUser, $location, $routeParams, foodieUserService, $http) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;
        model.user = currentUser;
        model.addToPins = addToPins;
        model.logout = logout;
        model.removeFromPins = removeFromPins;

        var yummlyApiId = "4e00ee49";
        var yummlyApiKey = "b1ab5266438698827f83d4819f6ed365";

        function init() {

            model.recipeId = $routeParams['recipeId'];

            if(currentUser._id === null || currentUser._id === undefined) {

            } else {
                model.currentUserPins = currentUser._pins;
                model.pinsAreSet = true;
                console.log(model.currentUserPins);

                if (currentUser._reviews[0] === null || currentUser._reviews[0] === undefined) {
                    console.log("add the button");
                } else {
                    console.log("Set reviews");
                    model.reviews = currentUser._reviews;
                    console.log(model.reviews);
                }
            }

            findRecipeFromPins(model.recipeId);
        }
        init();


        function findRecipeFromPins(recipeId) {
            if (model.currentUser._id === null || model.currentUser._id === undefined) {
                console.log("User is not logged in, we need to fetch the recipe");
                getRecipe(recipeId);
            } else {
                if (model.currentUserPins != null || model.currentUserPins != undefined) {
                    console.log("we can check pins");
                    for (var p in model.currentUserPins) {
                        if (model.currentUserPins[p].id === recipeId) {
                            model.currentRecipe = model.currentUserPins[p];
                            console.log(model.currentRecipe);
                            model.currentIsInList = 1;
                            return;
                        }
                    }

                }
                console.log("we cannot check pins");
                console.log("we are getting the recipe");
                getRecipe(recipeId);
            }
        }

        function getRecipe(recipeId) {
            $http.get("http://api.yummly.com/v1/api/recipe/" + recipeId +
                "?_app_id=" + yummlyApiId + "&_app_key=" + yummlyApiKey)
                .then(function (response) {
                    model.currentRecipe = response.data;
                    console.log(response.data);
                })
        }

        function addToPins(match) {
            console.log(currentUser);

            if(currentUser._id === null || currentUser._id === undefined) {
                window.alert("Please sign in to your account to add " +
                    match.name + " to your list of pinned recipes :)");
            } else {

                for(var p in model.currentUserPins) {
                    if (match.id === model.currentUserPins[p].id) {
                        window.alert(match.name + " is already in your list!");
                        model.currentIsInList = true;
                        return;
                    }
                }

                foodieUserService
                    .addToPins(model.userId, match)
                    .then(function (response) {
                        window.alert(match.name + " was successfully added to your list :)");
                        model.currenIsInList = true;
                    });
            }
        }

        function logout() {
            foodieUserService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function removeFromPins(userId, recipe) {
            foodieUserService
                .removeFromPins(userId, recipe)
                .then(function () {
                    $location.url('/profile');
                })
        }
    }
})();