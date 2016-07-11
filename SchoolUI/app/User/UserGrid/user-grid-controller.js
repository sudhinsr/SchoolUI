angular.module('SchoolUI.User.UserGridController', ['SchoolUI.User.UserGridService'])
    .controller('UserGridController', ['$scope', '$$usergridservice',
        function ($scope, $$usergridservice) {

            $scope.userModel = {};
            $scope.userModel.test = "test string";

            $scope.getUsers = function () {
                $$usergridservice.get()
                    .success(function (resp) {
                        $scope.userModel.Users = resp;
                    })
                    .error(function (error) {
                        console.log("error occured" + error);
                    })
            }
            $scope.getUsers();

        }]);

//angular.module('SchoolUI.User.UserGridController', ['SchoolUI.User.UserGridService'])
//.controller('UserGridController', ['$scope',
//   function ($scope) {

//       $scope.userModel = {};
//       $scope.userModel.test = "test string";

//   }]);