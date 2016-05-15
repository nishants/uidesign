(function(){
  "use strict"
  app.directive("slate", [function () {
    return {
      restrict: "C",
      scope: true,
      transclude: false,
      link: function (scope, element, attrs) {
      }
    };
  }]);

}).call(this);