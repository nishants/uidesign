(function(){
  "use strict"
  window.app.controller("uiController", ["$scope", "$timeout", function($scope, $timeout){
    var ui = {
      loading: false,
    };

    $scope.ui = ui;
  }]);

}).call(this);