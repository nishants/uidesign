(function () {
  "use strict"
  // shows when out of initial view port
  module.directive("selectAction", [function () {
    var

        zIndexOf = function($e){
          return parseInt($e.css("z-index"));
        },
        offsetFromLeft = function ($e) {
          return $e.offset().left;

        },
        leftOffsetOf = function ($onLeft, $onRight) {
          return (offsetFromLeft($onRight) - offsetFromLeft($onLeft))
        };

    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function (scope, element, attrs) {
        var $e = $(element),
            $actionButton = $e.find(".show-actions-button").first(),
            $selectList =  $e.find(".action-list").first();

        //$selectList.css("opacity", "0");

        $selectList.css("color", "transparent");
        $selectList.css("background-color", "transparent");
        $selectList.css("border", "none");
        $selectList.css("box-shadow", "none");

        $selectList.css("position", "absolute");
        $selectList.css("z-index", zIndexOf($actionButton) + 1);
        $selectList.css("top", $actionButton.position().top);
        $selectList.css("left", $actionButton.position().left);
      }
    }
  }]);

}).call(this);