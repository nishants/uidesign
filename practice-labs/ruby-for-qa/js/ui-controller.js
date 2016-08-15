(function(){
  "use strict"
  window.app.controller("uiController", ["$scope", "uiService", function($scope, uiService){
    $scope.ui = uiService;
  }]);

}).call(this);