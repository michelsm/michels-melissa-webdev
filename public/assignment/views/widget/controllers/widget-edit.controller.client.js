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
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;


        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });

            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                   model.widget = widget;
                   model.widgetType = model.widget.widgetType;
                });
        }
        init();


        // implementation of event handlers
        function widgetEdit(widget) {
            $location.url('/user/' + model.userId +'/website/' + model.websiteId + '/page/' +
                model.pageId + '/widget/' + widget._id);

        }

        function getYouTubeEmbedUrl(youtubeLink) {
            var embedUrl = 'https://youtu.be/';
            var youTubeLinkParts = youtubeLink.split('=');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            model.youTubeLink = $sce.trustAsResourceUrl(embedUrl);
            return model.youTubeLink;
        }


        function updateWidget(widget) {

            if (widget.widgetType === 'YOUTUBE') {
                var newLink = model.getYouTubeEmbedUrl(widget.url) + "";
                widget.url = newLink;
                console.log("correct link " + widget.url);
            }

            widgetService
                .updateWidget(widget, model.widgetId)
                .then(function (widget) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId
                        + '/page/' + model.pageId + '/widget');
                });
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId
                        + '/page/' + model.pageId + '/widget');
                });
        }

    }
})();