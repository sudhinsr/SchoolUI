angular
   .module('SchoolUI', ['SchoolUI.user', 'ui.router', 'SchoolUI.Header', 'SchoolUI.Shared.LoginController', 'SchoolUI.Shared.SignupController', 'SchoolUI.User.AddUserController'])
   .config([
       '$httpProvider',
       '$stateProvider',
       '$urlRouterProvider',
       function ($httpProvider, $stateProvider, $urlRouterProvider) {

           $httpProvider.defaults.withCredentials = true;
           $httpProvider.useApplyAsync(true);
           // $urlRouterProvider.otherwise('/login');

           $stateProvider
             .state('app.login', {
                 url: 'login',
                 templateUrl: 'app/Shared/Login/login-template.html',
                 controllerUrl: 'app/Shared/Login/login-controller.js',
                 controller: 'logincontroller',
                 title: 'Login'
             })
               .state('app.signup', {
                   url: 'signup',
                   templateUrl: 'app/Shared/Signup/signup-template.html',
                   controllerUrl: 'app/Shared/Signup/signup-controller.js',
                   controller: 'signupcontroller',
                   title: 'Signup'
               })

           .state('app', {
               abstract: true,
               url: '/',
               template: '<header-directive></header-directive>'

           });

       }
   ])

       .run(['$rootScope', '$state', '$stateParams',
           function ($rootScope, $state, $stateParams) {

               // It's very handy to add references to $state and $stateParams to the $rootScope
               // so that you can access them from any scope within your applications.For example,
               // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
               // to active whenever 'contacts.list' or one of its decendents is active.
               $rootScope.$state = $state;
               $rootScope.$stateParams = $stateParams;

               // $stateChangeStart event of ui.router handled, for checking if login required, if required check if already logged in
               // otherwise redirect to the login state.
               $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                   if (toState.redirectTo) {

                       event.preventDefault();
                       return $state.go(toState.redirectTo, toParams);
                   }
                   var requireLogin = false;
                   if (toState.data) {
                       requireLogin = toState.data.requireLogin;
                   }
                   if (requireLogin) {
                       var userLoggedIn = $cookies.get('userloggedin') == 'true';
                       //State requires login
                       if (!userLoggedIn) {
                           event.preventDefault();
                           //State change goto login state
                           return $state.go('login');
                       }
                       if (userLoggedIn && typeof $rootScope.User === 'undefined') {
                           event.preventDefault();
                           //userLoggedIn cookie is set, but context is not populated yet...
                           $$Login.GetUserContext()
                             .then(function () {
                                 //userLoggedIn cookie is set, user context population completed
                                 return $state.go(toState.name, toParams);
                             })
                             .catch(function () {
                                 console.log("$rootScope.$on('$stateChangeStart'..., couldn't load user context...");
                                 return $state.go('login');
                             });
                       }
                   }
               });

           }
       ]);
