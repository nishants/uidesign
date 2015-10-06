(function () {
  "use strict"
  angular.module("tiktik").controller("AppController", ["$scope", "$timeout", function($scope, $timeout){
    var app = {
      loaded: true,
    };

    $timeout(function(){
      $scope.app.loaded = true;
    }, 1000);

    $scope.app = app;
  }]);

}).call(this);