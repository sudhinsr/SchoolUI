
angular.module('SchoolUI.Header', [])

    .directive('headerDirective', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/Shared/Header/header.html'
    };
})