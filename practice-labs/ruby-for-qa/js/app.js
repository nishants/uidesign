(function(){
  "use strict"

  var app = angular.module("ruby-for-qa", []);
  app.value("compileServers",[{
    name: "default",
    url: "http://amoeba-social-rubylab.herokuapp.com"
  }]);
  app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.options = {};
  });

  app.filter("passingCount", [ function(){
    return function(scenarios){
      return !scenarios ? 0 : scenarios.filter(function(scenario){
        return scenario.success;
      }).length;
    };
  }]);
  app.service("taskService", ["$http", "compileServers", function($http, compileServers){
    var remote = compileServers[0];

    return {
      getAssignment : function(id){
        return $http.get(remote.url+"/tasks/:id/worksheet".replace(":id", id)).then(function(response){
          return response.data;
        })
      },
      evaluateAssignment : function(taskId, solutionText){
        return $http.put(remote.url+"/tasks/:id/evaluate".replace(":id", taskId), solutionText).then(function(response){
          return response.data;
        })
      }
    }
  }]);
  app.controller("editorController", ["$scope", "taskService", "$timeout", function($scope, taskService, $timeout){
    var editor = {
      content: null,
      autoRun: {
        pending: null,
        interval: 1000,
      },
      console  : {
        show: false,
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