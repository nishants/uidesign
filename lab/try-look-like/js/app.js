(function () {
  "use strict"
  var app = angular.module("try-look-like", ["ngRoute"]);
  app.service("aceEditor", ["$http", function ($http) {
    var createSample = function(config){
      return {
        name: config[0],
        snippet : config.slice(1)
      }
    };
    return {
      run : function(script){
        return $http.put("https://amoeba-social-look-like-server.herokuapp.com/assertion/evaluate", script);
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
        return $http.get("config/samples.rb").then(function(response){
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
            aceEditor.run(editor.ace.getValue()).then(function(response){
              console.errors  = response.data;
              console.running = false;
            }, function(){
              alert("Unknown error!");
            })
          },
          samples: [],
          setSample: function(name){
            var sample = editor.samples.filter(function (sample) {
              return sample.name === name;
            })[0];
            editor.ace.setValue(sample.snippet.join("\n"));
          }
        },
        console = {
          running: false,
          errors: []
        };

    editor.ace.setValue('expect("one.two.xyz").to look_like("email") \nexpect("one.two.com").to look_like("email") \nexpect("one@two.xyz").to look_like("email")')
    $scope.editor = editor;
    $scope.console = console;
    editor.run();

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