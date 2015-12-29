(function () {
  "use strict"
  var app = angular.module("app", []);

  if(!window.location.hash) {
    location.hash = '#collections/home';
  }

  app.controller("AppController", ["$scope", "Collections", "$location", function($scope, Collections, $location){
    $scope.app = {
      collection: {
        name: function(){
          var url = $location.url();
          return url.length ? url.split("collections/")[1] : "home";
        },
        items: []
      },
      updatingCollection: true
    };

    $scope.nav = {showSearch: false, showMenu: false};
    var updateCollection = function(){
      $scope.app.updatingCollection = true;
      Collections.fetch($scope.app.collection.name()).then(function(items){
        $scope.app.collection.items = items;
        $scope.app.updatingCollection = false;
      }, function(){
          console.error("failed to fetch collection" + $scope.app.collection.name());
          $scope.app.updatingCollection = false;
      });
    };

    $scope.$watch("app.collection.name()", updateCollection);
    window.$location = $location;
  }]);

  app.service("Collections", ["$http", function($http){
    return {
      fetch: function(name){
        var url = "api/" + name + ".json";
        return $http.get(url).then(function(reponse){
          return reponse.data.items;
        });
      }
    };
  }]);
}).call(this);