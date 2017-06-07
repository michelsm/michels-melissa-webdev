( function() {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($location, $routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.listPages = listPages;



        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();


        // implementation of event handlers
        function listPages(website) {
            $location.url('/user/' + model.userId + '/website/' + website._id + '/page');

        }

    }
})();
