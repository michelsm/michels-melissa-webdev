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
        function createPage(page) {

            if(page.name == undefined || page.name == null) {
                model.message = "Please enter a page name";
                return;
            }

            page.websiteId = model.websiteId;
            pageService
                .createPage(page)
                .then(function (page) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });
        }

        function listWidgets(page) {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + page._id + '/widget');
        }
    }
})();
