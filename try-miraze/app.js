(function () {
  "use strict"

  window.app = angular.module("miraze-play", ["ng.jsoneditor"]);

  app.controller("ui-controller", function($scope){
    var requestBody = {
      options: {
        mode: 'code',
        change: function(){
          console.log("code changed");
        },
        onLoad: function (instance) {
          requestBody.editor = instance;
          instance.expandAll();
        }
      },
      content: {
        "data": {
          "message": "Hello World"
        },

      },
      onLoad: function () {
        console.log("loaded");
      }
    };
    $scope.requestBody = requestBody
  })
}).call(this);