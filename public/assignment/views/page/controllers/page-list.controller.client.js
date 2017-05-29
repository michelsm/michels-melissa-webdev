( function() {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($location, $routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];

        model.listWidgets = listWidgets;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }
        init();


        function listWidgets(page) {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + page._id + '/widget');
        }

    }
})();