( function() {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($location, $routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];

        //
        model.listPages = listPages;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();


        function listPages(website) {
            $location.url('/user/' + model.userId + '/website/' + website._id + '/page');

        }

    }
})();
