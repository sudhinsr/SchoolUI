angular.module('SchoolUI.Shared.LoginService', [])
    .service('$$loginService', ['$q', '$http', function ($q, $http) {

        this.login = function (model) {
            var deferred = $q.defer(),
                promise = deferred.promise;
            console.log("success", model);
            $http.post('http://localhost:8048/login/validate-login', model)
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