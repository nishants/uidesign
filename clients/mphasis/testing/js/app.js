(function(){
  "use strict"
  var app = angular.module("presenter", ["ui.router"]);

  app.value("scene-subjects", {
    "Browser" : {
      "name"  : "browser",
    }
  });

  app.controller("uiController", ["$scope", "$state", "$stateParams", "scene-subjects", function($scope, $state, $stateParams, sceneSubjects){
    var ui = {
      state: $stateParams,
      scene: {
        subject : "default",
        show : function(subjectId){
          var subject = sceneSubjects[subjectId];
          $state.go("scene.subject", {subject: subject.name});
        }
      }
    };

    window.ui = ui;
    $scope.ui = ui;
  }]);

  window.app = app;
}).call(this);