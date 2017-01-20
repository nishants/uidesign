var app = angular.module("my-app", []);

app.service("ServiceTwo", ["$http", function($http){
  var service = {
    get: function (data) {
      return "DataFromServiceTwo";
    }
  };
  return service;
}]);

app.service("myService", ["$http", "ServiceTwo", function($http, ServiceTwo){
  var service = {
    save: function (data) {
      $http.get("/api", {}).then(function (response) {
        service.data = response.data;
      });
    },
    get: function (data) {
      return ServiceTwo.get();;
    }
  };
  return service;
}]);