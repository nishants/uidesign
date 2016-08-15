(function(){
  "use strict"
  window.app.controller("editorController", ["$scope", "taskService", "$timeout", function($scope, taskService, $timeout){
    var editor = {
      content: null,
      autoRun: {
        pending: null,
        interval: 1000,
      },
      console  : {
        show: false,
        output : {
          scenarios: []
        }
      },
      ace: ace.edit("editor"),
      contentChanged: function(e){
        var action = e.action,
            change = e.lines
        console.log(action+ " : " + change)
      },
      run: function(){
        taskService.evaluateAssignment("exercise-one", editor.ace.getValue()).then(function(result){
          editor.console.output = result;
          editor.console.show = true;
        });
      }
    };

    taskService.getAssignment("exercise-one").then(function(worksheet){
      editor.ace.setValue(worksheet);
      editor.run();
    });

    editor.ace.getSession().setMode("ace/mode/ruby");
    editor.ace.getSession().on('change', function(e) {
      editor.autoRun.pending ? $timeout.cancel(editor.autoRun.pending) : "";
      editor.autoRun.pending = $timeout(function () {
        editor.contentChanged(e);
      }, editor.autoRun.interval);
    });
    $scope.editor = editor;
  }]);

}).call(this);