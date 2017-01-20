var app = angular.module("my-app", []);

app.service("ServiceTwo", ["$http", function($http){
  var service = {
    ping: function () {
      return "DataFromServiceTwo";
    },
    get: function () {
      return $http.get("/from/two", {}).then(function (response) {
        return response.data;
      });
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
    ping: function (data) {
      return ServiceTwo.ping();;
    },
    get: function(){
      return ServiceTwo.get().then(function(data){
        service.fromTwo = data.two
      });
    }
  };
  return service;
}]);