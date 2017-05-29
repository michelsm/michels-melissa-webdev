(function () {
    angular
        .module('WAM')
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
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
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'vm'
            })
            .when('/user/:userId/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller:'websiteListController',
                controllerAs:'vm'
            })
            .when('/user/:userId/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'vm'
            })
            .when('/user/:userId/website/:websiteId', {
                templateUrl:'views/website/templates/website-edit.view.client.html',
                controller:'websiteEditController',
                controllerAs:'vm'

            })
            .when ('/user/:userId/website/:wid/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller:'pageListController',
                controllerAs: 'vm'
            })
            .when('/user/:userId/website/:wid/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'vm'

            })
            .when('/user/:userId/website/:wid/page/:pid', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'vm'
            })
            .when('/user/:userId/website/:wid/page/:pid/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'vm'
            })
            .when('/user/:userId/website/:wid/page/:pid/widget/new', {
                templateUrl: 'views/widget/templates/widget-choose.view.client.html',
                controller: 'widgetChooseController',
                controllerAs: 'vm'
            })
            .when('/user/:userId/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'vm'
            });
    }

})();