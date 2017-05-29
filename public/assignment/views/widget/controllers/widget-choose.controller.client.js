// iify function -- self invoked
(function () {
    angular
        .module('WAM')
        .controller('widgetChooseController', widgetChooseController);

    function widgetChooseController($location, $routeParams, widgetService, $sce) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];


        function init() {

        }
        init();

    }
})();