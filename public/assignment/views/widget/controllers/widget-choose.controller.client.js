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
        model.widgetId = null;
        model.widgetType = null;



        // event handlers
        model.createWidget = createWidget;


        function init() {

        }
        init();


        function createWidget(widgetType) {
            model.widgetId = (new Date()).getTime() + "";
            model.widgetType = widgetType;

            var widget = {
                _id:model.widgetId,
                pageId:model.pageId,
                widgetType:model.widgetType
            };

            widgetService.createWidget(widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId
                + '/page/' + model.pageId + '/widget/' + model.widgetId);
        }
    }
})();