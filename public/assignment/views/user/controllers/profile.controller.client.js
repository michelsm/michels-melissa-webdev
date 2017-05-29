(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);


    function profileController($location, $routeParams, userService) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.updateInfo = updateInfo;
        model.user = userService.findUserById(model.userId);


        // implementation of event handlers
        function updateInfo(username, email, firstName, lastName) {
            var userId = model.user._id;
            var userPassword = model.user.password;
            var updatedUser = {
                _id: model.userId,
                username: username,
                password: userPassword,
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            userService.updateUser(model.userId, updatedUser);
        }

    }
})();