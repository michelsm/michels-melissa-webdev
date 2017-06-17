/**
 * Created by melissamichels on 6/17/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController(currentUser) {
        var model = this;
        model.currentUser = currentUser;
    }

})();
