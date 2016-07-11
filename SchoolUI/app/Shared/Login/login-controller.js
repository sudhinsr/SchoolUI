angular.module('SchoolUI.Shared.LoginController', ['SchoolUI.Shared.LoginService', 'ngCookies'])

    .controller('logincontroller', ['$scope', '$$loginService', '$state', '$cookies',
        function ($scope, $$loginService, $state, $cookies) {
            $scope.loginModel = {};
            $scope.loginValidate = function () {
                $$loginService.login($scope.loginModel)

                    .success(function (resp) {
                        $cookies.put('Login Status', resp == "True" ? true : false);
                        $cookies.put('ReferenceName', $scope.loginModel.UserName);
                        console.log("success" + resp);
                        $state.go('app.user.grid');
                    })
                    .error(function (error) {
                        console.log("error occured" + error);
                    })
            };

        }]);

