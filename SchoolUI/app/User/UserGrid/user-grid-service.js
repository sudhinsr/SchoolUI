angular.module('SchoolUI.User.UserGridService', [])
    .service('$$usergridservice', ['$http', '$q',
        function ($http, $q) {
            this.get = function () {
                var deferred = $q.defer(),
                promise = deferred.promise;
                $http.get('http://localhost:8048/user/get-user')
                    .then(function (resp) {
                        deferred.resolve(resp.data)
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    });
                promise.success = function (callback) {
                    promise.then(callback);
                    return promise;
                };
                promise.error = function (callback) {
                    promise.catch(callback);
                    return promise;
                };
                return promise;
            };
        }]);
