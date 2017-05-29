( function() {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, $routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        // event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();


        // implementation of event handlers
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }


        function updatePage(pageId, page) {
            pageService.updatePage(pageId, page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');

        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

    }
})();
