(function () {
    angular
        .module('RecipeApp')
        .controller('adminController', adminController);


    function adminController(currentUser, $location, foodieAdminService, foodieUserService) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;

        // event handlers
        model.logout = logout;
        model.deleteUser = deleteUser;
        model.findAllUsers = findAllUsers;
        model.createUser = createUser;
        model.setNavigatedUser = setNavigatedUser;


        function init() {

            findAllUsers();

        }
        init();



        // implementation of event handlers

        function setNavigatedUser(user) {
            $location.url('/adminUpdate/' + user._id);
        }


        function logout() {
            foodieAdminService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }


        function deleteUser(user) {

            if (user._id === model.userId) {
                window.alert("You cannot delete yourself");
                return;
            }

            foodieUserService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function findAllUsers() {
            foodieAdminService
                .findAllUsers()
                .then(function (users) {
                    model.allUsers = users;
                });
        }

        function createUser(user) {


            if (user.firstName === undefined ||
                user.lastName === undefined ||
                user.username === undefined ||
                user.password === undefined ||
                user.verifyPassword === undefined ||
                user.roles === undefined) {
                window.alert("At least one field is not filled in");
                return;
            }

            if (user.roles === 'admin') {
                var array = new Array();
                array.push("USER");
                array.push("ADMIN");

                user.roles = array;


                foodieUserService
                    .createUser(user)
                    .then(function (response) {
                        findAllUsers();
                        $location.url('/admin');
                    });
            } else {

                var array = new Array();
                array.push("USER");
                user.roles = array;

                foodieUserService
                    .createUser(user)
                    .then(function (response) {
                        findAllUsers();
                        $location.url('/admin');
                    });
            }
        }

    }
})();