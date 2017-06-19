/**
 * Created by melissamichels on 6/18/17.
 */
(function() {
    angular
        .module('RecipeApp')
        .controller('pocController', pocController);

    function pocController($http){
        var model = this;

        var yummlyApiId = "4e00ee49";
        var yummlyApiKey = "b1ab5266438698827f83d4819f6ed365";
        model.searchRecipe = searchRecipe;
        model.showDetails = showDetails;

        function searchRecipe(searchString) {

            var result = searchString.replace(' ', '+');

            console.log(result);

            console.log("in search recipe");
            $http.get("http://api.yummly.com/v1/api/recipes?_app_id="+ yummlyApiId +"&_app_key=" + yummlyApiKey +"&q=" + result)
                .then(function(response) {
                    console.log(response.data.matches);
                    model.matches = response.data.matches;
                    if (model.matches.length === 0) {
                        model.message = "There are no results for this search. Please try again!";
                    }
                });
        }


        function showDetails(match) {
            console.log("in show details");
            console.log(match);
            model.details = match;
            model.recipeName = match.recipeName;
            model.ingredients = match.ingredients;
            model.time = match.totalTimeInSeconds/60;
        }
    }
})();