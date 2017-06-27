(function () {
    angular
        .module('RecipeApp')
        .factory('foodieUserService', foodieUserService);


    function foodieUserService($http) {

        var foodieApi = {
            findUserByUsername: findUserByUsername,
            register: register,
            login: login,
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            addToPins: addToPins,
            removeFromPins: removeFromPins,
            findAllUsersByFirstName: findAllUsersByFirstName,
            follow: follow,
            checkAdmin: checkAdmin,
            unregister: unregister,
            addComment: addComment
        };
        return foodieApi;


        function findUserByUsername(username) {
            var url = "/api/project/register/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/project/register";
            return $http.post(url, user)
                .then(function (response) {
                    console.log("back to the client");
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/project/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/project/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addToPins(userId, match) {


            var url = "/api/project/addToPins/" + userId;
            return $http.put(url, match)
                .then(function (response) {
                    return response.data;
                });
        }

        function addComment(comment) {
            var url = "/api/project/addComment";
            return $http.put(url, comment)
                .then(function (response) {
                    console.log("back to the client add comment");
                    return response.data;
                });
        }

        function removeFromPins(userId, match) {
            var url = "/api/project/removeFromPins/" + userId;
            return $http.delete(url, match)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsersByFirstName(firstName) {
            var url = "/api/project/findUsersByFirstName/" + firstName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function follow(userId, user) {
            var url = "/api/project/follow/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister() {
            var url = "/api/project/unregister";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    console.log(err);
                    console.log("error in the client");
                });
        }
    }
})();