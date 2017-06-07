( function() {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($location, $routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];


        // event handlers
        model.listWidgets = listWidgets;


        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();



        // implementation of event handlers
        function listWidgets(page) {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + page._id + '/widget');
        }

    }
})();