(function () {
  "use strict"
  // shows when out of initial view port
  angular.module("tiktik").directive("button", ["$timeout", function ($timeout) {


    return {
      restrict: 'E',
      transclude: false,
      scope: false,
      link: function (scope, element, attrs) {
        element.on("mousedown", function(){element.addClass("tk-button-pressed");})
        element.on("mouseup", function(){element.removeClass("tk-button-pressed");})
        element.on("mouseleave", function(){element.removeClass("tk-button-pressed");})
      }
    };
  }]);

}).call(this);