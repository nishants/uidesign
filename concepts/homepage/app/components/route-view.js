(function () {
  "use strict"
  app.directive("view", function () {

    return {
      restrict: "A",
      scope: true,
      transclude: false,
      link: function(scope){
        scope.render(scope.$index);
      }
    };
  });
}).call(this);