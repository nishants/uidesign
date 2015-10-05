(function () {
  "use strict"
  angular.module("tiktik").controller("AppController", ["$scope", "$timeout", function($scope, $timeout){
    var app = {
      loaded: true,
    };

    $scope.app = app;
  }]);

}).call(this);