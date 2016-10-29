(function(){
  "use strict"
  window.app.service("replService", ["taskService", function(taskService){

    return {
      create : function(){
        var repl = {
          output    : "",
          input     : "",
          hotkeys   : {
            "ArrowUp"   : function(){
              repl.historyPointer = (repl.historyPointer - 1) % (repl.history.length);
              var history = repl.history[repl.historyPointer];
              history && (repl.input = history.input);
            },
            "ArrowDown" : function(){
              repl.historyPointer = (repl.historyPointer + 1) % (repl.history.length);
              var history = repl.history[repl.historyPointer];
              history && (repl.input = history.input);
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
          script: [],
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

            var expression = repl.script.join(";") + ";" +repl.input;

            return taskService.evaluate(expression).then(function (evaluated) {
              if(!evaluated.error){
                repl.script.push(repl.input);
              }

              repl.history.push(        {
                input  : repl.input,
                output : JSON.stringify(evaluated.result || evaluated.error)
              });

              repl.input = "";
              repl.historyPointer = repl.history.length;
            });
          }
        };
        return repl;
      }
    };
  }]);

}).call(this);

