(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);


    function websiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser

        };
        return api;


        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
            website.created = new Date();
            website.updated = new Date();
            websites.push(website);
        }


        function findWebsiteById(websiteId) {
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }


        // find the user by user id then update
        // its attributes
        function updateWebsite(websiteId, website) {
            var find = websites.find(function (given) {
                return given._id === websiteId;
            });
            find.name = website.name;
            find.description = website.description;
        }


        function deleteWebsite(websiteId) {
            var website = websites.find(function (website) {
                return website._id === websiteId;
            });

            var index = websites.indexOf(website);
            // remove at index one element
            websites.splice(index, 1);
        }

        function findAllWebsitesForUser(userId) {
            var resultSet = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    resultSet.push(websites[w]);
                }
            }
            return resultSet;
        }
    }
})();