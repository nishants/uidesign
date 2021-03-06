(function(){
  "use strict"
  app.directive("taskStatusBar", [function(){
    return {
      restrict: "A",
      scope   : true,
      link    : function(scope, element, attrs){
        scope.$watch("editor.console.output.scenarios", function(now, then){
          var scenarios = scope.editor.console.output.scenarios;
          var done = !scenarios ? 0 : scenarios.filter(function (scenario) {
            return scenario.success;
          }).length;
          var todo = scope.editor.console.output.scenarios.length,
              status = done == 0 ? 0  : done/todo;
          element.css("transform","scaleX(:progress)".replace(":progress", status));
        });
      }
    };
  }]);

}).call(this);