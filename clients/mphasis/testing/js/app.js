(function(){
  "use strict"
  var app = angular.module("presenter", ["ui.router"]);

  app.value("scene-subjects", {
    "browser" : {
      "selector"  : "g#Browser",
    }
  });

  app.controller("uiController", ["$scope", "$state", "$stateParams", function($scope, $state, $stateParams){
    var ui = {
      state: $stateParams,
      scene: {
        subject : "default",
        show : function(name){
          $state.go("scene.subject", {subject: name});
        }
      }
    };

    $scope.ui = ui;
  }]);

  window.app = app;
}).call(this);