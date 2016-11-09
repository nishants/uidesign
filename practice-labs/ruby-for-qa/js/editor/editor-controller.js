(function(){
  "use strict"
  window.app.controller("editorController", ["$scope", "taskService", "$timeout", "uiService", "$localStorage","aceEditor", "replService", "UserService", function($scope, taskService, $timeout, uiService, $localStorage, aceEditor, replService, userService){
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
              $localStorage[taskId] = {lastSaved : null, repl: {script : null}}
            }
            $localStorage[taskId].lastSaved   = editor.ace.getValue();
            $localStorage[taskId].repl.script = $scope.repl.script;
            return userService.saveTask(taskId, {
              lastSaved: editor.ace.getValue(),
              repl: editor.ace.getValue(),
            });

          },
          createRepl: function(script){
            $scope.repl = replService.create(script);
          },
          refresh: function(){
            uiService.runningTask = true;
            return taskService.getAssignment(taskId).then(function(task){
              $scope.repl = replService.create(task.replScope);
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
      taskService.getAssignment(taskId).then(function(task){
        $scope.repl = replService.create(task.replScope);
      });
      editor.ace.setValue(lastSaved);
      editor.run();
    }

    $scope.editor = editor;
  }]);

}).call(this);