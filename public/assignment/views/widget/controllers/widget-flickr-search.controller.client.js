(function() {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);

    function flickrController(flickrService, widgetService, $routeParams, $location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;




        function searchPhotos (searchText) {
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {"url" : url, "width": "100%", "widgetType" : "IMAGE", "_id": model.widgetId,
            "pageId" : model.pageId};


            widgetService
                .updateWidget(widget, model.widgetId)
                .then(function(response) {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+
                        "/widget");
                });
        }
    }
})();
