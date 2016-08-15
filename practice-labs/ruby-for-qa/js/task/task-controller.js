(function(){
  "use strict"
  window.app.controller("taskController", ["$scope", "uiService", function($scope, uiService){
    var task = {
      readmeText : "<h1>The text readme</h1>",
      scenarios: {}
    };

    $scope.task = task;
  }]);

}).call(this);