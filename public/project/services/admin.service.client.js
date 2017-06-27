(function () {
    angular
        .module('RecipeApp')
        .factory('foodieAdminService', foodieAdminService);


    function foodieAdminService($http) {

        var foodieApi = {
            logout: logout,
            findAllUsers: findAllUsers
        };
        return foodieApi;


        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = "/api/project/findAllUsers";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

   }
})();