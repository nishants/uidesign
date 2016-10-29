(function(){
  "use strict"
  window.app.controller("editorController", ["$scope", "taskService", "$timeout", "uiService", "$localStorage","aceEditor", "replService", function($scope, taskService, $timeout, uiService, $localStorage, aceEditor, replService){
    window.storage = $localStorage;
    var taskId = "exercise-one",
        editor = {
          content: null,
          autoRun: {
            pending: null,
            interval: 500,
            execute: function(){
              editor.run();
            }
          },
          console  : {
            show: false,
            firstFailingIndex : 99999999,
            output : {
              scenarios: []
            }
          },
          ace: aceEditor.create("worksheet"),
          lastSaved : function(taskId){
            var task = $localStorage[taskId];
            return task && task.lastSaved;
          },
          save : function(){
            if(!$localStorage[taskId]){
              $localStorage[taskId] = {lastSaved : null}
            }
            $localStorage[taskId].lastSaved = editor.ace.getValue();
          },
          refresh: function(){
            uiService.runningTask = true;
            return taskService.getAssignment(taskId).then(function(task){
              editor.ace.setValue(task.worksheet);
              editor.run();
            });
          },
          run: function(){
            uiService.runningTask = true;
            return taskService.evaluateAssignment(taskId, editor.ace.getValue()).then(function(result){
              editor.console.output = result;
              editor.console.show = true;
              editor.save();
              uiService.runningTask = false;
              $scope.ui.splash = false;
              editor.console.firstFailingIndex = editor.console.output.scenarios.length;
              editor.console.output.scenarios.forEach(function(scenario, index){
                var hasFailed       = !scenario.success,
                    lowestIndex     = editor.console.firstFailingIndex,
                    isFirstFailed   = hasFailed && (lowestIndex > index);
                editor.console.firstFailingIndex = isFirstFailed ? index : lowestIndex;
              });
            });
          }
        };

    editor.ace.getSession().on('change', function(e) {
      editor.autoRun.pending ? $timeout.cancel(editor.autoRun.pending) : "";
      editor.autoRun.pending = $timeout(editor.autoRun.execute, editor.autoRun.interval);
    });

    var lastSaved = editor.lastSaved(taskId);

    if(!lastSaved){
      editor.refresh();
    }

    if(lastSaved){
      editor.ace.setValue(lastSaved);
      editor.run();
    }

    $scope.editor = editor;
    $scope.repl = replService.create();
  }]);

}).call(this);