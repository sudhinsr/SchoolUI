angular.module('SchoolUI.User.AddUserService', [])
    .service('$$adduserservice',['$http', '$q', function ($http, $q) {

        this.add = function (model) {
            var deferred = $q.defer(),
                promise = deferred.promise;
            console.log("success", model);
            $http.post('http://localhost:8048/user/add-user', model)
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