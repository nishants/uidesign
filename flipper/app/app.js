(function () {
  "use strict"
  window.Flipper.app = angular.module("flipper", ["ui.router"]);

  window.Flipper.app.controller("AppController", function($rootScope, $scope, $http){
    $http.get("contract/dresses.json").then(function(response){
      $rootScope.app = {ready: true};
      $scope.home = {dresses: response.data.items};
    })
  })

}).call(this);