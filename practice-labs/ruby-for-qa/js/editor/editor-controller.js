(function(){
  "use strict"
  window.app.controller("editorController", ["$scope", "taskService", "$timeout", "uiService", "$localStorage", function($scope, taskService, $timeout, uiService, $localStorage){
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
            output : {
              scenarios: []
            }
          },
          ace: ace.edit("worksheet"),
          contentChanged: function(e){
            var action = e.action,
                change = e.lines
            console.log(action+ " : " + change)
          },
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
            return taskService.getAssignment(taskId).then(function(worksheet){
              editor.ace.setValue(worksheet);
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
            });
          }
        };



    editor.ace.getSession().setMode("ace/mode/ruby");
    editor.ace.setShowPrintMargin(false);
    editor.ace.getSession().setTabSize(2);
    editor.ace.getSession().setUseSoftTabs(true);


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
  }]);

}).call(this);