(function () {
  "use strict"
  // shows when out of initial view port
  module.directive("selectAction", [function () {
    var

        zIndexOf = function($e){
          return parseInt($e.css("z-index"));
        },

        copyHeight = function ($item, $fromItem) {
          $item.css("height", $fromItem.css("height"));
        },
        copyWidth = function ($item, $fromItem) {
          $item.css("width", $fromItem.css("width"));
        },
        copyPadding = function ($item, $fromItem) {
          $item.css("padding", $fromItem.css("padding"));
        },
        copyMargin = function ($item, $fromItem) {
          $item.css("margin", $fromItem.css("margin"));
        },
        copyBorder = function ($item, $fromItem) {
          $item.css("border", $fromItem.css("border"));
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

        //$selectList.css("color", "transparent");
        //$selectList.css("background-color", "transparent");
        //$selectList.css("border", "none");
        //$selectList.css("box-shadow", "none");

        $selectList.css("opacity", "0");
        $selectList.css("position", "absolute");
        $selectList.css("z-index", zIndexOf($actionButton) + 1);
        $selectList.css("top", $actionButton.position().top);
        $selectList.css("left", $actionButton.position().left);
        copyPadding($selectList, $actionButton);
        copyMargin($selectList, $actionButton);
        copyHeight($selectList, $actionButton);
        copyWidth($selectList, $actionButton);
        copyBorder($selectList, $actionButton);
      }
    }
  }]);

}).call(this);