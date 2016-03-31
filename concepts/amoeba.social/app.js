(function () {
  "use strict"

  var app = angular.module("slate", []);
  app.directive("slate", [function () {
    var select = function (index) {
          var card = $($(".deck > li")[index]),
              offsetPadding = 10,
              offsetY = $(".deck").offset().top - card.offset().top,
              offsetX = $(".deck").offset().left - card.offset().left;

          card.css("transform", "translateY(" + (offsetY + offsetPadding) + "px)" + "translateX(" + (offsetX + offsetPadding) + "px)");
        },
        unSelect = function (index) {
          var card = $($(".deck > li")[index]);
          card.css("transform", "");
        };
    return {
      restrict: "C",
      scope: true,
      transclude: false,
      link: function (scope, element, attrs) {
        scope.deck = {
          current: -1,
          cards: [
            {id: 0,  type: "link"       },
            {id: 1,  type: "code"       },
            {id: 2,  type: "tutorial"   },
            {id: 3,  type: "link"       },
            {id: 4,  type: "code"       },
            {id: 5,  type: "tutorial"   },
            {id: 6,  type: "link"       },
            {id: 7,  type: "code"       },
            {id: 8,  type: "tutorial"   },
            {id: 9,  type: "link"       },
            {id: 10, type: "code"       },
            {id: 11, type: "tutorial"   },
            {id: 12, type: "link"       },
            {id: 13, type: "code"       },
            {id: 14, type: "tutorial"   },
            {id: 15, type: "link"       },
            {id: 16, type: "code"       },
            {id: 17, type: "tutorial"   },
          ]
        };
        scope.$watch("deck.current", function (now, previous) {
          now != -1 && select(now);
          previous != -1 && unSelect(previous);
        });
      }
    };
  }]);

}).call(this);