(function(){
  "use strict"
  window.app.controller("taskController", ["$scope", "uiService", "$http", function($scope, uiService, $http){
    var task = {
      readmeTemplate : "task/readme.html",
      htmlPage : "task/page.html",
      data    : "task/data.json",
      page     : {},
      scenarios: {}
    };

    $http.get(task.data).then(function(response){
      $scope.page = response.data;
    });

    $scope.task = task;
  }]);

}).call(this);