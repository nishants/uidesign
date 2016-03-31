(function () {
  "use strict"

  angular.module("slate").directive("frameContainer", ["$timeout",function ($timeout) {
    return {
      restrict: "C",
      scope: true,
      transclude: false,
      link: function (scope, element, attrs) {
        var frameContainer = {
          ready: false,
        };
        scope.frameContainer = frameContainer;

        scope.$watch("deck.current", function (now, previous) {
          $timeout(function(){
            frameContainer.ready = true;
          }, 3000);
          frameContainer.ready = frameContainer.ready && (now != -1);
        });
      }
    };
  }]);

}).call(this);