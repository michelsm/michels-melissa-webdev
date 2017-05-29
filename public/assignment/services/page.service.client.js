(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);


    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "345", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPageById: findPageById,
            findPagesByWebsiteId: findPagesByWebsiteId,
            updatePage: updatePage,
            deletePage: deletePage,
            //findAllPagesForUser: findAllPagesForUser

        };
        return api;


        function createPage(page) {
            page._id = (new Date()).getTime() + "";
            page.created = new Date();
            page.updated = new Date();
            pages.push(page);
        }


        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function findPagesByWebsiteId(websiteId) {
            var resultSet = [];
            for(var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    resultSet.push(pages[p]);
                }
            }
            return resultSet;
        }

        // find the user by user id then update
        // its attributes
        function updatePage(pageId, page) {
            var find = pages.find(function (given) {
                return given._id === pageId;
            });
            find.name = page.name;
            find.description = page.description;
        }


        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });

            var index = pages.indexOf(page);
            // remove at index one element
            pages.splice(index, 1);
        }
/*
        function findAllPagesForUser(userId) {
            var resultSet = [];
            for(var w in pages) {
                if(pages[w]._id === userId) {
                    resultSet.push(pages[w]);
                }
            }
            return resultSet;
        }
        */
    }
})();