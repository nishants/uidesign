(function(){
  "use strict"
  window.app.controller("uiController", ["$scope", "$timeout", function($scope, $timeout){
    var ui = {
      ready: true,
    };

    $scope.ui = ui;
  }]);

}).call(this);