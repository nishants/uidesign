(function(){
  "use strict"
  window.app.controller("uiController", ["$scope", "uiService", "UserService", function($scope, uiService, userService){
    $scope.ui = uiService;
    $scope.user = userService;
  }]);

}).call(this);