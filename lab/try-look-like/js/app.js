(function () {
  "use strict"
  var app = angular.module("try-look-like", []);
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

  app.controller("editorController", ["$scope", "aceEditor", function ($scope, aceEditor) {
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
          samples: []
        },
        console = {
          running: false,
          errors: []
        };

    editor.ace.setValue('expect("one.two.xyz").to look_like("email") \nexpect("one.two.com").to look_like("email") \nexpect("one@two.xyz").to look_like("email")')
    $scope.editor = editor;
    $scope.console = console;
    editor.run();

    $scope.$on('$routeChangeStart', function(next, current) {
      console.log("hello");
    });

    aceEditor.getAllSamples().then(function(samples){
      editor.samples = samples;
    });
  }])

}).call(this);