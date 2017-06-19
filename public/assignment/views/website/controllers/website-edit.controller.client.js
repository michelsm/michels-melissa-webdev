( function() {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, $routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];



        // event handlers
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;
        model.listPages = listPages;



        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });

            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = website;
                });
        }
        init();



        // implementation of event handlers
        function updateWebsite(websiteId, website) {

            console.log("in");

            if(website.name == undefined || website.name == null) {
                model.message = "Please enter a website name";
                return;
            }

            websiteService
                .updateWebsite(websiteId, website)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                });
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                });
        }


        function listPages(website) {
            $location.url('/user/' + model.userId + '/website/' + website._id + '/page');
        }

    }
})();
