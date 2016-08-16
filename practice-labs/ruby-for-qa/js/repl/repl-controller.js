(function(){
  "use strict"
  window.app.controller("replController", ["$scope", "aceEditor", function($scope, aceEditor){

    var repl = {
      editor: aceEditor.create("repl-editor")
    };


    $scope.ui.repl = repl
  }]);

}).call(this);