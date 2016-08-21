(function(){
  "use strict"
  window.app.controller("replController", ["$scope", "aceEditor", "taskService", function($scope, aceEditor, taskService){

    var repl = {
      output    : "",
      input     : "",
      run       : function () {
        return taskService.evaluate(repl.input).then(function (result) {
          repl.output = JSON.stringify(result);
        });
      }
    };


    $scope.repl = repl
  }]);

}).call(this);

