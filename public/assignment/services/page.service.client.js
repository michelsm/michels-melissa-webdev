(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);


    function pageService($http) {

        var api = {
            createPage: createPage,
            findPageById: findPageById,
            findAllPagesForWebsite: findAllPagesForWebsite,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;


        function createPage(page) {
            var url = "/api/assignment/website/" + page.websiteId + "/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }


        function findPageById(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/assignment/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function updatePage(pageId, page) {
            var url = "/api/assignment/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }


        function deletePage(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();