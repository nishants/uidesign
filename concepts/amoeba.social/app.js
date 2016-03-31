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
            {id: 0,  type: "link"    , ref:"jWVomQ"  },
            {id: 1,  type: "code"    , ref:"jWVomQ"  },
            {id: 2,  type: "tutorial", ref:"jWVomQ"  },
            {id: 3,  type: "link"    , ref:"jWVomQ"  },
            {id: 4,  type: "code"    , ref:"mPwBeR"  },
            {id: 5,  type: "tutorial", ref:"jWVomQ"  },
            {id: 6,  type: "link"    , ref:"jWVomQ"  },
            {id: 7,  type: "code"    , ref:"mPwBeR"  },
            {id: 8,  type: "tutorial", ref:"jWVomQ"  },
            {id: 9,  type: "link"    , ref:"jWVomQ"  },
            {id: 10, type: "code"    , ref:"jWVomQ"  },
            {id: 11, type: "tutorial", ref:"jWVomQ"  },
            {id: 12, type: "link"    , ref:"jWVomQ"  },
            {id: 13, type: "code"    , ref:"jWVomQ"  },
            {id: 14, type: "tutorial", ref:"jWVomQ"  },
            {id: 15, type: "link"    , ref:"jWVomQ"  },
            {id: 16, type: "code"    , ref:"jWVomQ"  },
            {id: 17, type: "tutorial", ref:"jWVomQ"  },
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