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
          "soundtrack": {
            "mode"   : 0,
            "volume" : 1
          },
          "slideWidth"  : 1024,
          "slideHeight" : 768,
        },

      },
      onLoad: function () {
        console.log("loaded");
      }
    };
    var mappingFile = {
      options: {
        mode: 'code',
        change: function(){
          console.log("code changed");
        },
        onLoad: function (instance) {
          mappingFile.editor = instance;
          instance.expandAll();
        }
      },
      content: {
        "data": {
          "soundtrack": {
            "mode"   : 0,
            "volume" : 1
          },
          "slideWidth"  : 1024,
          "slideHeight" : 768,
        },

      },
      onLoad: function () {
        console.log("loaded");
      }
    };
   var templateFile = {
      options: {
        mode: 'code',
        change: function(){
          console.log("code changed");
        },
        onLoad: function (instance) {
          templateFile.editor = instance;
          instance.expandAll();
        }
      },
      content: {
        "data": {
          "soundtrack": {
            "mode"   : 0,
            "volume" : 1
          },
          "slideWidth"  : 1024,
          "slideHeight" : 768,
        },

      },
      onLoad: function () {
        console.log("loaded");
      }
    };

    $scope.templateFile = mappingFile
    $scope.mappingFile = mappingFile
    $scope.requestBody = requestBody

    $scope.request = {
      query : null,
      headers: [],
      url : {}
    }
  })
}).call(this);