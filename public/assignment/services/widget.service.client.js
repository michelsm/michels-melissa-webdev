(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);


    function widgetService($http) {


        var api = {
            findAllWidgetsForPage: findAllWidgetsForPage,
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget

        };
        return api;


        function findAllWidgetsForPage(pageId) {
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }


        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function createWidget(widget) {
            var url = "/api/assignment/page/" + widget.pageId + "/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }


        function updateWidget(widget, widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            console.log(widget, widgetId);
            return $http.put(url, widget)
                .then(function (response) {
                    console.log("back to the client");
                    return response.data;
                });
        }


        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();