(function () {
    angular
        .module('WAM')
        .service('flickrService', flickrService);


    function flickrService($http) {

        this.searchPhotos = searchPhotos;


        var key = "a6459a5f231f2c47634e9792f1acdf90";
        var secret = "174d9bfd1ef34722";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }


    }
})();