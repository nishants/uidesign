(function () {
  "use strict"
  var app = angular.module("try-look-like", ["ngRoute"]);
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

  app.service("aceEditor", ["$http", function ($http) {
    var createSample = function(config){
      return {
        name: config[0],
        snippet : config.slice(1)
      }
    };
    return {
      run : function(script){
        return $http.put("https://amoeba-social-look-like-server.herokuapp.com/assertion/evaluate", unescape(script)).then(function(response){
          return response.data.split("<---->").filter(function(result){
            return result.length  > 0;
          });
        });
      },
      create: function (elment) {
        var aceEditor = ace.edit(elment);
        aceEditor.getSession().setMode("ace/mode/ruby");
        aceEditor.setShowPrintMargin(false);
        aceEditor.getSession().setTabSize(2);
        aceEditor.getSession().setUseSoftTabs(true);

        return aceEditor;
      },
      getAllSamples : function(){
        return $http.get("config/samples.txt").then(function(response){
          return response.data.split("#").map(function(sample){
            return sample.split("\n");
          }).filter(function(sample){
            return sample.length > 1;
          }).map(function(sample){
            return createSample(sample)
          });
        });
      }
    };
  }]);

  app.controller("editorController", ["$scope", "aceEditor", "$route", function ($scope, aceEditor, $route) {
    var editor = {
          ace: aceEditor.create("editor-container"),
          run: function(){
            console.running = true;
            aceEditor.run(editor.ace.getValue()).then(function(result){
              console.errors  = result;
              console.running = false;
            }, function(){
              alert("Unknown error!");
            })
          },
          samples: [],
          setSample: function(name){
            var sample = name.length == 0 ? editor.samples[0] :   editor.samples.filter(function (sample) {
              return sample.name === name;
            })[0];
            editor.ace.setValue(sample.snippet.join("\n"));
            editor.run();
          }
        },
        console = {
          running: false,
          errors: []
        };

    $scope.editor = editor;
    $scope.console = console;

    aceEditor.getAllSamples().then(function(samples){
      editor.samples = samples;
      $(window).trigger("hashchange");
    });

    $(window).on("hashchange", function () {
      var url = window.location.hash.length ? window.location.hash : "#/";
      editor.setSample(decodeURI(url.split("/")[1]))
    });

  }]);

}).call(this);