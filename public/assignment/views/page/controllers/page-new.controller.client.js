( function() {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];

        // event handlers
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }
        init();


        // implementation of event handlers
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }
})();
