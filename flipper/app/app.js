(function () {
  "use strict"
  window.Flipper.app = angular.module("flipper", ["ui.router"]);

  window.Flipper.app.controller("AppController", function($rootScope, $scope, $http){
    $http.get("contract/dresses.json").then(function(response){
      filepicker.setKey("ALh6PQSJeQtewVoki4Xlez");
      $scope.home = {dresses: response.data.items};

      $rootScope.app = {ready: true};
    })
  })

}).call(this);