( function() {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];


        // event handlers
        model.createWebsite = createWebsite;
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
        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService
                .createWebsite(website)
                .then(function (website) {
                    $location.url('/user/' + model.userId + '/website');
                });
        }

        function listPages(website) {
            $location.url('/user/' + model.userId + '/website/' + website._id + '/page');
        }

    }
})();
