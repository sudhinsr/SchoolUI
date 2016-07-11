
angular.module('SchoolUI.user', [
    'ui.router',
    'SchoolUI.User.UserGridController',
    'SchoolUI.User.AddUserController'
])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('app.user', {
                url: 'user',
                templateUrl: 'app/User/user.html',
                redirectTo: 'app.user.grid',
                title: 'User'
            })
            .state('app.user.add', {
                url: '/add',
                templateUrl: 'app/User/AddUser/add-user-template.html',
                controllerUrl: 'app/User/AddUser/add-user-controller',
                controller: 'AddUserController',
                title: 'Add User'
            })
            .state('app.user.grid', {
                url: '/grid',
                templateUrl: 'app/User/UserGrid/user-grid-template.html',
                controllerUrl: 'app/User/UserGrid/user-grid-controller',
                controller: 'UserGridController',
                title: 'Grid'
            })

    }]);