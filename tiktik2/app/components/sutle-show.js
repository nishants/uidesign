(function () {
  "use strict"
  // shows when out of initial view port
  angular.module("tiktik").directive("sutleShow", ["$timeout", function ($timeout) {

    var show = function (e) {
          e.removeClass("sutle-hide");
        },

        hide = function (e) {
          e.addClass("sutle-hide")
        };

    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function (scope, element, attrs) {
        var expression = attrs.sutleShow;
        hide(element);

        scope.$watch(expression, function (newVal) {
          newVal ? show(element) : hide(element);
        });

      }
    };
  }]);

}).call(this);