(function(){
  "use strict"
  window.app.controller("taskController", ["$scope", "uiService", function($scope, uiService){
    var task = {
      readmeTemplate : "tasks/exercise-one/readme.html",
      scenarios: {}
    };

    $scope.task = task;
  }]);

}).call(this);