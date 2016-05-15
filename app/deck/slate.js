(function(){
  "use strict"
  app.directive("slate", [function () {
    var select = function (index) {
          var cardContainer = $($(".deck > li")[index]),
              card          = cardContainer.find(".card").first(),
              offsetPadding = 10,
              offsetY = $(".deck").offset().top - cardContainer.offset().top,
              offsetX = $(".deck").offset().left - cardContainer.offset().left;

          card.css("transform", "translateY(" + (offsetY + offsetPadding) + "px)" + "translateX(" + (offsetX + offsetPadding) + "px)");
          $("body").css("overflow", "hidden")
        },
        unSelect = function (index) {
          var card = $($(".deck > li")[index]);
          card.css("transform", "");
          $("body").css("overflow", "auto")
        };
    return {
      restrict: "C",
      scope: true,
      transclude: false,
      link: function (scope, element, attrs) {
        scope.$watch("deck.current", function (now, previous) {
          now != -1 && select(now);
          previous != -1 && unSelect(previous);
          setTimeout(function(){
            $("body").stop().animate({scrollTop:$(element).offset().top}, '500', 'swing');
          },100);
        });
      }
    };
  }]);

}).call(this);