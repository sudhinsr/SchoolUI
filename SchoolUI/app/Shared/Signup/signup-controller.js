angular.module('SchoolUI.Shared.SignupController', ['SchoolUI.Shared.SignupService'])
 .controller('signupcontroller', ['$scope', '$$signupService','$$signupGet' ,'$state',
        function ($scope, $$signupService,$$signupGet, $state) {
            $scope.signupModel = {};
            $scope.StateAndFaculty = {};
            $scope.signupValidate = function () {
                $$signupService.signup($scope.signupModel)
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
            }
            $scope.getStateAndFacultyList();

        }]);
