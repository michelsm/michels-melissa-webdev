(function () {
    angular
        .module('DirectiveLecture', [])
        .directive('hello', helloTag);


    function helloTag() {
        alert('Hello tag')
    }

})();