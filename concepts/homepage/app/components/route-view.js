(function () {
  "use strict"
  app.directive("view", function () {

    return {
      restrict: "C",
      scope: false,
      transclude: false,
      link: function(scope){
        scope.render(scope.$index);
      }
    };
  });
}).call(this);