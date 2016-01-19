(function () {
  "use strict"
  app.directive("editor", function () {

    return {
      restrict: "C",
      scope: false,
      transclude: false,
      link: function(scope, element){
        var scrollable = $(element).find(".scrollable").first(),
            $targetFor = function (targetId) {return scrollable.find("#" + targetId);},
            offsetOf = function(target){return target.offset().top - target.height() + scrollable.scrollTop();};

        scope.goto = function(targetId){
          scrollable.animate({scrollTop: offsetOf($targetFor(targetId))}, 500);
        }
      }
    };
  });
}).call(this);