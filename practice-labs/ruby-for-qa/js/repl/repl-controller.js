(function(){
  "use strict"
  window.app.controller("replController", ["$scope", "aceEditor", "taskService", function($scope, aceEditor, taskService){

    var repl = {
      output    : "",
      input     : "",
      history   : [],
      enter     : function(event){
        event.code == "Enter" && repl.run() ;
      },
      run       : function () {
        return taskService.evaluate(repl.input).then(function (result) {
          repl.input = "";
          repl.history.push(JSON.stringify(result));
        });
      }
    };


    $scope.repl = repl
  }]);

}).call(this);

