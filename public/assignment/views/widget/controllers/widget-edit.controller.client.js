// iify function -- self invoked
(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams, widgetService, $sce) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        model.widgetEdit = widgetEdit;
        model.getWidgetTypeFromId = getWidgetTypeFromId;

        function init() {
            model.widgetType = widgetService.getWidgetTypeFromId(model.widgetId);

        }
        init();

        function widgetEdit(widget) {
            $location.url('/user/' + model.userId +'/website/' + model.websiteId + '/page/' +
                model.pageId + '/widget/' + widget._id);

        }

        function getWidgetTypeFromId(widget) {
            return widgetService.getWidgetTypeFromId(widget._id);
        }

    }
})();