(function () {
  "use strict"
  angular.module("look-like").controller("editorController", ["$scope", "aceEditor", "$route", function ($scope, aceEditor, $route) {
    var ui={ready: false},
        editor = {
          ace: aceEditor.create("editor-container"),
          run: function(){
            console.running = true;
            aceEditor.run(editor.ace.getValue()).then(function(result){
              console.errors  = result;
              console.running = false;
            }, function(){
              alert("Unknown error!");
            });
          },
          samples: [],
          enable: function(){
            editor.ace.setReadOnly(false);
          },
          disable: function(){
            editor.ace.setReadOnly(true);
          },
          setSample: function(name){
            var sample = name.length == 0 ? editor.samples[0] :   editor.samples.filter(function (sample) {
              return sample.name === name;
            })[0];
            editor.ace.setValue(sample.snippet.join("\n"));
            editor.ace.gotoLine(editor.ace.session.getLength(), 0, true);
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
      ui.ready = true;
    });

    $(window).on("hashchange", function () {
      var url = window.location.hash.length ? window.location.hash : "#/";
      var sampleName = decodeURI(url.split("/")[1]);
      editor.setSample(sampleName);
      editor.showing = ("Cucumber" != sampleName);
    });
  }]);
}).call(this);