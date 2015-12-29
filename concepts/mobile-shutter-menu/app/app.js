(function () {
  "use strict"
  var app = angular.module("app", []);

  app.controller("AppController", ["$scope", "Collections", "$location", function($scope, Collections, $location){
    $scope.app = {
      collection: {
        name: function(){
          return $location.url().split("collection/")[1];
        },
        items: []
      }
    };

    $scope.nav = {showSearch: false, showMenu: false};
    var updateCollection = function(){
      $scope.app.updatingCollection = true;
      Collections.fetch($scope.app.collection.name()).then(function(collection){
        $scope.app.collection.items = collection;
        $scope.app.updatingCollection = false;
      });
    };

    $scope.$watch("app.collection.name()", updateCollection);
  }]);

  app.service("Collections", ["$http", function($http){
    return {
      fetch: function(name){
        var url = "api/" + name + ".json";
        return $http.get(url).then(function(data){
          return data;
        });
      }
    }
  }]);
})();