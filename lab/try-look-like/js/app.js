(function () {
  "use strict"
  var app = angular.module("try-look-like", []);
  app.service("aceEditor", [function () {

    return {
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
          ace: aceEditor.create("editor-container")
        },
        console = {
          errors: ["some error"]
        };
    editor.ace.setValue('expect("one.two.xyz").to look_like("email") \nexpect("one.two.com").to look_like("email") \nexpect("one@two.xyz").to look_like("email")')
    $scope.editor = editor;
    $scope.console = console;
  }])

}).call(this);