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

        // event handlers
        model.widgetEdit = widgetEdit;
        model.getWidgetTypeFromId = getWidgetTypeFromId;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;


        function init() {
            model.widgetType = widgetService.getWidgetTypeFromId(model.widgetId);
            model.widget = widgetService.getWidgetFromId(model.widgetId);
        }
        init();


        // implementation of event handlers
        function widgetEdit(widget) {
            $location.url('/user/' + model.userId +'/website/' + model.websiteId + '/page/' +
                model.pageId + '/widget/' + widget._id);

        }

        function getWidgetTypeFromId(widget) {
            return widgetService.getWidgetTypeFromId(widget._id);
        }

        function getWidgetFromId(widgetId) {
            return widgetService.getWidgetFromId(model.widgetId);
        }

        function updateWidget(widget) {
            widgetService.updateWidget(widget, model.widgetType);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId
                + '/page/' + model.pageId + '/widget');
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId
                + '/page/' + model.pageId + '/widget');

        }

    }
})();