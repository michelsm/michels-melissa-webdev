(function () {
    angular
        .module('RecipeApp')
        .controller('adminUpdateController', adminUpdateController);


    function adminUpdateController(currentUser, $location, foodieAdminService, foodieUserService, $routeParams) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;

        // event handlers
        model.updateUser = updateUser;


        function init() {

            var userId = $routeParams['userId'];


            foodieUserService
                .findUserById(userId)
                .then(function (user) {
                    model.navigatedUser = user;
                })

        }
        init();


        function updateUser(user) {


            var userId = user._id;

            if (user.roles === 'admin') {
                var array = new Array();
                array.push("USER");
                array.push("ADMIN");

                user.roles = array;


                foodieUserService
                    .updateUser(userId, user)
                    .then(function (response) {
                        $location.url('/admin');
                    });
            } else {

                var array = new Array();
                array.push("USER");
                user.roles = array;

                foodieUserService
                    .updateUser(userId, user)
                    .then(function (response) {
                        $location.url('/admin');
                    });
            }

        }




    }
})();