angular.module('SchoolUI.User.AddUserController', ['SchoolUI.User.AddUserService', 'SchoolUI.Shared.SignupService'])
    .controller('AddUserController', ['$scope', '$$adduserservice', '$$signupGet', function ($scope, $$adduserservice, $$signupGet) {
        $scope.userModel = {};
        $scope.StateAndFaculty = {};
        $scope.AddUser = function () {
            $$adduserservice.add($scope.userModel)
                .success(function (resp) {
                    console.log("success" + resp);
                    $state.go('app.user.grid');
                })
                .error(function (error) {
                    console.log("error occured" + error);
                })
        };

        $scope.getStateAndFacultyList = function () {
            $$signupGet.getList()
            .success(function (resp) {
                console.log("success" + resp);
                $scope.StateAndFaculty = resp;
            })
                .error(function (error) {
                    console.log("error occured" + error);
                })
        };
        $scope.getStateAndFacultyList();
    }]);