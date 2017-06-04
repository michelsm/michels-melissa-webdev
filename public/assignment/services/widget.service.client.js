(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);


    function widgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>"}
        ];


        var api = {
            findWidgetsForPageId: findWidgetsForPageId,
            getWidgetTypeFromId: getWidgetTypeFromId,
            getWidgetFromId: getWidgetFromId,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget

        };
        return api;


        function findWidgetsForPageId(pageId) {
            var resultSet = [];
            for(var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    resultSet.push(widgets[w]);
                }
            }
            return resultSet;
        }

        function getWidgetTypeFromId(widgetId) {
            for(var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    return widgets[w].widgetType;
                }
            }
            return null;
        }

        function getWidgetFromId(widgetId) {
            for(var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }

        // creates a widget and adds it to the list of widgets
        function createWidget(widget) {
            widgets.push(widget);
        }


        // updates a prexsisting widget based on its type by
        // updating all of the relevant fields
        function updateWidget(widget, widgetType) {

            var found = widgets.find(function (given) {
                return given._id === widget._id;
            });

            if (widgetType === 'HEADING') {
                found.name = widget.name;
                found.text = widget.text;
                found.size = widget.size;

            } else if (widgetType === 'IMAGE' || widgetType === 'YOUTUBE') {
                found.name = widget.name;
                found.url = widget.url;
                found.text = widget.text;
                found.width = widget.width;
            }
        }


        // delete the widget with the corresponding widget id
        function deleteWidget(widgetId) {
            var widget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });

            var index = widgets.indexOf(widget);
            // remove at index one element
            widgets.splice(index, 1);
        }

    }
})();