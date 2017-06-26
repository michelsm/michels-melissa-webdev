(function () {
    angular
        .module('WAM')
        .factory('userService', userService);


    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLoggedIn: checkLoggedIn,
            register: register,
            logout: logout

    };
        return api;


        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }


        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function findUserByCredentials(username, password) {

            console.log("Inside user.service.client find by credentials");

            var url = "/api/assignment/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function findUserByUsername(username) {
            var url = "/api/assignment/register/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });
        }


        // find the user by user id then update
        // its attributes
        function updateUser(userId, user) {
            var url = "/api/assignment/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                   return response.data;
                });
        }


        function deleteUser(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function login(username, password) {

            console.log("Inside of user.service.client login");

            var url = "/api/assignment/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {

            console.log("Inside of user.service.client check logged in");

            var url = "/api/assignment/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/assignment/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();