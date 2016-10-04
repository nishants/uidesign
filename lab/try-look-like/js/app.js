(function () {
  "use strict"
  var app = angular.module("try-look-like", []);
  app.service("aceEditor", ["$http", function ($http) {

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
  }])

}).call(this);