(function(){
  "use strict"
  window.app.controller("replController", ["$scope", "aceEditor", "taskService", function($scope, aceEditor, taskService){

    var repl = {
      output    : "",
      input     : "",
      hotkeys   : {
        "ArrowUp"   : function(){
          console.log("last");
        },
        "ArrowDown" : function(){
          console.log("next");
        },
        "Ctrlk"     : function(){
          repl.clear();
        },
        "Enter"     : function(){
          repl.run();
        },
      },
      clear     : function(){
        repl.history = [];
      },
      history   : [
        {
          input  : "puts 'hello'",
          output : "hello"
        }
      ],
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

