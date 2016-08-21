(function(){
  "use strict"
  var app = angular.module("presenter", ["ui.router"]);
  app.controller("uiController", ["$scope", "$state", function($scope, $state){
    var ui = {
      state: $state
    };
    window.ui = ui;
    $scope.ui = ui;
  }]);

  window.app = app;
}).call(this);