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
          $state.go({});
          ui.scene.subject = sceneSubjects[subjectId].name;
        }
      }
    };

    window.ui = ui;
    $scope.ui = ui;
  }]);

  window.app = app;
}).call(this);