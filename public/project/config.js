/**
 * Created by melissamichels on 6/20/17.
 */
(function () {
    angular
        .module('RecipeApp')
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/poc', {
                templateUrl: 'poc/templates/poc.html',
                controller: 'pocController',
                controllerAs: 'vm'
            })
            .when('/editUserSettings', {
                templateUrl: 'views/user/templates/editUserSettings.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/details/:recipeId', {
                templateUrl: 'views/recipe/templates/recipe-details.view.client.html',
                controller: 'detailsController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/explore', {
                templateUrl: 'views/explore/templates/explore-list.view.client.html',
                controller: 'exploreController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/explore/details/:userId', {
                templateUrl: 'views/explore/templates/explore-details.view.client.html',
                controller: 'exploreDetailsController',
                controllerAs: 'vm',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });
    }


    function checkLoggedIn($q, $location, foodieUserService) {
        var deferred = $q.defer();
        foodieUserService
            .checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }



    function checkCurrentUser($q, $location, foodieUserService) {
        var deferred = $q.defer();
        foodieUserService
            .checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

})();