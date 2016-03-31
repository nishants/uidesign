(function () {
  "use strict"

  angular.module("slate").directive("frameContainer", ["$timeout", function ($timeout) {
    return {
      restrict: "C",
      scope: true,
      transclude: false,
      link: function (scope, element, attrs) {
        var frameContainer = {
              ready: false,
            },
            $frameContainer = $(element);

        scope.frameContainer = frameContainer;

        $frameContainer.on("DOMNodeInserted", function (e) {
          $frameContainer.find("iframe").load(function () {
            $timeout(function () {
              frameContainer.ready = true;
            }, 0);
          })
        });

        scope.$watch("deck.current", function (now, previous) {
          frameContainer.ready = frameContainer.ready && (now != -1);
        });
      }
    };
  }]);

}).call(this);