(function(){
  "use strict"
  window.app.controller("replController", ["$scope", "aceEditor", "taskService", function($scope, aceEditor, taskService){

    var repl = {
      output    : "",
      input     : "",
      clear     : function(){
        repl.history = [];
      },
      history   : [
        {
          input  : "puts 'hello'",
          output : "hello"
        }
      ],
      enter     : function(event){
        event.code == "Enter" && repl.run() ;
      },
      run       : function () {
        return taskService.evaluate(repl.input).then(function (result) {
          repl.history.push(        {
                input  : repl.input,
                output : JSON.stringify(result)
              }
          );
          repl.input = "";
        });
      }
    };


    $scope.repl = repl
  }]);

}).call(this);

