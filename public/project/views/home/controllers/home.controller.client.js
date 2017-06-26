(function () {
    angular
        .module('RecipeApp')
        .controller('homeController', homeController);

    function homeController($http, currentUser, foodieUserService) {


        var model = this;
        model.currentUser = currentUser;
        model.addToPins = addToPins;
        model.searchBy = searchBy;
        model.currentUserPins = currentUser._pins;


        var yummlyApiId = "4e00ee49";
        var yummlyApiKey = "b1ab5266438698827f83d4819f6ed365";




        function init() {
            if (currentUser._id === null || currentUser._id === undefined) {
                console.log("nothing");
            } else {
                model.currentUserId = currentUser._id;
            }
        }
        init();



        function searchBy(searchString) {

            var result = searchString.replace(' ', '+');

            console.log(result);

            console.log("in search recipe");
            $http.get("https://api.yummly.com/v1/api/recipes?_app_id="+ yummlyApiId +"&_app_key=" + yummlyApiKey +"&q=" + result +
            "&requirePictures=true")
                .then(function(response) {
                    console.log(response.data.matches);
                    if (response.data.matches.length === 0) {
                        model.message = "There are no results for this search. Please try again!";
                        return;
                    }
                    model.matches = response.data.matches;
                });
        }



        function addToPins(match) {
            console.log(currentUser);

            if(currentUser._id === null || currentUser._id === undefined) {
                window.alert("Please sign in to your account to add " +
                    match.recipeName + " to your list of pinned recipes :)");
            } else {



                for(var p in model.currentUserPins) {
                    console.log(model.currentUserPins[p]);
                    if (match.id === model.currentUserPins[p].id) {
                        window.alert(match.recipeName + " is already in your list!");
                        return;
                    }
                }

                $http.get("http://api.yummly.com/v1/api/recipe/" + match.id +
                    "?_app_id=" + yummlyApiId + "&_app_key=" + yummlyApiKey)
                    .then(function (response) {
                        console.log("complete logic for addToPins");
                        console.log(match.id);

                        foodieUserService
                            .addToPins(model.currentUserId, response.data)
                            .then(function (response) {
                                window.alert(match.recipeName + " was successfully added to your list :)");
                            });
                    });
            }
        }

    }
})();
