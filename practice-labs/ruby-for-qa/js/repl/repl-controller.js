(function(){
  "use strict"
  window.app.controller("replController", ["$scope", "aceEditor", "taskService", function($scope, aceEditor, taskService){

    var repl = {
      output    : "",
      input     : "",
      hotkeys   : {
        "ArrowUp"   : function(){
          repl.historyPointer = (repl.historyPointer - 1) % (repl.history.length);
          repl.input = repl.history[repl.historyPointer].input;
        },
        "ArrowDown" : function(){
          repl.historyPointer = (repl.historyPointer + 1) % (repl.history.length);
          repl.input = repl.history[repl.historyPointer].input;
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
      script: [
        ""
      ],
      historyPointer : 1,
      history   : [
        {
          input  : "puts 'hello'",
          output : "hello"
        }
      ],
      run       : function () {
        if(repl.input.length == 0){
          return;
        }
        return taskService.evaluate(repl.input).then(function (result) {
          repl.history.push(        {
                input  : repl.input,
                output : JSON.stringify(result)
              }
          );
          repl.input = "";
          repl.historyPointer = repl.history.length;
        });
      }
    };


    $scope.repl = repl
  }]);

}).call(this);

