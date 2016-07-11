angular.module('SchoolUI.Shared.SignupService', [])
    .service('$$signupService', ['$q', '$http', function ($q, $http) {
        this.signup = function (model) {
            var deferred = $q.defer(),
                promise = deferred.promise;
            console.log("success", model);
            $http.post('http://localhost:8048/signup/insert', model)
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

    }])
    .service('$$signupGet', ['$q', '$http', function ($q, $http) {
        this.getList = function () {
            var deferred = $q.defer(),
               promise = deferred.promise;
            $http.get('http://localhost:8048/signup/get')
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
        }
    }]);