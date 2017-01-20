var app = angular.module("my-app", []);
app.service("myService", ["$http", function($http){
  var service = {
    save: function (data) {
      $http.get("/api", {}).then(function (response) {
        service.data = response.data;
      });
    }
  };
  return service;
}])